import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'jobseeker' // or 'employer'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      navigate('/dashboard');
    } catch (err) {
      if (err?.message && err.message.toLowerCase().includes('econnreset')) {
        setError('Invalid email.');
      } else {
        setError(err?.error || err?.message || JSON.stringify(err) || 'Failed to create account');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // Add Google signup logic here
  };

  return (
    <div className="auth-container">
      <div className="auth-bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      <div className="auth-card">
        <div className="auth-content">
          <h2>Join SkillBridge</h2>
          <p className="auth-subtitle">Connect with opportunities that match your true potential</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
              <div className="form-highlight"></div>
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <div className="form-highlight"></div>
            </div>

            <div className="form-group">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="jobseeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
              <div className="form-highlight"></div>
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <div className="form-highlight"></div>
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
              <div className="form-highlight"></div>
            </div>

            <div className="form-options">
              <label className="terms">
                <input type="checkbox" required />
                <span>I agree to the <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link></span>
              </label>
            </div>

            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <button
              type="button"
              className="google-auth-button"
              onClick={handleGoogleSignup}
            >
              <img src="/google-icon.svg" alt="Google" />
              Sign up with Google
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </p>
        </div>

        <div className="auth-decoration">
          <div className="skill-orbs">
            <div className="skill-orb"></div>
            <div className="skill-orb"></div>
            <div className="skill-orb"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 