require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Parser = require("rss-parser");

const app = express();
const parser = new Parser();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* ROUTES */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contact", require("./routes/contact"));

/* SUBSTACK ARTICLES */
app.get("/api/articles", async (req, res) => {
  try {
    const feed = await parser.parseURL("https://koyokk.substack.com/feed");

    const articles = feed.items.slice(0, 6).map(item => ({
      title: item.title,
      link: item.link,
      preview: item.contentSnippet
    }));

    res.json(articles);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));