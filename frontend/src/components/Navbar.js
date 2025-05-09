import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X} from 'lucide-react';

const Navbar = () =>{
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const menuRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <header>
      <div className="container">
        <Link to="/">
          <h1>Ski Resort App</h1>
        </Link>

        <button className='menu-toggle' onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
            }}>
            {isOpen ? <X /> : <Menu />}
        </button>

        <ul ref={menuRef} className={`menu ${isOpen ? 'open' : ''}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user && (
            <li>
              <Link to='/favorites'>Favorites</Link>
            </li>
          )}
          {!user && (
            <li>
              <Link to='/signup'>Sign Up</Link>
            </li>
          )}
          {!user && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {user && (
            <li>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
          {user?.isAdmin && (
            <li>
              <Link to='/add-resort'>Add Resort</Link>
            </li>
          )}
          {user?.isAdmin && (
            <li>
              <Link to='/add-trail'>Add Trail</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
    )
}

export default Navbar