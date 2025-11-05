import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Post from './pages/Post';            // <-- Single post view
import CreatePost from './pages/CreatePost';// <-- Create post
import EditPost from './pages/EditPost';    // <-- Edit post
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<Post />} />          {/* Single post view + comments + delete */}
        <Route path="/create" element={<CreatePost />} />      {/* Create post */}
        <Route path="/edit/:id" element={<EditPost />} />      {/* Edit post */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
