<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/db.php';
session_start();

// Read raw JSON POST input
$input = json_decode(file_get_contents("php://input"), true);
$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

$response = [
    "success" => false,
    "message" => "Invalid email or password."
];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $email && $password) {
    $stmt = $pdo->prepare("SELECT id, username, password FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user'] = $user['username'];
        $_SESSION['user_id'] = $user['id'];
        $response["success"] = true;
        $response["message"] = "Login successful.";
        $response["user"] = [
            "id" => $user['id'],
            "username" => $user['username'],
            "email" => $email
        ];
    }
}

// Echo back JSON (for React)
echo json_encode($response);
exit();
?>
