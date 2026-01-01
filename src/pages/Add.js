import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Add.css";

const Add = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !price || !file) {
      setError("All fields are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("image", file);

      await axios.post(
        `${process.env.REACT_APP_API_URL}/adddesigns`,
        formData
      );

      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError("Failed to add design");
    }
  };

  return (
    <div className="form">
      <h2>Add Design</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Design Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button type="submit">Add</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <Link to="/admin">⬅ Back to Admin</Link>
    </div>
  );
};

export default Add;
