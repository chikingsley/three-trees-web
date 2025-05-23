'use client'

import dynamic from 'next/dynamic';
import React from 'react';
import MyDocument from './mydocument.tsx';
// Removed direct import: import { PDFViewer } from '@react-pdf/renderer';
import './app.css';

// Dynamically import PDFViewer with SSR turned off
const PDFViewerWithNoSSR = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFViewer),
  { 
    ssr: false, 
    loading: () => <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading PDF Viewer...</p> 
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
  // Removed unused client state since we're handling mounting in the PDFViewerWrapper

  const documentProps = {
    clientData: initialClientData,
    selectedClass: initialSelectedClass,
  };

  return (
    <div className="App" style={{ height: '100vh' }}>
      {/* Use the dynamically imported PDFViewer */}
      <PDFViewerWithNoSSR width="100%" height="100%" className="pdf-viewer">
        <>
          <MyDocument {...documentProps} />
        </>
      </PDFViewerWithNoSSR>
    </div>
  );
}

export default App;

