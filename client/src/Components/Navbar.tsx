import { Link, useLocation } from 'react-router-dom';
import '../index.css';

function Navbar () {
    const location = useLocation().pathname;

    return (
        <>
            <ul>
                <li>
                    <Link to="/HomePage" className={location === '/' ? 'active' : ''}>Home</Link>
                </li>
                <li>
                    <Link to="/SavedJobs" className={location === '/SavedJobs' ? 'active' : ''}>SavedJobs</Link>
                </li>
                <li>
                    <Link to="/AppliedTo" className={location === '/AppliedTo' ? 'active' : ''}>AppliedTo</Link>
                </li>
                <li>
                    <Link to="/Privacy" className={location === '/Privacy Policy' ? 'active' : ''}>Privacy Policy</Link>
                </li>
                {/* <li>
                    <Link to="/Logout" className={location === '/Logout' ? 'active' : ''}>Logout</Link>
                </li>
                <li>
                    <Link to="/Login" className={location === '/Login' ? 'active' : ''}>Login</Link>
                </li>
                <li>
                    <Link to="/Signup" className={location === '/Signup' ? 'active' : ''}>Signup</Link>
                </li> */}
            </ul>
        </>
    )
}
export default Navbar;