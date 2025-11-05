<?php
if (session_status() === PHP_SESSION_NONE) session_start();
$loggedIn = isset($_SESSION['user']);
$username = $loggedIn ? $_SESSION['user'] : '';
?>
<!DOCTYPE html>
<html>
<head>
    <title>Mini Blog Platform</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: url('assets/img/nature.jpg') no-repeat center center fixed;
            background-size: cover;
            min-height: 100vh;
            position: relative;
        }
        body::after {
            content: "";
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(30,44,93,0.09);
            pointer-events:none;
            z-index:1;
        }
        .bg-overlay {
            background: rgba(255,255,255,0.78);
            backdrop-filter: blur(2px);
            min-height: 100vh;
            padding-bottom: 40px;
            border-radius: 1.25em;
            box-shadow: 0 10px 40px rgba(10,18,38,0.07);
            position: relative;
            z-index:2;
        }
        .navbar {
            background: rgba(255,255,255,0.77)!important;
            box-shadow: 0 2px 8px rgba(40,60,120,0.13);
            border-radius: 22px;
            margin-top: 24px;
            position: relative;
            z-index: 3;
        }
        .card {
            border-radius: 1em;
            box-shadow: 0 2px 28px rgba(44,74,103,0.10);
            background: rgba(255,255,255,0.97);
        }
    </style>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light mb-4 shadow">
    <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="/mini-blog-platform/public/home.php">Mini Blog</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">
                <li class="nav-item">
                    <a class="nav-link" href="/mini-blog-platform/public/home.php">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/mini-blog-platform/public/about.php">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/mini-blog-platform/public/index.php">Posts</a>
                </li>
                <?php if ($loggedIn): ?>
                    <li class="nav-item">
                        <a class="nav-link" href="/mini-blog-platform/public/profile.php">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/mini-blog-platform/public/create_post.php">New Post</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/mini-blog-platform/public/logout.php">Logout (<?php echo htmlspecialchars($username); ?>)</a>
                    </li>
                <?php else: ?>
                    <li class="nav-item">
                        <a class="nav-link" href="/mini-blog-platform/public/login.php">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/mini-blog-platform/public/register.php">Register</a>
                    </li>
                <?php endif; ?>
            </ul>
        </div>
    </div>
</nav>
<div class="container bg-overlay rounded shadow-lg py-4">
