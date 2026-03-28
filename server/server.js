require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// =======================
// DATABASE
// =======================

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Mongo Error:", err));

// ARTICLE MODEL
const Article = mongoose.model("Article", {
  title: String,
  image: String,
  link: String,
  preview: String,
  date: { type: Date, default: Date.now }
});

// =======================
// MIDDLEWARE
// =======================

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// =======================
// AUTH
// =======================

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    req.session.authenticated = true;
    return res.json({ success: true });
  }

  res.status(401).json({ success: false });
});

app.get("/api/check-auth", (req, res) => {
  if (req.session.authenticated) {
    res.json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

app.post("/api/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// =======================
// ARTICLES API (PROTECTED)
// =======================

// ADD ARTICLE
app.post("/api/articles", async (req, res) => {
  if (!req.session.authenticated) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const article = new Article(req.body);
  await article.save();

  res.json({ success: true });
});

// GET ARTICLES (PUBLIC)
app.get("/api/articles", async (req, res) => {
  const articles = await Article.find().sort({ date: -1 });
  res.json(articles);
});

// DELETE ARTICLE
app.delete("/api/articles/:id", async (req, res) => {
  if (!req.session.authenticated) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await Article.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// =======================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});