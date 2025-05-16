'use client'

import React, { useState, useEffect, Suspense, ComponentType } from 'react';
import dynamic from 'next/dynamic';
import MyDocument from './mydocument';
import './app.css';

// Using dynamic import with Suspense for better loading state handling
const PDFViewer = dynamic<React.ComponentProps<typeof import('@react-pdf/renderer').PDFViewer>>(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer as ComponentType<React.ComponentProps<typeof mod.PDFViewer>>),
  {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-full">Loading PDF Viewer...</div>,
  }
);

// Wrap the PDF viewer in a client component that handles the dynamic import
function PDFViewerWrapper({ children, ...props }: React.ComponentProps<typeof PDFViewer>) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="flex items-center justify-center h-full">Initializing PDF Viewer...</div>;
  }

  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full">Loading PDF...</div>}>
      <PDFViewer {...props}>
        {children}
      </PDFViewer>
    </Suspense>
  );
}

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
      <PDFViewerWrapper width="100%" height="100%" className="pdf-viewer">
        <MyDocument {...documentProps} />
      </PDFViewerWrapper>
    </div>
  );
}

export default App;

