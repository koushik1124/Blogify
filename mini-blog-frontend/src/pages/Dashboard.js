import React from "react";
import logo from "../assets/blog.png"; // ✅ same logo path as others

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

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
          maxWidth: "520px",
          width: "100%",
          padding: "2.8rem 2.5rem",
          color: "#1e2a78",
        }}
      >
        {/* Logo and Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.8rem",
            gap: "0.8rem",
          }}
        >
          <img
            src={logo}
            alt="Mini Blog Logo"
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              background: "#fff",
              padding: "5px",
              boxShadow: "0 3px 10px rgba(30,64,255,0.25)",
              objectFit: "contain",
            }}
          />
          <h2
            style={{
              fontWeight: 800,
              fontSize: "1.6rem",
              color: "#1e40ff",
              margin: 0,
            }}
          >
            Dashboard
          </h2>
        </div>

        {/* Content */}
        {user ? (
          <>
            <p
              style={{
                fontSize: "1.05rem",
                color: "#333",
                marginBottom: "0.6rem",
                textAlign: "center",
              }}
            >
              Welcome,{" "}
              <span style={{ fontWeight: 700, color: "#1e40ff" }}>
                {user.username}
              </span>
              !
            </p>
            <p
              style={{
                fontSize: "1rem",
                color: "#2a2a2a",
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              Your email:{" "}
              <span style={{ color: "#1c46ff", fontWeight: 500 }}>
                {user.email}
              </span>
            </p>

            {/* Info card */}
            <div
              style={{
                background: "linear-gradient(135deg, #f5f7ff 0%, #ebf0ff 100%)",
                borderRadius: "12px",
                padding: "1.2rem 1rem",
                boxShadow: "0 2px 8px rgba(30,64,149,0.08)",
                color: "#222",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0 }}>
                Here you can manage your posts and account settings.
              </p>
            </div>
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
              fontSize: "1.1rem",
              color: "#1e40ff",
              fontWeight: 500,
            }}
          >
            Please log in to see your dashboard.
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
