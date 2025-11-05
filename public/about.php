import React from 'react';

function About() {
  return (
    <div className="bg-overlay d-flex flex-column justify-content-center align-items-center py-5" style={{minHeight:'70vh'}}>
      <div className="card shadow-lg rounded" style={{maxWidth: '700px'}}>
        <div className="card-body p-4">
          <h2 className="mb-4 fw-bold text-primary">About Mini Blog Platform</h2>
          <p>
            The Mini Blog Platform is designed for students, developers, and anyone passionate about sharing knowledge.
            Built with React, PHP, MySQL, and Bootstrap, it demonstrates a professional workflow for complete user-based blogging:
          </p>
          <ul>
            <li><b>User Authentication:</b> Secure sign-up and login for a safe blogging experience.</li>
            <li><b>CRUD Posts:</b> Create, read, update, and delete your posts anytime.</li>
            <li><b>Comments:</b> Foster community by enabling meaningful discussions under every post.</li>
            <li><b>Personal Dashboard:</b> Manage all your contributions in one place.</li>
            <li><b>Responsive Design:</b> Enjoy a seamless experience on any device with a beautiful nature-inspired background.</li>
          </ul>
          <p>
            <b>This blog is open source, educational, and a perfect portfolio project to showcase full-stack skills.</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
