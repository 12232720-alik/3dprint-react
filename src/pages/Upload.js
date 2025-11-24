import React, { useState } from "react";
import "../styles/Upload.css";

function Upload() {
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("File submitted successfully!");
  };

  return (
    <div className="upload">
      <h1>Upload Your 3D Design</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".stl,.obj" onChange={handleUpload} />
        <button type="submit">Submit</button>
      </form>
      {file && <p>Selected file: {file.name}</p>}
    </div>
  );
}

export default Upload;
