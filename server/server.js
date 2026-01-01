
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

["uploads", "images"].forEach((folder) => {
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
});

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "3d_library",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
  } else {
    console.log("✅ MySQL connected");
  }
});


const uploadFiles = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
  }),
});


const uploadImages = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "images/"),
    filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
  }),
});

app.post("/login", (req, res) => {
  const { username, password , email} = req.body;
  const q = "SELECT * FROM admin WHERE username=? AND password=? And email=? ";
  db.query(q, [username, password, email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) res.json({ success: true, admin: data[0] });
    else res.status(401).json({ success: false, message: "Invalid credentials" });
  });
});


app.post("/upload", uploadFiles.single("file"), (req, res) => {
  const { customer_name, customer_email } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ message: "No file uploaded" });

  const q = `
    INSERT INTO uploads (customer_name, customer_email, file_name, file_path)
    VALUES (?, ?, ?, ?)
  `;

  db.query(q, [customer_name, customer_email, file.originalname, file.filename], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "File uploaded successfully" });
  });
});


app.post("/adddesigns", uploadImages.single("image"), (req, res) => {
  const { name, price } = req.body;
  const image = req.file ? req.file.filename : null;

  const q = "INSERT INTO designs (name, price, image) VALUES (?, ?, ?)";
  db.query(q, [name, price, image], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Design added successfully" });
  });
});


app.get("/designs", (req, res) => {
  db.query("SELECT * FROM designs", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});


app.get("/search/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM designs WHERE id=?", [id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});


app.post("/modify/:id", uploadImages.single("image"), (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const image = req.file ? req.file.filename : null;

  let q, values;
  if (image) {
    q = "UPDATE designs SET name=?, price=?, image=? WHERE id=?";
    values = [name, price, image, id];
  } else {
    q = "UPDATE designs SET name=?, price=? WHERE id=?";
    values = [name, price, id];
  }

  db.query(q, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Design updated successfully" });
  });
});


app.delete("/designs/:id", (req, res) => {
  const { id } = req.params;

 
  db.query("SELECT image FROM designs WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);

    const imagePath = result[0]?.image ? path.join(__dirname, "images", result[0].image) : null;

    db.query("DELETE FROM designs WHERE id=?", [id], (err) => {
      if (err) return res.status(500).json(err);

    
      if (imagePath && fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

      res.json({ message: "Design deleted successfully" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
