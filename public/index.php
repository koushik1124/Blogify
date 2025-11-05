<?php
session_start();
require_once '../config/db.php';
include '../includes/header.php';

// Handle search
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
if ($search) {
    $stmt = $pdo->prepare(
        "SELECT posts.*, users.username FROM posts 
         JOIN users ON posts.user_id = users.id 
         WHERE posts.title LIKE ? OR posts.content LIKE ? 
         ORDER BY posts.created_at DESC"
    );
    $stmt->execute(["%$search%", "%$search%"]);
} else {
    $stmt = $pdo->query(
        "SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC"
    );
}
$posts = $stmt->fetchAll();
?>

<h2 class="mb-4">All Posts</h2>

<!-- Search Bar -->
<form method="get" class="mb-4">
    <input class="form-control w-50 d-inline" type="text" name="search" value="<?php echo htmlspecialchars($search); ?>" placeholder="Search posts...">
    <button class="btn btn-outline-secondary btn-sm ms-2">Search</button>
    <?php if ($search): ?>
        <a href="index.php" class="btn btn-link btn-sm ms-2">Clear</a>
    <?php endif; ?>
</form>

<?php foreach ($posts as $post): ?>
    <div class="card mb-3">
        <div class="card-body">
            <h4 class="card-title">
                <a href="post.php?id=<?php echo $post['id']; ?>" class="text-decoration-none">
                    <?php echo htmlspecialchars($post['title']); ?>
                </a>
            </h4>
            <h6 class="card-subtitle mb-2 text-muted">
                by <?php echo htmlspecialchars($post['username']); ?>, <?php echo $post['created_at']; ?>
            </h6>
            <p class="card-text">
                <?php echo nl2br(htmlspecialchars_decode(substr($post['content'], 0, 200))); ?>...
            </p>
            <?php if (isset($_SESSION['user_id']) && $_SESSION['user_id'] == $post['user_id']): ?>
                <a href="edit_post.php?id=<?php echo $post['id']; ?>" class="btn btn-sm btn-warning me-2">Edit</a>
                <a href="delete_post.php?id=<?php echo $post['id']; ?>" class="btn btn-sm btn-danger" onclick="return confirm('Delete this post?');">Delete</a>
            <?php endif; ?>
        </div>
    </div>
<?php endforeach; ?>

<?php if (count($posts) === 0): ?>
    <div class="alert alert-info">No posts yet<?php echo $search ? " matching your search." : "."; ?> Be the first to create one!</div>
<?php endif; ?>

<?php include '../includes/footer.php'; ?>
