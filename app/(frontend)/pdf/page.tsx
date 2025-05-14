'use client'

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // Added for dynamic imports
// Removed SignatureCanvas import as it's no longer used
import MyDocument from './mydocument';
import './app.css';

// Dynamically import PDF components to ensure client-side only rendering
const ClientPDFViewer = dynamic(() =>
  import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading PDF Viewer...</p>,
  }
);

// Placeholder data, replace with actual data source or props
const initialClientData = {
  name: 'Jane Doe',
  address: '123 Main St, Anytown, USA',
  city: 'Anytown',
  state: 'CA',
  zip: '90210',
  phone: '555-1234',
  email: 'jane.doe@example.com',
  emergencyContact: 'John Doe (555-5678)',
  agentCaseworker: 'Ms. Smith (Probation)',
  isSafe: 'Yes',
  environmentHelpful: 'Yes, it is quiet and supportive.',
  // Add any other fields MyDocument expects for clientData
};

const initialSelectedClass = "Working with Anger";

// Main App component for the page
function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Default empty values for signature-related props to satisfy MyDocument's expected props
  // Ideally, MyDocument should be updated to not require these or handle their absence.
  const documentProps = {
    clientData: initialClientData,
    selectedClass: initialSelectedClass,
    confidentialitySignature: { type: '', value: '' },
    confidentialityDate: '',
    finalAcknowledgementSignature: { type: '', value: '' },
    finalAcknowledgementDate: '',
    releaseAuthSignature: { type: '', value: '' },
    releaseAuthDate: '',
    releaseAuthName: '',
    releaseAuthBirthDate: '',
  };

  return (
    <div className="App">
      {isClient && (
        <>
          <ClientPDFViewer width="100%" height="800px" className="pdf-viewer"> {/* Use ClientPDFViewer */}
            <React.Fragment>
              <MyDocument {...documentProps} />
            </React.Fragment>
          </ClientPDFViewer>
        </>
      )}
    </div>
  );
}

export default App;

