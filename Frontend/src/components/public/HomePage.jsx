import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { publicAPI } from '../../services/api';
import './HomePage.css';

const HomePage = () => {
  const [nowShowing, setNowShowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNowShowing();
  }, []);

  const fetchNowShowing = async () => {
    try {
      const response = await publicAPI.getNowShowing();
      setNowShowing(response.data);
    } catch (error) {
      console.error('Error fetching shows:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (showId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowLoginAlert(true);
    } else {
      navigate(`/user/booking/${showId}`);
    }
  };

  const getImageUrl = (posterUrl) => {
    if (!posterUrl) return 'https://placehold.co/300x400/1a1a2e/ffffff?text=Movie';
    if (posterUrl.startsWith('http')) return posterUrl; // Cloudinary URL
    return `https://harikaboini-movie-booking-backend.hf.space${posterUrl}`; // old local URL
  };

  return (
    <div className="homepage">

      {/* Login Alert Modal */}
      {showLoginAlert && (
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
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎬</div>
            <h2 style={{ color: '#1a1a2e', marginBottom: '0.5rem' }}>
              Sign In Required
            </h2>
            <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Please sign in to book movie tickets and enjoy the full experience!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => setShowLoginAlert(false)}
                style={{
                  padding: '10px 24px', borderRadius: '8px',
                  border: '1px solid #ddd', background: 'white',
                  cursor: 'pointer', fontWeight: '500'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowLoginAlert(false); navigate('/login'); }}
                style={{
                  padding: '10px 24px', borderRadius: '8px',
                  border: 'none', background: '#e50914',
                  color: 'white', cursor: 'pointer', fontWeight: '600'
                }}
              >
                Sign In →
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="hero-section">
        <div className="hero-content">
          <h1>Book Your Movie Tickets</h1>
          <p>Experience cinema like never before</p>
          <Link to="/user/search" className="cta-button">Book Now</Link>
        </div>
      </div>

      <div className="now-showing">
        <div className="container">
          <h2>Now Showing</h2>
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <div className="movies-grid">
              {nowShowing.slice(0, 6).map((show) => (
                <div key={show.id} className="movie-card">
                  <img
                    src={getImageUrl(show.movie?.posterUrl)}
                    alt={show.movie?.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/300x400/1a1a2e/ffffff?text=Movie';
                    }}
                  />
                  <div className="movie-info">
                    <h3>{show.movie?.title}</h3>
                    <p>{show.theater?.name}</p>
                    <p>{new Date(show.startTime).toLocaleDateString()}</p>
                    <button
                      onClick={() => handleBookNow(show.id)}
                      className="book-btn"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;