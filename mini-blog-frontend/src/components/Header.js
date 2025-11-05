import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header style={{
      width: '100%',
      background: '#2336C4',
      boxShadow: '0 2px 12px rgba(44,62,80,0.03)',
      padding: '12px 0',
      marginBottom: 0
    }}>
      <nav style={{
        maxWidth: '1060px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          gap: '32px',
          margin: 0,
          padding: 0,
          alignItems: 'center'
        }}>
          <li><Link to="/posts" style={navLinkStyle}>Posts</Link></li>
          <li><Link to="/create" style={navLinkStyle}>Create Post</Link></li>
          <li><Link to="/dashboard" style={navLinkStyle}>Dashboard</Link></li>
          <li><Link to="/about" style={navLinkStyle}>About</Link></li>
          {!user ? (
            <>
              <li><Link to="/login" style={navLinkStyle}>Login</Link></li>
              <li><Link to="/register" style={navLinkStyle}>Register</Link></li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: '#e53935',
                  color: '#fff',
                  border: 'none',
                  padding: '7px 24px',
                  borderRadius: '24px',
                  fontWeight: 700,
                  fontSize: '1.04rem',
                  cursor: 'pointer',
                  letterSpacing: '0.01em'
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

const navLinkStyle = {
  color: '#fff',
  fontWeight: 700,
  textDecoration: 'none',
  padding: '8px 0',
  fontSize: '1.05rem',
  borderBottom: '2.5px solid transparent',
  transition: 'border-color 0.2s',
  letterSpacing: '0.03em'
};

export default Header;
