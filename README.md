🌐 Mini Blog Platform

A modern, full-stack blogging application showcasing clean architecture, responsive design, and seamless integration between React, PHP, and MySQL.
It offers a complete blogging workflow with authentication, CRUD functionality, and community engagement through comments — built to demonstrate professional full-stack skills.

🚀 Features

🔐 User Authentication: Secure registration, login, and logout with session management.

✏️ Create, Read, Update, Delete (CRUD): Full control over your blog posts.

💬 Comment System: Engage in meaningful discussions under each post.

🧭 Personal Dashboard: Manage your posts and account information in one place.

📱 Responsive Design: Optimized for mobile, tablet, and desktop with a clean, gradient-based UI.

🪶 Custom Branding: Easily update the logo, colors, and typography.

🗂 Organized Folder Structure: Clear separation of frontend, backend, and assets for maintainability.

🧰 Tech Stack
Layer	Technology
Frontend	React, JavaScript, CSS (Bootstrap optional)
Backend	PHP (RESTful API), MySQL
Styling	Custom CSS, Google Fonts, modern gradients
Assets	Logo and icons in src/assets/
⚙️ Getting Started
1️⃣ Clone the Repository
git clone https://github.com/yourusername/mini-blog-platform.git
cd mini-blog-platform

2️⃣ Set up the Backend (PHP + MySQL)

Use XAMPP, LAMP, or WAMP for your local environment.

Import the provided SQL file (users, posts, comments) into phpMyAdmin or MySQL.

Move the public/ folder contents into your server’s root directory (e.g., htdocs/mini-blog-platform/public).

3️⃣ Run the Frontend (React)
cd frontend
npm install
npm start

4️⃣ Configure API Endpoints

In your React app, update the API URLs to match your backend location:

http://localhost/mini-blog-platform/public/

🗂 Folder Structure
```
text
mini-blog-platform/
├── frontend/
│   ├── src/
│   │   ├── pages/          # React pages (Home, Posts, Post, CreatePost, Dashboard, Login, Register, About)
│   │   ├── assets/         # Logos, images
│   │   └── components/     # Optional reusable UI components (Navbar, Footer, etc.)
│   └── package.json
├── public/                 # PHP API files (login.php, register.php, posts.php, post.php, create_post.php, delete_post.php)
├── database.sql            # MySQL schema (optional)
└── README.md
```
🧩 Customization

Replace the logo in src/assets/mini-blog-logo.png with your own branding.

Update gradient colors or typography to match your preferred theme.

Extend features such as:

❤️ Likes

🏷️ Tags

🔍 Search

🧾 User Profiles

🤝 Contributing

Contributions and suggestions are always welcome!
If you’d like to propose new features or improvements, open an issue before submitting a pull request.

📜 License

This project is open-source for educational and portfolio use.
