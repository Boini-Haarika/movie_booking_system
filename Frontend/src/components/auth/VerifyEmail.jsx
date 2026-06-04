import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying');
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('invalid');
      return;
    }
    api.get(`/auth/verify?token=${token}`)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div style={{
      minHeight: '60vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center', padding: '2rem'
    }}>
      <div>
        {status === 'verifying' && (
          <>
            <div style={{ fontSize: '3rem' }}>⏳</div>
            <p>Verifying your email...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{ fontSize: '3rem' }}>✅</div>
            <h2>Email Verified!</h2>
            <p>Your account is now active. You can log in.</p>
            <button
              onClick={() => navigate('/login')}  
              style={{
                marginTop: '1rem', padding: '10px 24px',
                background: '#e50914', color: 'white',
                border: 'none', borderRadius: '8px',
                cursor: 'pointer', fontWeight: '600'
              }}
            >
              Go to Login
            </button>
          </>
        )}

        {(status === 'error' || status === 'invalid') && (
          <>
            <div style={{ fontSize: '3rem' }}>❌</div>
            <h2>Verification Failed</h2>
            <p>The link is invalid or has expired. Please sign up again.</p>
            <button
              onClick={() => navigate('/signup')}
              style={{
                marginTop: '1rem', padding: '10px 24px',
                background: '#e50914', color: 'white',
                border: 'none', borderRadius: '8px',
                cursor: 'pointer', fontWeight: '600'
              }}
            >
              Sign Up Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;