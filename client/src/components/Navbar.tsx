import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void; // Prop to handle logout
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const location = useLocation().pathname;

  return (
    <ul className="navbar navbar-tabs">
      <li>
        <Link to="/" className={location === '/' ? 'active' : ''}>Home</Link>
      </li>
      {isLoggedIn ? (
        <>
          <li>
            <Link to="/saved-jobs" className={location === '/saved-jobs' ? 'active' : ''}>Saved Jobs</Link>
          </li>
          <li>
            <Link to="/applied-to" className={location === '/applied-to' ? 'active' : ''}>Applied To</Link>
          </li>
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login" className={location === '/login' ? 'active' : ''}>Login</Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default Navbar;
