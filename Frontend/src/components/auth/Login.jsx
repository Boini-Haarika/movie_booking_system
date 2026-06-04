import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNotFoundModal, setShowNotFoundModal] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || err.response?.data || '';

      if (
        status === 404 ||
        (typeof message === 'string' &&
          (message.toLowerCase().includes('not found') ||
           message.toLowerCase().includes('no user') ||
           message.toLowerCase().includes('does not exist')))
      ) {
        setShowNotFoundModal(true);
      } else {
        setError(
          typeof message === 'string' && message
            ? message
            : 'Invalid email or password. Please try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      {/* User Not Found Modal */}
      {showNotFoundModal && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white', borderRadius: '16px',
            padding: '2rem', maxWidth: '400px', width: '90%',
            textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</div>
            <h2 style={{ color: '#1a1a2e', marginBottom: '0.5rem' }}>
              User Not Found!
            </h2>
            <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              No account found with this email. Please register first to continue!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => setShowNotFoundModal(false)}
                style={{
                  padding: '10px 24px', borderRadius: '8px',
                  border: '1px solid #ddd', background: 'white',
                  cursor: 'pointer', fontWeight: '500'
                }}
              >
                Try Again
              </button>
              <button
                onClick={() => { setShowNotFoundModal(false); navigate('/signup'); }}
                style={{
                  padding: '10px 24px', borderRadius: '8px',
                  border: 'none', background: '#e50914',
                  color: 'white', cursor: 'pointer', fontWeight: '600'
                }}
              >
                Register Now →
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;