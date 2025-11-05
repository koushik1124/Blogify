import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2336C4 65%, #0057e7 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 36,
      paddingBottom: 36
    }}>
      <div style={{
        width: '100%',
        maxWidth: '660px',
        textAlign: 'center',
        margin: '0 auto'
      }}>
        <h1 style={{ fontWeight: 800, fontSize: '2.7rem', marginBottom: '1rem' }}>
          Create a blog <br /> worth sharing
        </h1>
        <p style={{ fontSize: '1.12rem', marginBottom: '2.2rem', color: '#e0e0e0' }}>
          Get a full suite of intuitive design features and powerful marketing tools<br />
          to create a unique blog that leaves a lasting impression.
        </p>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <button style={{
            background: '#fff',
            color: '#2336C4',
            border: 'none',
            borderRadius: '32px',
            padding: '17px 46px',
            fontWeight: 700,
            fontSize: '1.14rem',
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(44,62,80,0.09)',
            marginBottom: '1.3rem'
          }}>
            Start Blogging
          </button>
        </Link>
        <p style={{ marginTop: 0, color: '#c5cae9', fontSize: '0.96rem' }}>
          Try it for free for an unlimited time and upgrade when you need.
        </p>
      </div>

      {/* Blog preview panel below hero */}
      <div style={{
        background: '#fff',
        color: '#232323',
        marginTop: '3rem',
        borderRadius: '12px',
        padding: '2.1rem',
        boxShadow: '0 8px 24px rgba(44,62,80,0.09)',
        width: '100%',
        maxWidth: '740px'
      }}>
        <h2 style={{ color: '#2336C4', fontWeight: 700 }}>WELLNESS BLOG</h2>
        <p style={{ fontWeight: 500, marginBottom: '15px', fontSize: '1.08rem' }}>
          Be Self-Care Aware<br />
          <span style={{ color: '#555', fontWeight: 400 }}>
            Experts share top self-care practices, and you’ll find tips on better routines for everyone.
          </span>
        </p>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', alignItems: 'center' }}>
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=200&q=80"
            alt="Preview"
            style={{ borderRadius: '8px', width: 120, height: 120, objectFit: 'cover', boxShadow: '0 6px 16px rgba(44,62,80,0.10)' }}
          />
          <div style={{ flex: 1 }}>
            <ul style={{ marginLeft: '0.8rem', color: '#333', fontSize: '1rem' }}>
              <li>Create rich posts with images, text, and formatting.</li>
              <li>Mobile ready, easy-to-read layouts.</li>
              <li>Engage visitors with comments and likes.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
