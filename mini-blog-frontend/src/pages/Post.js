import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/blog.png"; // ✅ same logo for consistency

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`http://localhost/mini-blog-platform/public/post.php?id=${id}`)
      .then((res) => {
        setPost(res.data.post);
        setComments(res.data.comments);
      });
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await axios.post(
        `http://localhost/mini-blog-platform/public/post.php?id=${id}`,
        {
          comment: commentText,
          user_id: user?.id,
        }
      );
      if (response.data.success) {
        setComments([
          ...comments,
          {
            username: user.username,
            content: commentText,
            created_at: new Date().toISOString(),
          },
        ]);
        setCommentText("");
        setMessage("✅ Comment posted!");
      } else {
        setMessage(response.data.message || "⚠️ Failed to post comment.");
      }
    } catch {
      setMessage("🚫 Server error.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      const response = await axios.post(
        "http://localhost/mini-blog-platform/public/delete_post.php",
        {
          id,
          user_id: user?.id,
        }
      );
      if (response.data.success) {
        alert("Post deleted!");
        navigate("/posts");
      } else {
        alert(response.data.message || "Could not delete post.");
      }
    } catch {
      alert("Server error.");
    }
  };

  if (!post)
    return (
      <div
        style={{
          minHeight: "92vh",
          background: "linear-gradient(135deg, #0a0f3c 0%, #1c46ff 100%)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.2rem",
        }}
      >
        Loading...
      </div>
    );

  return (
    <div
      style={{
        minHeight: "92vh",
        background: "linear-gradient(135deg, #0a0f3c 0%, #1c46ff 100%)",
        color: "#fff",
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
          maxWidth: "800px",
          width: "100%",
          padding: "2.8rem 2.4rem",
          color: "#1e2a78",
        }}
      >
        {/* Header with logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
            gap: "0.7rem",
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
            Post Details
          </h2>
        </div>

        {/* Post Content */}
        <h3
          style={{
            fontWeight: 700,
            color: "#1e40ff",
            fontSize: "1.45rem",
            marginBottom: "0.7rem",
          }}
        >
          {post.title}
        </h3>

        <p
          style={{
            fontSize: "1.08rem",
            color: "#222",
            marginBottom: "1.4rem",
            lineHeight: "1.6",
          }}
        >
          {post.content}
        </p>

        <small style={{ color: "#606b9b", display: "block", marginBottom: 24 }}>
          by <strong>{post.username}</strong> • {post.created_at}
        </small>

        {/* Post Actions */}
        <div style={{ marginBottom: "2rem" }}>
          <Link
            to="/posts"
            style={{
              textDecoration: "none",
              color: "#1e40ff",
              fontWeight: 600,
              marginRight: "1.2rem",
            }}
          >
            ← Back to Posts
          </Link>
          {user && user.username === post.username && (
            <>
              <Link
                to={`/edit/${id}`}
                style={{
                  textDecoration: "none",
                  color: "#ff9800",
                  fontWeight: 600,
                  marginRight: "1.2rem",
                }}
              >
                ✏️ Edit
              </Link>
              <button
                onClick={handleDelete}
                style={{
                  background: "linear-gradient(90deg, #ff1744, #d50000)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "6px 16px",
                  cursor: "pointer",
                  fontWeight: 600,
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                🗑️ Delete
              </button>
            </>
          )}
        </div>

        {/* Comments Section */}
        <div>
          <h4
            style={{
              color: "#1e40ff",
              fontWeight: 800,
              marginBottom: "1.2rem",
            }}
          >
            Comments 💬
          </h4>

          {comments.length === 0 ? (
            <div style={{ color: "#666", marginBottom: "1rem" }}>
              No comments yet.
            </div>
          ) : (
            comments.map((c, idx) => (
              <div
                key={idx}
                style={{
                  background: "linear-gradient(135deg, #f9fbff 0%, #f2f5ff 100%)",
                  borderRadius: "10px",
                  padding: "0.9rem 1rem",
                  marginBottom: "0.8rem",
                  boxShadow: "0 2px 6px rgba(30,64,255,0.08)",
                }}
              >
                <strong style={{ color: "#1e40ff" }}>{c.username}</strong>:{" "}
                <span style={{ color: "#222" }}>{c.content}</span>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#777",
                    marginTop: "0.3rem",
                  }}
                >
                  {c.created_at}
                </div>
              </div>
            ))
          )}

          {/* Comment Form */}
          {user ? (
            <form onSubmit={handleComment} style={{ marginTop: "1.2rem" }}>
              <textarea
                required
                rows={2}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                style={{
                  width: "100%",
                  padding: "0.7rem 1rem",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "1.5px solid #c5c8f5",
                  outline: "none",
                  resize: "vertical",
                  transition: "border 0.3s ease",
                  marginBottom: "0.8rem",
                }}
                onFocus={(e) => (e.target.style.border = "1.5px solid #1e40ff")}
                onBlur={(e) => (e.target.style.border = "1.5px solid #c5c8f5")}
              />
              <button
                type="submit"
                style={{
                  background: "linear-gradient(90deg, #1e40ff, #3a69ff)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "25px",
                  padding: "8px 24px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 3px 10px rgba(30,64,255,0.3)",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                Post Comment 🚀
              </button>
            </form>
          ) : (
            <div style={{ color: "#1e40ff", fontWeight: 500, marginTop: "1rem" }}>
              Please login to post a comment.
            </div>
          )}

          {message && (
            <div
              style={{
                marginTop: "1rem",
                background: "#eaf2ff",
                color: "#1e40ff",
                borderRadius: "8px",
                padding: "0.6rem 1rem",
                fontSize: "0.95rem",
                textAlign: "center",
              }}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
