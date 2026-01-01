import { useState } from "react";
import axios from "axios";
import "../styles/Upload.css";

function Upload() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("customer_name", name);
    formData.append("customer_email", email);
    formData.append("file", file);

    await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData);
    setSuccess(true);
    setName("");
    setEmail("");
    setFile(null);
  };

  return (
    <div className="upload">
      <div className="upload-box">
        <h1>Upload Your 3D File</h1>
        <p>Send us your custom design and we’ll take care of the rest.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />

          <button type="submit">Upload File</button>

          {success && (
            <p className="success">
              File uploaded successfully 
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Upload;
