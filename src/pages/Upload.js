import React, { useState } from "react";
import axios from "axios";
import "../styles/Upload.css";

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("File uploaded successfully!");
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    }
  };

  return (
    <div className="upload">
      <h1>Upload Your 3D Design</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" accept=".stl,.obj" onChange={handleUpload} />
        <button type="submit">Submit</button>
      </form>

      {file && <p>Selected file: {file.name}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Upload;
