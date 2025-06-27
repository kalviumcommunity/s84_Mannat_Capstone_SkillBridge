import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaChartLine, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsProfileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" aria-label="SkillBridge Home">
          <span className="logo-text">SkillBridge</span>
          <div className="logo-stars"></div>
        </Link>
        
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" aria-label="Home">Home</Link>
          <Link to="/features" className="nav-link" aria-label="Features">Features</Link>
          <Link to="/jobs" className="nav-link" aria-label="Jobs">Jobs</Link>
          <Link to="/learn" className="nav-link" aria-label="Learn">Learn</Link>
          <Link to="/dashboard" className="nav-link" aria-label="Dashboard">
            <FaChartLine />
            Dashboard
          </Link>
          <div className="auth-buttons">
            {user ? (
              <div className="profile-dropdown" ref={profileRef}>
                <button 
                  className="profile-button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  aria-expanded={isProfileOpen}
                >
                  <img src={user?.profileImage || '/default-avatar.pnghttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxD73MLizwdNt-kYYDHausSv_AIqllBulgzg&s'} alt="Profile" className="profile-avatar" width={32} height={32} />
                </button>
                {isProfileOpen && (
                  <div className="profile-menu">
                    <button 
                      onClick={handleProfileClick}
                      className="profile-menu-item"
                    >
                      <FaUser /> Profile
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="profile-menu-item"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="login-btn" aria-label="Login">Login</Link>
                <Link to="/signup" className="signup-btn" aria-label="Sign Up">Sign Up</Link>
              </>
            )}
          </div>
        </div>

        <button 
          className="menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}></div>
        </button>
      </div>
    </nav>
  );
};
export default Navbar; 