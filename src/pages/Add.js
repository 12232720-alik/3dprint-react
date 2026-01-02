import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Add = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", file);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/adddesigns`, formData);
      navigate("/admin");
    } catch (error) {
      console.error("Add design error:", error);
    }
  };

  return (
    <div className="form">
      <h2>Add Design</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleSubmit}>Add</button>
      <Link to="/admin">Back</Link>
    </div>
  );
};

export default Add;
