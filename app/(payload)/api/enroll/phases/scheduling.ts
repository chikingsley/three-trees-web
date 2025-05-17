import { NextResponse } from 'next/server';
import type { Payload } from 'payload';
import type { Client, Program, ProgramGroup } from '@/payload-types';

// Define the request body structure specific to this phase
interface SchedulingRequestBody {
    submissionPhase: 'scheduling';
    scheduling: {
        selectedClassId: string;
    };
}

export async function handleSchedulingPhase(payload: Payload, rawRequestBody: SchedulingRequestBody, client: Client) {
    const { scheduling } = rawRequestBody;
    if (!scheduling || !scheduling.selectedClassId) {
        return NextResponse.json({ error: 'Scheduling info with selectedClassId is required.' }, { status: 400 });
    }
    const selectedClassId = scheduling.selectedClassId;

    const classDoc = await payload.findByID({
        collection: 'classes',
        id: selectedClassId,
        depth: 1, // Populates 'programGroup'
    });

    if (!classDoc) return NextResponse.json({ error: 'Selected class not found.' }, { status: 404 });
    if (!classDoc.isActive) return NextResponse.json({ error: 'Selected class is not active.' }, { status: 400 });

    const classProgramGroup = classDoc.programGroup as ProgramGroup | undefined;
    if (!classProgramGroup || typeof classProgramGroup !== 'object') {
        return NextResponse.json({ error: 'Could not retrieve program group details for the selected class.' }, { status: 500 });
    }

    const clientSelectedProgram = client.selectedProgram as Program | undefined; // Populated by depth: 1 in auth helper
    if (!clientSelectedProgram || typeof clientSelectedProgram !== 'object') {
        payload.logger.error(`Client ${client.id} has invalid selectedProgram for scheduling: ${JSON.stringify(client.selectedProgram)}`);
        return NextResponse.json({ error: 'Client\'s selected program details are missing or invalid.' }, { status: 400 });
    }

    const clientProgramGroup = clientSelectedProgram.programGroup; // This can be string (ID) or ProgramGroup object
    let clientProgramGroupId: string | undefined;

    if (typeof clientProgramGroup === 'object' && clientProgramGroup?.id) {
        clientProgramGroupId = clientProgramGroup.id;
    } else if (typeof clientProgramGroup === 'string') {
        clientProgramGroupId = clientProgramGroup;
    }

    if (!clientProgramGroupId) {
        payload.logger.error(`Could not resolve program group ID for client's selected program. Client: ${client.id}, Program: ${clientSelectedProgram.id}`);
        return NextResponse.json({ error: 'Could not resolve program group ID for client\'s selected program.' }, { status: 400 });
    }

    if (clientProgramGroupId !== classProgramGroup.id) {
        payload.logger.warn(`Program group mismatch for client ${client.id}: Client PG ID ${clientProgramGroupId}, Class PG ID ${classProgramGroup.id}. Client Program: ${clientSelectedProgram.name}, Class Program Group: ${classProgramGroup.name}`);
        return NextResponse.json({
            error: `The selected class time belongs to "${classProgramGroup.name}", but your chosen program ("${clientSelectedProgram.name}") requires a different group. Please select a class time compatible with your program.`
        }, { status: 400 });
    }

    const spotsPerInstance = classProgramGroup.spotsPerClassInstance ?? 0;
    const spotsTotal = (classDoc.numberOfParallelClasses ?? 0) * spotsPerInstance;
    const enrolledClientIds = Array.isArray(classDoc.clients) ? classDoc.clients.map(c => typeof c === 'string' ? c : c.id) : [];
    const spotsAvailable = Math.max(0, spotsTotal - enrolledClientIds.length);

    if (spotsAvailable <= 0) {
        return NextResponse.json({ error: 'Selected class time is full.' }, { status: 409 });
    }

    await payload.update({ 
        collection: 'clients', 
        id: client.id, 
        data: { 
            class: selectedClassId, 
            enrollmentProcessStatus: 'schedule_selected' as Client['enrollmentProcessStatus'] 
        } 
    });
    
    if (!enrolledClientIds.includes(client.id)) {
        await payload.update({ 
            collection: 'classes', 
            id: selectedClassId, 
            data: { clients: [...enrolledClientIds, client.id] } 
        });
    }

    return NextResponse.json({ message: 'Scheduling info saved and client assigned to class.' }, { status: 200 });
}