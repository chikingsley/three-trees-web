'use client'

import MyDocument from './mydocument';
import { PDFViewer } from '@react-pdf/renderer';
import './app.css';

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
      <PDFViewer width="100%" height="100%" className="pdf-viewer">
        <MyDocument {...documentProps} />
      </PDFViewer>
    </div>
  );
}

export default App;

