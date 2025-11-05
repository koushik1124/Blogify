import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/blog.png';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await axios.post('http://localhost/mini-blog-platform/public/register.php', {
        username,
        email,
        password,
        password2
      });
      if (response.data.success) {
        setMessage("Registered successfully!");
        setTimeout(() => navigate('/login'), 1000);
      } else {
        setMessage(response.data.message || "Registration failed.");
      }
    } catch (err) {
      setMessage("Server error. Try again!");
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(120deg, #0f1535 60%, #2763eb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '700px',
          maxWidth: '97vw',
          background: '#fff',
          borderRadius: '18px',
          boxShadow: '0 8px 38px rgba(44,62,80,0.18)',
          overflow: 'hidden'
        }}
      >
        {/* Left Welcome */}
        <div
          style={{
            background: 'linear-gradient(130deg, #052094 20%, #277fec 85%)',
            color: '#fff',
            flex: '1 1 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '3.2rem 1.3rem 2.5rem 1.3rem',
            justifyContent: 'center'
          }}
        >
          {/* Logo */}
          <div style={{display:'flex', alignItems:'center', marginBottom:'2.3rem'}}>
            <img src={logo} alt="Blog Logo" style={{
              width: 70, height: 70, borderRadius: '50%', marginRight: 18, objectFit:'contain', background: '#fff',boxShadow: '0 4px 14px rgba(44,62,100,0.044)'
            }} />
            <span style={{fontWeight:800, fontSize:'1.12rem', letterSpacing:'0.03em'}}>Mini Blog</span>
          </div>
          <h1 style={{fontWeight:800, fontSize:'2.18rem', marginBottom:'0.4em', lineHeight:'1.13'}}>Create Account</h1>
          <p style={{color:'#cdddff', fontSize:'1rem', marginBottom:'2.0em', textAlign:'center'}}>
            Share ideas, comment, and join our community.
          </p>
          <Link to="/" style={{textDecoration:'none'}}>
            <button style={{
              border: 'none',
              padding: '0.88em 2em',
              borderRadius: '28px',
              fontWeight: 700,
              fontSize: '1.1rem',
              background: 'rgba(255,255,255,0.13)',
              color: '#fff',
              boxShadow: '0 4px 16px rgba(44,62,100,0.03)'
            }}>
              View more
            </button>
          </Link>
        </div>
        {/* Right Form */}
        <div
          style={{
            flex: '1 1 0',
            padding: '2.8rem 2.6rem 2.2rem 2.6rem',
            background: '#f7fafc',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <form onSubmit={handleSubmit} style={{ maxWidth: 330, width: '100%', margin: '0 auto' }}>
            <label htmlFor="username" style={{
              fontWeight:600, marginBottom: 6, display:'block', color:'#2336C4'
            }}>Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '9px 16px',
                fontSize: '1rem',
                marginBottom: 19,
                border: '1.7px solid #e1e7ee',
                borderRadius: '8px',
                outline: 'none'
              }}
            />

            <label htmlFor="email" style={{
              fontWeight:600, marginBottom: 6, display:'block', color:'#2336C4'
            }}>Email address</label>
            <input
              id="email"
              type="email"
              placeholder="name@mail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '9px 16px',
                fontSize: '1rem',
                marginBottom: 19,
                border: '1.7px solid #e1e7ee',
                borderRadius: '8px',
                outline: 'none'
              }}
            />

            <label htmlFor="password" style={{
              fontWeight:600, marginBottom: 6, display:'block', color:'#2336C4'
            }}>Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '9px 16px',
                fontSize: '1rem',
                marginBottom: 19,
                border: '1.7px solid #e1e7ee',
                borderRadius: '8px',
                outline: 'none'
              }}
            />

            <label htmlFor="password2" style={{
              fontWeight:600, marginBottom: 6, display:'block', color:'#2336C4'
            }}>Confirm Password</label>
            <input
              id="password2"
              type="password"
              placeholder="Repeat password"
              value={password2}
              onChange={e => setPassword2(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '9px 16px',
                fontSize: '1rem',
                marginBottom: 20,
                border: '1.7px solid #e1e7ee',
                borderRadius: '8px',
                outline: 'none'
              }}
            />

            {message && (
              <div className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"}`} style={{marginBottom:10, fontSize:'1rem'}}>
                {message}
              </div>
            )}

            <button
              type="submit"
              style={{
                width:'100%',
                padding:'12px 0',
                background: 'linear-gradient(100deg,#003aff 60%,#007bff 100%)',
                color:'#fff',
                border:'none',
                borderRadius:'7px',
                fontWeight:700,
                fontSize:'1.1rem',
                marginBottom:8,
                boxShadow: '0 4px 14px rgba(39,127,236,0.09)',
                cursor:'pointer'
              }}>
              Register
            </button>
          </form>

          <div style={{margin:'1.5em 0 0 0', textAlign:'center'}}>
            <span style={{color:'#2336C4'}}>Already have an account?</span>
            <Link to="/login"
              style={{
                display:'block',
                marginTop:'0.7em',
                background: 'linear-gradient(90deg,#003aff 60%,#277fec 100%)',
                color:'#fff',
                border:'none',
                borderRadius:'7px',
                padding:'12px 0',
                fontWeight:700,
                width:'100%',
                textDecoration:'none',
                letterSpacing:'.03em',
                transition:'transform 0.09s'
              }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
