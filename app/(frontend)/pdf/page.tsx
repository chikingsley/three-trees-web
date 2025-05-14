'use client'

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import MyDocument from './mydocument';
import './app.css';

const ClientPDFViewer = dynamic(() =>
  import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading PDF Viewer...</p>,
  }
);

const initialClientData = {
  name: 'Jane Doe',
  address: '123 Main St',
  city: 'Anytown',
  state: 'CA',
  zip: '90210',
  phone: '555-1234',
  email: 'jane.doe@example.com',
  emergencyContact: 'John Doe (555-5678)',
  agentCaseworker: 'Ms. Smith (Probation)',
  isSafe: 'Yes',
  environmentHelpful: 'Yes, it is quiet and supportive.',
};

const initialSelectedClass = "Working with Anger";

// Main App component for the page
function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const documentProps = {
    clientData: initialClientData,
    selectedClass: initialSelectedClass,
  };

  return (
    <div className="App" style={{ height: '100vh' }}>

      {isClient && (
        <>
          <ClientPDFViewer width="100%" height="100%" className="pdf-viewer">
            <MyDocument {...documentProps} />
          </ClientPDFViewer>
        </>
      )}
    </div>
  );
}

export default App;

