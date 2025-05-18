import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
          <div className="auth-buttons">
            {user ? (
              <>
                <Link to="/dashboard" className="nav-link" aria-label="Dashboard">Dashboard</Link>
                <button onClick={handleLogout} className="login-btn">Logout</button>
              </>
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