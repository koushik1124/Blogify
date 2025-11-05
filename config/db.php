<?php
// config/db.php

$host = 'localhost';            // Database host
$db   = 'mini_blog';            // Your database name
$user = 'root';                 // Database username
$pass = 'root123';         // Database password (replace with yours)

try {
    // Create a new PDO instance
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    // Set Error Mode to Exception for better error handling
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Display an error message if connection fails
    die("DB ERROR: " . $e->getMessage());
}
?>
