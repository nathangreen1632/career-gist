import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './Pages/HomePage';
import SavedJobs from './Pages/SavedJobs';
import AppliedToPage from './Pages/AppliedToPage';
import Login from './Pages/Login';
import PrivateRoute from "./components/PrivateRoute.tsx";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogout = () => {
    setIsLoggedIn(false); // Reset the login state
    alert('You have successfully logged out.');
  };

  return (
    <Router>
      <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/applied-to" element={<AppliedToPage />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<HomePage />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
