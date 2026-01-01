const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "3d_library",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
  } else {
    console.log("✅ MySQL connected");
  }
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "_" + file.originalname
    );
  },
});

const upload = multer({ storage });


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const q = "SELECT * FROM admin WHERE username=? AND password=?";
  db.query(q, [username, password], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length > 0) {
      res.json({ success: true, admin: data[0] });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

app.post("/adddesigns", upload.single("image"), (req, res) => {
  const { name, price } = req.body;
  const image = req.file ? req.file.filename : null;

  const q = `
    INSERT INTO designs (name, price, image)
    VALUES (?, ?, ?)
  `;

  db.query(q, [name, price, image], (err) => {
    if (err) return res.status(500).json(err);
    res.json("Design added successfully");
  });
});

app.get("/designs", (req, res) => {
  const q = "SELECT * FROM designs";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

app.get("/search/:id", (req, res) => {
  const q = "SELECT * FROM designs WHERE id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

app.post("/modify/:id", upload.single("image"), (req, res) => {
  const { name, price } = req.body;
  const image = req.file ? req.file.filename : null;

  let q, values;

  if (image) {
    q = `
      UPDATE designs
      SET name=?, price=?, image=?
      WHERE id=?
    `;
    values = [name, price, image, req.params.id];
  } else {
    q = `
      UPDATE designs
      SET name=?, price=?
      WHERE id=?
    `;
    values = [name, price, req.params.id];
  }

  db.query(q, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json("Design updated successfully");
  });
});

app.delete("/designs/:id", (req, res) => {
  const id = req.params.id;

  const getImage = "SELECT image FROM designs WHERE id=?";
  db.query(getImage, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    const imagePath = result[0]?.image
      ? path.join(__dirname, "images", result[0].image)
      : null;

    const del = "DELETE FROM designs WHERE id=?";
    db.query(del, [id], (err) => {
      if (err) return res.status(500).json(err);

      if (imagePath && fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      res.json("Design deleted successfully");
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
