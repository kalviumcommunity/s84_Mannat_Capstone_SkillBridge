import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const dreamSceneRef = useRef(null);
  const dreamTextRef = useRef(null);

  useEffect(() => {
    const dreamScene = dreamSceneRef.current;
    const dreamText = dreamTextRef.current;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.005;
      const moveY = (clientY - window.innerHeight / 2) * 0.005;
      
      dreamScene.style.transform = `translate(${moveX * 2}px, ${moveY * 2}px)`;
      dreamText.style.transform = `translate(${moveX * 4}px, ${moveY * 4}px)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero">
      <div className="dream-scene" ref={dreamSceneRef}>
        <div className="floating-dream dream1"></div>
        <div className="floating-dream dream2"></div>
        <div className="floating-dream dream3"></div>
        <div className="dream-fog"></div>
      </div>

      <div className="hero-content">
        <div className="dream-text" ref={dreamTextRef}>
          <h1 className="hero-title">
            Where <span className="highlight">Talent</span> Meets<br />
            <span className="highlight">Opportunity</span>
          </h1>
          <p className="hero-subtitle">
            Redefining recruitment through skill-first philosophy. Showcase your true capabilities
            and discover talent with confidence.
          </p>
        </div>

        <div className="hero-cta">
          <Link to="/login" className="cta-button primary">Get Started</Link>
          <button className="cta-button secondary">Learn More</button>
        </div>

        <div className="hero-features">
          <div className="feature-card">
            <div className="feature-icon validation"></div>
            <h3>Smart Skill Validation</h3>
            <p>Prove your expertise through comprehensive tests</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon matching"></div>
            <h3>AI-Powered Matching</h3>
            <p>Get matched based on your true capabilities</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon learning"></div>
            <h3>Built-in Upskilling</h3>
            <p>Continuous learning and growth resources</p>
          </div>
        </div>
      </div>

      <div className="skill-portal"></div>
    </section>
  );
};

export default Hero; 