async function checkAuth() {
  try {
    const res = await fetch("/api/check-auth");

    if (res.ok) {
      showDashboard();
    } else {
      showLogin();
    }
  } catch {
    showLogin();
  }
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    showDashboard();
  } else {
    document.getElementById("error").innerText = "Invalid login";
  }
}

async function addArticle() {
  const title = document.getElementById("title").value;
  const image = document.getElementById("image").value;
  const link = document.getElementById("link").value;
  const preview = document.getElementById("preview").value;

  const res = await fetch("/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, image, link, preview })
  });

  if (res.ok) {
    alert("Article saved!");
  } else {
    alert("Failed (not logged in?)");
  }
}

async function logout() {
  await fetch("/api/logout", { method: "POST" });
  showLogin();
}

function showDashboard() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
}

function showLogin() {
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("dashboard").style.display = "none";
}

// INIT
checkAuth();