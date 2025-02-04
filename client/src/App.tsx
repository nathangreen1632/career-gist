import React from 'react';  // Ensure React is imported
import { Outlet } from 'react-router-dom';  // Import from react-router-dom
import Navbar from './Components/Navbar'; // Import the Navbar component
import HomePage from './Pages/HomePage';  // Import the HomePage component

// Define the App component as a functional component using TypeScript
const App: React.FC = () => {
  // The Outlet component will conditionally swap between the different pages according to the URL
  return (
    <>
      <Navbar />
      <HomePage />
      <main className="mx-3">
        <Outlet />
      </main>
    </>
  );
}

export default App;
