// server.js

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

/* =======================
   DATABASE CONNECTION
======================= */
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database error:", err.message);
  } else {
    console.log("✅ Connected to Railway MySQL");
    connection.release();
  }
});

/* =======================
   MIDDLEWARE
======================= */
app.use(cors({
  origin: "https://threedprint-react-4.onrender.com",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

["uploads", "images"].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

/* =======================
   MULTER
======================= */
const uploadFiles = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (_, file, cb) => cb(null, Date.now() + "_" + file.originalname),
  }),
});

const uploadImages = multer({
  storage: multer.diskStorage({
    destination: "images/",
    filename: (_, file, cb) => cb(null, Date.now() + "_" + file.originalname),
  }),
});

/* =======================
   ROUTES
======================= */
app.post("/login", (req, res) => {
  const { username, password, email } = req.body;
  const q = "SELECT * FROM admin WHERE username=? AND password=? AND email=?";
  db.query(q, [username, password, email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) res.json({ success: true, admin: data[0] });
    else res.status(401).json({ success: false });
  });
});

app.post("/upload", uploadFiles.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const { customer_name, customer_email } = req.body;
  const q =
    "INSERT INTO uploads (customer_name, customer_email, file_name, file_path) VALUES (?, ?, ?, ?)";
  db.query(
    q,
    [customer_name, customer_email, req.file.originalname, req.file.filename],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

app.post("/adddesigns", uploadImages.single("image"), (req, res) => {
  const { name, price } = req.body;
  const image = req.file ? req.file.filename : null;

  db.query(
    "INSERT INTO designs (name, price, image) VALUES (?, ?, ?)",
    [name, price, image],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

app.get("/designs", (_, res) => {
  db.query("SELECT * FROM designs", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

app.get("/search/:id", (req, res) => {
  db.query(
    "SELECT * FROM designs WHERE id=?",
    [req.params.id],
    (err, data) => {
      if (err) return res.status(500).json(err);
      res.json(data);
    }
  );
});

app.post("/modify/:id", uploadImages.single("image"), (req, res) => {
  const { name, price } = req.body;
  const image = req.file ? req.file.filename : null;

  const q = image
    ? "UPDATE designs SET name=?, price=?, image=? WHERE id=?"
    : "UPDATE designs SET name=?, price=? WHERE id=?";
  const values = image
    ? [name, price, image, req.params.id]
    : [name, price, req.params.id];

  db.query(q, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

app.delete("/designs/:id", (req, res) => {
  db.query(
    "SELECT image FROM designs WHERE id=?",
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json(err);

      const img = rows[0]?.image;
      if (img) {
        const imgPath = path.join(__dirname, "images", img);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      }

      db.query(
        "DELETE FROM designs WHERE id=?",
        [req.params.id],
        (err) => {
          if (err) return res.status(500).json(err);
          res.json({ success: true });
        }
      );
    }
  );
});

/* =======================
   START SERVER
======================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
