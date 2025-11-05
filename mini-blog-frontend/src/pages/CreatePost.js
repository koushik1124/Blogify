import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/blog.png"; // ✅ correct import path

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post(
        "http://localhost/mini-blog-platform/public/create_post.php",
        { title, content, user_id: user?.id }
      );
      if (response.data.success) {
        setMessage("✅ Post created successfully!");
        setTitle("");
        setContent("");
        setTimeout(() => navigate("/posts"), 1200);
      } else {
        setMessage(response.data.message || "⚠️ Failed to create post.");
      }
    } catch {
      setMessage("🚫 Server error. Please try again later.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0f3c 0%, #1c46ff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Inter', sans-serif",
        padding: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          background: "#fff",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(180deg, #1e40ff 0%, #3a69ff 100%)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "3rem 2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <img
              src={logo}
              alt="Mini Blog Logo"
              style={{
                width: "65px",
                height: "65px",
                borderRadius: "50%",
                background: "#fff",
                padding: "6px",
                boxShadow: "0 4px 12px rgba(255,255,255,0.3)",
                objectFit: "contain",
                marginRight: "0.8rem",
              }}
            />
            <h2
              style={{
                fontWeight: 700,
                fontSize: "1.4rem",
                letterSpacing: ".01em",
              }}
            >
              Mini Blog
            </h2>
          </div>

          <h1
            style={{
              fontWeight: 800,
              fontSize: "2rem",
              marginBottom: "0.6rem",
              textAlign: "center",
            }}
          >
            Create & Inspire ✍️
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              opacity: 0.9,
              textAlign: "center",
              lineHeight: "1.6",
              maxWidth: "300px",
            }}
          >
            Share your thoughts with the community and let your ideas shine.
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div
          style={{
            flex: 1.3,
            padding: "3rem 2.5rem",
            backgroundColor: "#f9fbff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              color: "#1e2a78",
              fontWeight: 800,
              fontSize: "1.8rem",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Create New Post
          </h2>

          {message && (
            <div
              style={{
                textAlign: "center",
                background: message.includes("success")
                  ? "#d1f7d6"
                  : "#ffe5e5",
                color: message.includes("success") ? "#256029" : "#7a1111",
                borderRadius: "10px",
                padding: "0.7rem",
                marginBottom: "1.2rem",
                fontWeight: 500,
              }}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1.2rem" }}>
              <label
                style={{
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "#1e2a78",
                  marginBottom: "0.4rem",
                  display: "block",
                }}
              >
                Title
              </label>
              <input
                type="text"
                placeholder="Enter your post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.8rem 1rem",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "1.5px solid #c5c8f5",
                  outline: "none",
                  transition: "border 0.3s ease",
                }}
                onFocus={(e) =>
                  (e.target.style.border = "1.5px solid #1e40ff")
                }
                onBlur={(e) =>
                  (e.target.style.border = "1.5px solid #c5c8f5")
                }
              />
            </div>

            <div style={{ marginBottom: "1.6rem" }}>
              <label
                style={{
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "#1e2a78",
                  marginBottom: "0.4rem",
                  display: "block",
                }}
              >
                Content
              </label>
              <textarea
                placeholder="Write something amazing..."
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.9rem 1rem",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "1.5px solid #c5c8f5",
                  outline: "none",
                  resize: "vertical",
                  transition: "border 0.3s ease",
                }}
                onFocus={(e) =>
                  (e.target.style.border = "1.5px solid #1e40ff")
                }
                onBlur={(e) =>
                  (e.target.style.border = "1.5px solid #c5c8f5")
                }
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                background:
                  "linear-gradient(90deg, #1e40ff 0%, #3a69ff 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "0.9rem",
                fontWeight: 700,
                fontSize: "1.1rem",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(30,64,255,0.3)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.02)";
                e.target.style.boxShadow = "0 6px 16px rgba(30,64,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 12px rgba(30,64,255,0.3)";
              }}
            >
              Publish Post 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
