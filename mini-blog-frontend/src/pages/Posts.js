import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/blog.png"; // ✅ same logo for consistency

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost/mini-blog-platform/public/posts.php")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setPosts([]);
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "92vh",
        background: "linear-gradient(135deg, #0a0f3c 0%, #1c46ff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
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
          padding: "3rem 2.5rem",
          color: "#1e2a78",
          transition: "all 0.3s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2rem",
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
            Blog Posts
          </h2>
        </div>

        {/* Posts List */}
        {loading ? (
          <div
            style={{
              textAlign: "center",
              color: "#1e40ff",
              fontWeight: 500,
              fontSize: "1.1rem",
            }}
          >
            Loading posts...
          </div>
        ) : posts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#d62828",
              fontWeight: 600,
              fontSize: "1.1rem",
              marginTop: "1.5rem",
            }}
          >
            No posts available.
          </div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {posts.map((post) => (
              <li
                key={post.id}
                style={{
                  background: "linear-gradient(135deg, #f9fbff 0%, #f2f5ff 100%)",
                  marginBottom: "1.4rem",
                  borderRadius: "12px",
                  boxShadow: "0 4px 14px rgba(30,64,255,0.08)",
                  padding: "1.4rem 1.2rem",
                  borderLeft: "5px solid #1e40ff",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.01)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(30,64,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 14px rgba(30,64,255,0.08)";
                }}
              >
                <Link
                  to={`/post/${post.id}`}
                  style={{
                    textDecoration: "none",
                    color: "#1e40ff",
                    fontWeight: 700,
                    fontSize: "1.18rem",
                    letterSpacing: ".01em",
                  }}
                >
                  {post.title}
                </Link>
                <div
                  style={{
                    color: "#222",
                    marginTop: "0.6em",
                    fontSize: "1.05rem",
                    fontWeight: 500,
                  }}
                >
                  {post.content.length > 160
                    ? post.content.slice(0, 160) + "..."
                    : post.content}
                </div>
                <div
                  style={{
                    marginTop: "0.7em",
                    color: "#666",
                    fontSize: "0.95rem",
                    fontWeight: 400,
                  }}
                >
                  Posted on {post.created_at}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Posts;
