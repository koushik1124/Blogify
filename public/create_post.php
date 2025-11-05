<?php
// CORS headers for React/AJAX
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

// Preflight OPTIONS handler
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/db.php';
session_start();

// Accept raw JSON input (React/AJAX)
$input = json_decode(file_get_contents("php://input"), true);
$title = htmlspecialchars(trim($input['title'] ?? ''));
$content = htmlspecialchars(trim($input['content'] ?? ''));
$user_id = $input['user_id'] ?? ($_SESSION['user_id'] ?? null);

$response = [
    "success" => false,
    "message" => "All fields required."
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($user_id && $title && $content) {
        $stmt = $pdo->prepare("INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)");
        $stmt->execute([$user_id, $title, $content]);
        $response['success'] = true;
        $response['message'] = "Post published!";
    } else {
        $response['message'] = "All fields required!";
    }
}

// Output JSON for React
echo json_encode($response);
exit();
?>
