import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../assets/blog.png"; // ✅ Use same logo

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost/mini-blog-platform/public/post.php?id=${id}`)
      .then((res) => {
        setTitle(res.data.post.title);
        setContent(res.data.post.content);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.post(
        "http://localhost/mini-blog-platform/public/edit_post.php",
        {
          id,
          title,
          content,
          user_id: user?.id,
        }
      );
      if (response.data.success) {
        setMessage("✅ Post updated successfully!");
        setTimeout(() => navigate(`/post/${id}`), 1000);
      } else {
        setMessage(response.data.message || "⚠️ Failed to update post.");
      }
    } catch {
      setMessage("🚫 Server error. Please try again later.");
    }
  };

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
        {/* Header with logo */}
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
              fontSize: "1.7rem",
              color: "#1e40ff",
              margin: 0,
            }}
          >
            Edit Post
          </h2>
        </div>

        {message && (
          <div
            style={{
              textAlign: "center",
              background: message.includes("successfully")
                ? "#d1f7d6"
                : "#ffe5e5",
              color: message.includes("successfully") ? "#256029" : "#7a1111",
              borderRadius: "10px",
              padding: "0.8rem",
              marginBottom: "1.3rem",
              fontWeight: 500,
              fontSize: "0.95rem",
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Title Input */}
          <div style={{ marginBottom: "1.2rem" }}>
            <label
              style={{
                fontWeight: 600,
                fontSize: "0.95rem",
                marginBottom: "0.5rem",
                display: "block",
                color: "#1e2a78",
              }}
            >
              Title
            </label>
            <input
              type="text"
              placeholder="Enter your post title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                borderRadius: "10px",
                border: "1.8px solid #cfd3ff",
                fontSize: "1rem",
                padding: "0.75rem 1rem",
                outline: "none",
                boxShadow: "0 3px 10px rgba(0,0,0,0.04)",
                transition: "border 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.border = "1.8px solid #1e40ff")}
              onBlur={(e) => (e.target.style.border = "1.8px solid #cfd3ff")}
            />
          </div>

          {/* Content Textarea */}
          <div style={{ marginBottom: "1.6rem" }}>
            <label
              style={{
                fontWeight: 600,
                fontSize: "0.95rem",
                marginBottom: "0.5rem",
                display: "block",
                color: "#1e2a78",
              }}
            >
              Content
            </label>
            <textarea
              placeholder="Edit your content here..."
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                width: "100%",
                borderRadius: "10px",
                border: "1.8px solid #cfd3ff",
                fontSize: "1rem",
                padding: "0.85rem 1rem",
                outline: "none",
                resize: "vertical",
                boxShadow: "0 3px 10px rgba(0,0,0,0.04)",
                transition: "border 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.border = "1.8px solid #1e40ff")}
              onBlur={(e) => (e.target.style.border = "1.8px solid #cfd3ff")}
            />
          </div>

          {/* Update Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(90deg, #1e40ff 0%, #3a69ff 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
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
            Update Post ✨
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
