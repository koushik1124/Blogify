<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

// CORS preflight handling
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
require_once '../config/db.php';

// Get post by ID
$post_id = $_GET['id'] ?? null;
$response = [
    "success" => false,
    "message" => "Post not found.",
    "post" => null,
    "comments" => []
];

if (!$post_id) {
    $response['message'] = 'Post ID required.';
    echo json_encode($response);
    exit();
}

// Fetch post
$stmt = $pdo->prepare(
    "SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?"
);
$stmt->execute([$post_id]);
$post = $stmt->fetch();

if (!$post) {
    echo json_encode($response);
    exit();
}

// Handle new comment POST API request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $comment = trim($input['comment'] ?? '');
    $user_id = $_SESSION['user_id'] ?? ($input['user_id'] ?? null);

    if ($comment && $user_id) {
        $stmt = $pdo->prepare("INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)");
        $stmt->execute([$post_id, $user_id, $comment]);
        $response['message'] = "Comment posted.";
        $response['success'] = true;
    } else {
        $response['message'] = "Login required and comment must not be empty.";
    }
}

// Fetch comments for the post
$stmt = $pdo->prepare(
    "SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE post_id = ? ORDER BY created_at ASC"
);
$stmt->execute([$post_id]);
$comments = $stmt->fetchAll();

// Build response
$response['post'] = [
    "id" => $post['id'],
    "title" => $post['title'],
    "content" => $post['content'],
    "username" => $post['username'],
    "created_at" => $post['created_at']
];
$response['comments'] = array_map(function($comment) {
    return [
        "id" => $comment['id'],
        "user_id" => $comment['user_id'],
        "username" => $comment['username'],
        "content" => $comment['content'],
        "created_at" => $comment['created_at']
    ];
}, $comments);

echo json_encode($response);
exit();
?>
