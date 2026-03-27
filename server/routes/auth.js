const router = require("express").Router();
const jwt = require("jsonwebtoken");

const ADMIN = {
  username: process.env.ADMIN_USER,
  password: process.env.ADMIN_PASS
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN.username && password === ADMIN.password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    return res.json({ token });
  }

  res.status(401).json({ error: "Invalid credentials" });
});

module.exports = router;