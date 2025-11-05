<?php
// CORS support for React/AJAX
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/db.php';
session_start();

// Accept JSON POST
$input = json_decode(file_get_contents("php://input"), true);
$post_id = $input['id'] ?? null;
$user_id = $input['user_id'] ?? ($_SESSION['user_id'] ?? null);

$response = [
    "success" => false,
    "message" => "Unauthorized or missing ID."
];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $post_id && $user_id) {
    $stmt = $pdo->prepare("DELETE FROM posts WHERE id = ? AND user_id = ?");
    $stmt->execute([$post_id, $user_id]);
    if ($stmt->rowCount() > 0) {
        $response['success'] = true;
        $response['message'] = "Post deleted.";
    } else {
        $response['message'] = "Could not delete post or not authorized.";
    }
}

// Respond as JSON
echo json_encode($response);
exit();
?>
