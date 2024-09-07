<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hermit Table</title>
  <script src="/socket.io/socket.io.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Welcome to Hermit Table</h1>
  <input type="email" id="email" placeholder="Email">
  <input type="password" id="password" placeholder="Password">
  <button id="signUpBtn">Sign Up</button>
  <button id="loginBtn">Login</button>
  <!-- Add your game interface here -->

  <script type="module" src="firebase.js"></script>
  <script type="module" src="app.js"></script>
</body>
</html>
