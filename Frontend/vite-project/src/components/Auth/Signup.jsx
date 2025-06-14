import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './Auth.css';

const baseUrl = import.meta.env.VITE_API_BASE_URL

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'jobseeker',
    code: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [codeMsg, setCodeMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setSendingCode(true);
    setCodeMsg('');
    setError('');
    try {
      await api.post(`${baseUrl}/route/auth/send-code`, { email: formData.email });
      setCodeSent(true);
      setCodeMsg('Verification code sent to your email.');
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to send verification code.');
    } finally {
      setSendingCode(false);
    }
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
        role: formData.role,
        code: formData.code
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

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Failed to sign up with Google');
    } finally {
      setIsLoading(false);
    }
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
          {codeMsg && <div className="auth-success">{codeMsg}</div>}

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

            <div className="form-group" style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                style={{ flex: 1 }}
              />
              <button
                type="button"
                className="auth-button"
                style={{ width: 'auto', padding: '0 1rem', minWidth: 'fit-content' }}
                onClick={handleSendCode}
                disabled={sendingCode || !formData.email}
              >
                {sendingCode ? 'Sending...' : codeSent ? 'Resend Code' : 'Send Code'}
              </button>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Verification Code"
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
              disabled={isLoading}
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