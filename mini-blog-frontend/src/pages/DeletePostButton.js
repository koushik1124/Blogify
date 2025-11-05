import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeletePostButton({ postId }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.post('http://localhost/mini-blog-platform/public/delete_post.php', {
        id: postId,
        user_id: user?.id // Only allow logged-in user's own posts!
      });
      if (response.data.success) {
        alert('Post deleted!');
        navigate('/posts');
      } else {
        alert(response.data.message || 'Failed to delete post.');
      }
    } catch {
      alert('Server error.');
    }
  };

  return (
    <button className="btn btn-danger btn-sm mt-2" onClick={handleDelete}>Delete Post</button>
  );
}

export default DeletePostButton;
