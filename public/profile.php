<?php
session_start();
require_once '../config/db.php';
include '../includes/header.php';

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

// Fetch posts by current user
$stmt = $pdo->prepare("SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC");
$stmt->execute([$_SESSION['user_id']]);
$posts = $stmt->fetchAll();
?>
<h2 class="mb-4">My Posts</h2>
<?php foreach ($posts as $post): ?>
    <div class="card mb-3">
        <div class="card-body">
            <h4 class="card-title">
                <a href="post.php?id=<?php echo $post['id']; ?>">
                    <?php echo htmlspecialchars($post['title']); ?>
                </a>
            </h4>
            <p class="card-text"><?php echo nl2br(htmlspecialchars_decode(substr($post['content'], 0, 200))); ?>...</p>
            <a href="edit_post.php?id=<?php echo $post['id']; ?>" class="btn btn-sm btn-warning me-2">Edit</a>
            <a href="delete_post.php?id=<?php echo $post['id']; ?>" class="btn btn-sm btn-danger">Delete</a>
        </div>
    </div>
<?php endforeach; ?>

<?php if (count($posts) === 0): ?>
    <div class="alert alert-info">You haven't written any posts yet.</div>
<?php endif; ?>

<?php include '../includes/footer.php'; ?>
