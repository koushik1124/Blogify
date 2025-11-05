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

$input = json_decode(file_get_contents("php://input"), true);
$username = htmlspecialchars(trim($input['username'] ?? ''));
$email = htmlspecialchars(trim($input['email'] ?? ''));
$password = $input['password'] ?? '';
$password2 = $input['password2'] ?? '';

$response = [
    "success" => false,
    "message" => "Registration failed."
];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $username && $email && $password) {
    // Basic validation
    if ($password2 && $password !== $password2) {
        $response['message'] = "Passwords do not match!";
    } elseif (strlen($password) < 6) {
        $response['message'] = "Password must be at least 6 characters.";
    } else {
        // Check if user/email exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? OR username = ?");
        $stmt->execute([$email, $username]);
        if ($stmt->fetch()) {
            $response['message'] = "Username or email already exists!";
        } else {
            // Hash password and insert user
            $hashed = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
            $stmt->execute([$username, $email, $hashed]);
            $_SESSION['user'] = $username;
            $response['success'] = true;
            $response['message'] = "Registered successfully!";
            $response['user'] = [
                "username" => $username,
                "email" => $email
            ];
        }
    }
}

// Always return JSON
echo json_encode($response);
exit();
?>
