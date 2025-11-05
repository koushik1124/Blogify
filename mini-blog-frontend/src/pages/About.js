import React from "react";
import logo from "../assets/blog.png"; // ✅ use the same logo

function About() {
  return (
    <div
      style={{
        minHeight: "92vh",
        background: "linear-gradient(135deg, #0a0f3c 0%, #1c46ff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem 1rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          boxShadow: "0 12px 36px rgba(0,0,0,0.15)",
          maxWidth: "860px",
          width: "100%",
          padding: "3rem 2.8rem",
          color: "#1e2a78",
          lineHeight: "1.7",
          transition: "transform 0.3s ease",
        }}
      >
        {/* Header with logo and title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1.8rem",
            gap: "0.8rem",
          }}
        >
          <img
            src={logo}
            alt="Mini Blog Logo"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "#fff",
              padding: "6px",
              boxShadow: "0 3px 10px rgba(30,64,255,0.2)",
              objectFit: "contain",
            }}
          />
          <h2
            style={{
              fontWeight: 800,
              fontSize: "1.8rem",
              color: "#1e40ff",
              letterSpacing: ".01em",
            }}
          >
            About Mini Blog Platform
          </h2>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "1.05rem",
            marginBottom: "1.5rem",
            color: "#333",
          }}
        >
          The <strong>Mini Blog Platform</strong> is designed for students,
          developers, and anyone passionate about sharing knowledge. Built with{" "}
          <strong>React, PHP, MySQL, and Bootstrap</strong>, it demonstrates a
          professional, full-stack workflow for complete user-based blogging.
        </p>

        {/* Features */}
        <ul
          style={{
            fontSize: "1.05rem",
            color: "#2f2f2f",
            paddingLeft: "1.4rem",
            marginBottom: "2rem",
            listStyleType: "disc",
          }}
        >
          <li style={{ marginBottom: "0.5rem" }}>
            <b>User Authentication:</b> Secure sign-up and login for a safe
            blogging experience.
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <b>CRUD Posts:</b> Create, read, update, and delete your posts at
            any time.
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <b>Comments:</b> Foster community by enabling meaningful discussions
            under every post.
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <b>Personal Dashboard:</b> Manage all your contributions in one
            place.
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <b>Responsive Design:</b> Enjoy a seamless experience on any device
            with a modern, nature-inspired interface.
          </li>
        </ul>

        {/* Closing statement */}
        <p
          style={{
            color: "#1e40ff",
            fontWeight: 700,
            fontSize: "1.15rem",
            textAlign: "center",
            lineHeight: "1.6",
          }}
        >
          This blog is open source, educational, and a perfect portfolio project
          to showcase full-stack skills.
        </p>
      </div>
    </div>
  );
}

export default About;
