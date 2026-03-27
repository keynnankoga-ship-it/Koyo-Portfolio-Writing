const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const Parser = require("rss-parser");

const parser = new Parser();

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage });

/* Upload Project */
router.post("/", auth, upload.single("image"), async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
    image: req.file ? "/uploads/" + req.file.filename : null
  });

  await project.save();
  res.json(project);
});

/* Get All Projects (DB + Substack) */
router.get("/", async (req, res) => {
  const dbProjects = await Project.find().sort({ date: -1 });

  let substackProjects = [];

  try {
    const feed = await parser.parseURL(process.env.SUBSTACK_RSS);

    substackProjects = feed.items.map(item => ({
      title: item.title,
      description: item.contentSnippet,
      link: item.link,
      image: null
    }));
  } catch {}

  res.json([...substackProjects, ...dbProjects]);
});

module.exports = router;