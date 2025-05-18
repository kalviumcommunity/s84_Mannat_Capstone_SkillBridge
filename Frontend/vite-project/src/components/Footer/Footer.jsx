import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const dreamBubblesRef = useRef(null);

  useEffect(() => {
    const createDreamBubble = () => {
      const bubble = document.createElement('div');
      bubble.className = 'dream-bubble';
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDuration = `${Math.random() * 3 + 4}s`;
      dreamBubblesRef.current?.appendChild(bubble);
      
      setTimeout(() => {
        bubble.remove();
      }, 7000);
    };

    const interval = setInterval(createDreamBubble, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer">
      <div className="dream-bubbles" ref={dreamBubblesRef}></div>
      <div className="footer-content">
        <div className="footer-section">
          <h3>SkillBridge</h3>
          <p>Connecting talent with opportunity</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/jobs">Job Board</Link></li>
            <li><Link to="/learn">Learning Hub</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Features</h4>
          <ul>
            <li>Smart Skill Validation</li>
            <li>AI-Powered Matching</li>
            <li>Dual Dashboard</li>
            <li>Learn & Grow</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-link" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 SkillBridge. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 