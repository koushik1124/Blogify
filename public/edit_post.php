<?php
// CORS headers for React/AJAX
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/db.php';
session_start();

// Accept JSON input from React
$input = json_decode(file_get_contents("php://input"), true);
$post_id = $input['id'] ?? null;
$user_id = $input['user_id'] ?? ($_SESSION['user_id'] ?? null);
$title = isset($input['title']) ? htmlspecialchars(trim($input['title'])) : null;
$content = isset($input['content']) ? htmlspecialchars(trim($input['content'])) : null;

$response = [
    "success" => false,
    "message" => "Edit failed."
];

// Only allow POST requests with proper fields
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $post_id && $user_id && $title && $content) {
    // Confirm post ownership
    $stmt = $pdo->prepare("SELECT * FROM posts WHERE id = ? AND user_id = ?");
    $stmt->execute([$post_id, $user_id]);
    $post = $stmt->fetch();

    if (!$post) {
        $response['message'] = "Post not found or unauthorized.";
    } else {
        $stmt = $pdo->prepare("UPDATE posts SET title = ?, content = ? WHERE id = ?");
        $stmt->execute([$title, $content, $post_id]);
        $response['success'] = true;
        $response['message'] = "Post updated!";
    }
}

// Output JSON for React
echo json_encode($response);
exit();
?>
