import React from 'react';
import { Document, Page, Text, View, Svg, Path } from '@react-pdf/renderer';
import { createTw } from 'react-pdf-tailwind';

// Initialize with a minimal/empty theme to use default Tailwind classes
// This means custom theme values from tailwind.config.js (like custom colors or font sizes)
// will NOT be available unless explicitly added to this theme object.
const tw = createTw({});

// If you intend to use custom fonts with classes like tw('font-sans'),
// you MUST register them with @react-pdf/renderer's Font.register().
// e.g. Font.register({ family: 'Inter', src: '/path/to/Inter-Regular.ttf' });

interface MyDocumentProps {
  clientData: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
    emergencyContact: string;
    agentCaseworker: string;
    isSafe: string;
    environmentHelpful: string;
  };
  selectedClass: string;
}

const MyDocument: React.FC<MyDocumentProps> = ({ clientData, selectedClass }) => {
  const classes = ["Parenting", "Substance Use and Responsible Living", "Working with Anger"];

  // Example of a reusable style combining Tailwind classes
  const tableCellViewBase = tw('border border-gray-300 p-1.5 justify-center');
  const tableCellHeaderViewSpecifics = tw('bg-gray-100');
  const tableCellValueViewSpecifics = tw('flex-1');
  const tableCellTextContentStyle = tw('text-sm');

  const listItemNumberStyle = tw('mr-1 text-sm');
  const listItemTextStyle = tw('flex-1 text-sm');
  const h2 = tw('text-base font-bold mt-3 mb-1 text-center');


  return (
    <Document author="Three Trees Center for Change" title="Level One Signature Paperwork">
      <Page size="LETTER" style={tw('px-20 py-10 text-sm text-gray-800 font-helvetica')}>

        {/* Logo */}
        <View style={tw('w-40 h-40 self-center mb-4')}>
          <Svg viewBox="0 0 552.96 552.96" style={tw('w-full h-full')}>
            <Path
              d="M333.57 111.92c-3.61-1.14-7.26-2.17-10.95-3.1-3.54-.89-7.12-1.7-10.74-2.39a203.918 203.918 0 0 0-31.78-3.67h-.16a206.49 206.49 0 0 0-12.91-.07c-9.36.25-18.56 1.12-27.56 2.58-2.51.41-5.02.86-7.5 1.36-93.46 18.79-163.85 101.34-163.85 200.33 0 50.22 18.12 96.21 48.17 131.79 3.19 3.78 6.52 7.44 9.97 10.97a21.38 21.38 0 0 0 12.03 6.17c5.4.82 10.87 1.44 16.4 1.84 1.13.08 1.7-1.34.84-2.08-3.62-3.12-7.11-6.38-10.47-9.76-34.29-34.43-55.47-81.91-55.47-134.34 0-81.98 51.8-151.85 124.45-178.69 3.86-1.43 7.78-2.73 11.76-3.91 7.37-2.19 14.93-3.94 22.64-5.22 6.79-1.14 13.71-1.91 20.72-2.3 3.59-.21 7.22-.31 10.86-.31s7.27.1 10.86.31c14.31.8 28.19 3.18 41.48 6.97.63.18 1.26.36 1.88.55 5.26 1.56 10.42 3.34 15.48 5.33 70.7 27.82 120.73 96.7 120.73 177.27 0 49.56-18.92 94.68-49.95 128.56-2.37 2.6-4.82 5.13-7.34 7.59-.8.78-.19 2.13.93 2.02l4.08-.4a2.59 2.59 0 0 0 1.64-.8c2.86-2.97 5.62-6.02 8.29-9.16 30.37-35.66 48.7-81.9 48.7-132.41 0-91.57-60.23-169.07-143.23-195.04Z"
              fill="#273472"
            />
            <Path
              d="M458.98 329.6H324.34v74.97h-9.03v16h-69.63v-16h-8.78V329.6H101.06L280.02 19.64 458.98 329.6z"
              fill="#273472"
            />
            <Path
              d="M435.22 371.45H318.46v48.52h-3.15v30.37h-69.63v-30.37h-3.06v-48.52H124.81L140.08 345l139.94-242.38L419.95 345l15.27 26.45z"
              fill="#3e59d4"
            />
            <Path
              d="M422.52 419.97H315.31v72.44h-69.63v-72.44H137.52l28.01-48.52L180.81 345l99.21-171.84L379.23 345l15.28 26.45 28.01 48.52z"
              fill="#5b75eb"
            />
          </Svg>
        </View>

        <Text style={tw('text-xl text-center mb-1 font-bold')}>Level One Signature Paperwork</Text>
        <View style={tw('flex-row justify-center mb-2')}>
          <Text style={tw('text-base text-center')}>Class you are Taking (circle the appropriate class):</Text>
        </View>
        <View style={tw('flex-row justify-center mb-4')}>
          {classes.map((cls, index) => (
            <Text key={cls} style={tw(`mx-1 text-base ${cls === selectedClass ? 'border border-black rounded-full px-0.5' : ''}`)}>
              {cls}{index < classes.length - 1 ? ' / ' : ''}
            </Text>
          ))}
        </View>

        <Text style={tw('text-base font-bold mt-3 mb-1 text-center')}>Basic Info</Text>
        <View style={tw('border border-gray-300 mb-2.5')}>
          {/* Client Name */}
          <View style={tw('flex-row')}>
            <View style={[tableCellViewBase, tableCellHeaderViewSpecifics, tw('w-min-content')]}>
              <Text style={tableCellTextContentStyle}>Client Name (Alias&apos;s):</Text>
            </View>
            <View style={[tableCellViewBase, tableCellValueViewSpecifics]}>
              <Text style={tableCellTextContentStyle}>{clientData.name}</Text>
            </View>
          </View>
          {/* Address Line 1 */}
          <View style={tw('flex-row')}>
            <View style={[tableCellViewBase, tableCellHeaderViewSpecifics, tw('w-min-content')]}>
              <Text style={tableCellTextContentStyle}>Current Address:</Text>
            </View>
            <View style={[tableCellViewBase, tableCellValueViewSpecifics]}>
              <Text style={tableCellTextContentStyle}>{clientData.address}</Text>
            </View>
            <View style={[tableCellViewBase, tableCellHeaderViewSpecifics, tw('w-min-content')]} >
              <Text style={tableCellTextContentStyle}>City:</Text>
            </View>
            <View style={[tableCellViewBase, tableCellValueViewSpecifics, tw('min-w-0')]}>
              <Text style={tableCellTextContentStyle}>{clientData.city}</Text>
            </View>
            <View style={[tableCellViewBase, tableCellHeaderViewSpecifics, tw('w-min-content')]} >
              <Text style={tableCellTextContentStyle}>State:</Text>
            </View>
            <View style={[tableCellViewBase, tableCellValueViewSpecifics, tw('min-w-0')]}>
              <Text style={tableCellTextContentStyle}>{clientData.state}</Text>
            </View>
            <View style={[tableCellViewBase, tableCellHeaderViewSpecifics, tw('w-min-content')]} >
              <Text style={tableCellTextContentStyle}>Zip:</Text>
            </View>
            <View style={[tableCellViewBase, tableCellValueViewSpecifics, tw('min-w-0')]}>
              <Text style={tableCellTextContentStyle}>{clientData.zip}</Text>
            </View>
          </View>
          {/* Phone & Email */}
          <View style={tw('flex-row')}>
            <View style={[tableCellViewBase, tableCellHeaderViewSpecifics, tw('w-min-content')]} >
              <Text style={tableCellTextContentStyle}>Telephone Number:</Text>
            </View>
            <View style={[tableCellViewBase, tableCellValueViewSpecifics, tw('min-w-0')]}>
              <Text style={tableCellTextContentStyle}>{clientData.phone}</Text>
            </View>
            <View style={[tableCellViewBase, tableCellHeaderViewSpecifics, tw('w-min-content')]} >
              <Text style={tableCellTextContentStyle}>E-mail:</Text>
            </View>
            <View style={[tableCellViewBase, tableCellValueViewSpecifics, tw('min-w-0')]}>
              <Text style={tableCellTextContentStyle}>{clientData.email}</Text>
            </View>
          </View>
          {/* Emergency Contact */}
          <View style={tw('flex-row')}>
            <View style={[tableCellViewBase, tableCellHeaderViewSpecifics, tw('w-min-content')]}>
              <Text style={tableCellTextContentStyle}>Emergency contact (cannot be victim):</Text>
            </View>
            <View style={[tableCellViewBase, tableCellValueViewSpecifics]}>
              <Text style={tableCellTextContentStyle}>{clientData.emergencyContact}</Text>
            </View>
          </View>
           {/* Agent/Caseworker */}
          <View style={tw('flex-row')}>
            <View style={[tableCellViewBase, tableCellHeaderViewSpecifics, tw('w-1/3')]}>
              <Text style={tableCellTextContentStyle}>Agent/Caseworker/referral source:</Text>
            </View>
            <View style={[tableCellViewBase, tableCellValueViewSpecifics]}>
              <Text style={tableCellTextContentStyle}>{clientData.agentCaseworker}</Text>
            </View>
          </View>
           {/* Safety Question */}
          <View style={tw('flex-row')}>
            <View style={[tableCellViewBase, tableCellHeaderViewSpecifics, tw('w-1/3')]}>
              <Text style={tableCellTextContentStyle}>Are you safe in your current living environment?</Text>
            </View>
            <View style={[tableCellViewBase, tableCellValueViewSpecifics]}>
              <Text style={tableCellTextContentStyle}>{clientData.isSafe}</Text>
            </View>
          </View>
           {/* Environment Question */}
          <View style={tw('flex-row')}>
            <View style={[tableCellViewBase, tableCellHeaderViewSpecifics, tw('w-2/3')]}>
              <Text style={tableCellTextContentStyle}>Is your current living environment helpful for your successful completion of this program, please explain:</Text>
            </View>
            <View style={[tableCellViewBase, tableCellValueViewSpecifics]}>
              <Text style={tableCellTextContentStyle}>{clientData.environmentHelpful}</Text>
            </View>
          </View>
        </View>

        <Text style={tw('text-base font-bold mt-1 text-center')}>General Standards for</Text>
        <Text style={tw('text-base font-bold mb-3 text-center')}>Educational Classes</Text>

        {[
          "All individual and group sessions must be attended, and participants are to arrive on time. If you are late you will not be allowed to receive credit for that session. While in attendance clients will actively participate, be in a room alone with no other people present, and be viewable on camera at all times during class.",
          "A total of two (2) absences are allowed in substance abuse level one.",
          "There is a No-Tolerance policy in regard to violence, weapons, or re-offense; demonstration of each will result in immediate dismissal from the session and potentially the program.",
          "Participants agree to participate and pay for a minimum of 2 random Drug and Alcohol Screens.",
          "Use of any mood-altering drug (including alcohol) is prohibited throughout the duration of the assigned program with exception to those prescribed medication for a physical condition in which another, non-mood altering drug, cannot be substituted. Justification for this exception will require written consent to exchange information with the prescribing physician.",
          "Any participant that tests positive for drugs or alcohol will be immediately referred to Substance Abuse Treatment at the level deemed appropriate by Three Trees Staff.",
          "Participant must agree to sign required contracts, and to assist in developing personal treatment plan when appropriate."
        ].map((item, index) => (
          <View key={index} style={tw('mb-1 flex-row')}>
            <Text style={listItemNumberStyle}>{index + 1}.</Text>
            <Text style={listItemTextStyle}>{item}</Text>
          </View>
        ))}

        <Text style={h2}>Group Confidentiality Agreement</Text>
        {[
          <>I, <Text style={tw('underline font-bold')}>{clientData.name}</Text>, (Client&apos;s name) promise to hold confidential all communications made by participants and all information obtained from or about any participant while receiving treatment in this program.</>,
          "I am making this promise in consideration of the mutual promises made by all participants in this group and in return for benefits available from group therapy/education.",
          "I understand the purpose of this agreement is to help assure that each member of the group will feel more comfortable revealing personal information about themselves, enabling the therapists/facilitators to obtain as much information as possible necessary for effective treatment.",
          "Please sign this form and keep a copy for yourself for future reference. Should you have any questions at any time, please ask."
        ].map((item, index) => (
          <View key={`conf-${index}`} style={tw('mb-1 flex-row')}>
            <Text style={listItemNumberStyle}>{index + 1}.</Text>
            <Text style={listItemTextStyle}>{item}</Text>
          </View>
        ))}

        <Text style={h2}>Fee and Payment Policies</Text>
        {[
          "Three Trees only accepts secured payments; therefore, fees may be paid by cash or money order, or online at www.threetreescenterforchange.com.",
          "The cost of enrollment at the time of intake is $40.00 for all applicants to the program.",
          "The cost for each group session is $25.00 per class.",
          "You will have a minimum of 2 drug and alcohol screens that will cost $25 each. These will be paid at time of drug screen.",
          "Group fees are to be paid at the time service is provided. If unable to pay the entire group fee, the participant will not receive credit for that session. If a participant wishes to attend and participate in a group session without receiving credit, he/she is welcome to do so.",
          "Program clients are held responsible for any outstanding balances even after they are no longer participating in the program.",
          <>Any change in financial responsibilities should be noted here: <Text style={tw('border-b border-black min-w-[100px] px-0.5')}>____________________</Text></>
        ].map((item, index) => (
          <View key={`fee-${index}`} style={tw('mb-1 flex-row')}>
            <Text style={listItemNumberStyle}>{index + 1}.</Text>
            <Text style={listItemTextStyle}>{item}</Text>
          </View>
        ))}

        <Text style={h2}>Statement of Client Rights</Text>
        <Text style={tw('text-sm font-bold mb-1 text-center')}>As a client of Three Trees Center For Change, LLC, you will be afforded:</Text>
        {[
          "Respect and dignity for and protection of your privacy",
          "Your informed consent to participate in services",
          "CONFIDENTIALITY of your client records, unless contraindicated in treatment and recovery process or as ordered by an appropriate healthcare provider",
          "Privacy of sessions, unless contraindicated in treatment and recovery process or as ordered by an appropriate healthcare provider",
          "A thorough explanation of program treatment, rules, and expectations",
          "The opportunity to provide feedback and recommendations throughout treatment regarding program rules, expectations, and quality of care",
          "All rights and privileges regarding civil rights pursuant to Title VII, Section 601 of the Civil Rights Act of 1964, the Americans with Disabilities Act."
        ].map((item, index) => (
          <View key={`rights-${index}`} style={tw('mb-1 flex-row')}>
            <Text style={listItemNumberStyle}>{index + 1}.</Text>
            <Text style={listItemTextStyle}>{item}</Text>
          </View>
        ))}

        <Text style={tw('mt-3 text-sm')}>I have reviewed and understand the general rules, fee and payment policies, confidentiality agreement and my rights:</Text>
        <Text style={tw('mt-2 text-sm')}>Client Signature: <Text style={tw('border-b border-black min-w-[150px] mx-0.5')}>____________________________</Text> Date: <Text style={tw('border-b border-black min-w-[100px] mx-0.5')}>____________________</Text></Text>

        <Text style={h2}>Authorization for Release of Information</Text>
        <Text style={tw('text-sm')}>I, <Text style={tw('underline font-bold')}>{clientData.name}</Text> (client&apos;s name) authorize Three Trees Center for Change, LLC to exchange the below specified information with anyone who is involved in the court mandated monitoring of my treatment. To include, but not limited to, the Department of Social Services, Probation and Parole, Victim Advocates, Pre-Trial Intervention, County Solicitor&apos;s Office, or Court employees, and my own legal counsel.</Text>
        
        <Text style={tw('mt-2 text-sm')}>I further authorize Three Trees Center for Change, LLC to exchange information with the following additional individuals/groups:</Text>
        {[1, 2, 3, 4].map(i => (
          <Text key={`auth-${i}`} style={tw('text-sm mt-0.5')}>{i}. <Text style={tw('border-b border-black min-w-[300px] px-0.5')}>____________________________________________________________</Text></Text>
        ))}

        <Text style={tw('text-sm font-bold mb-0.5 mt-3')}>The following information will be shared:</Text>
        {[
          "Re-offenses of violence towards anyone",
          "Violations of court orders",
          "Missed appointments and compliance with other program rules",
          "Treatment progress",
          "Information relevant to safety, assessment and treatment planning"
        ].map((item, index) => (
          <View key={`shared-${index}`} style={tw('mb-1 flex-row')}>
            <Text style={listItemNumberStyle}>{index + 1}.</Text>
            <Text style={listItemTextStyle}>{item}</Text>
        </View>
        ))}

        <Text style={tw('mt-2 text-sm')}>My birth date is: <Text style={tw('border-b border-black min-w-[200px] mx-0.5')}>____________________________________________________</Text></Text>
        <Text style={tw('mt-2 text-sm')}>This authorization will expire 180 days from my completion or termination of this program, except for allowing Three Trees Center for Change to follow up at 1, 3, and 5 year intervals to see if I have recidivated. I also understand that this authorization may be revoked by me, in writing, at any time, except to the extent that action has already been taken.</Text>
        <Text style={tw('mt-2 text-sm')}>I have reviewed and provide permission for my information to be released to the above-mentioned parties.</Text>
        <Text style={tw('mt-2 text-sm')}>Client Signature: <Text style={tw('border-b border-black min-w-[150px] mx-0.5')}>____________________________</Text> Date: <Text style={tw('border-b border-black min-w-[100px] mx-0.5')}>____________________</Text></Text>
        <Text style={tw('mt-2 text-sm')}>Staff Signature: <Text style={tw('border-b border-black min-w-[150px] mx-0.5')}>_____________________________</Text> Date: <Text style={tw('border-b border-black min-w-[100px] mx-0.5')}>____________________</Text></Text>

        <Text style={tw('absolute bottom-5 left-10 right-10 text-center text-gray-500 text-[8px]')}>Three Trees Center for Change, LLC</Text>
      </Page>
    </Document>
  );
};

export default MyDocument;