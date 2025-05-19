import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    setIsLoading(true);
    setError('');
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      if (error?.error === 'Please verify your email before logging in.') {
        setError('Check your mail for verification.');
      } else {
        setError(error.message || 'Failed to login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Failed to login with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-content">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Continue your professional journey with SkillBridge</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
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

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <button onClick={handleGoogleLogin} className="google-auth-button">
              <img src="/google-icon.svg" alt="Google" />
              Continue with Google
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
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

export default Login; 