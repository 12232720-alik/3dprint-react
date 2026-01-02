import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const UpdateDesign = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL; 

  
  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const res = await axios.get(`${API_URL}/search/${id}`);
        const design = res.data[0];
        setName(design.name);
        setPrice(design.price);
        setImage(design.image);
      } catch (err) {
        console.error("Error fetching design:", err);
      }
    };
    fetchDesign();
  }, [id, API_URL]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);

    
    if (image instanceof File) formData.append("image", image);

    try {
      await axios.post(`${API_URL}/modify/${id}`, formData);
      navigate("/admin");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="form">
      <h2>Update Design</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

    
      {image && !(image instanceof File) && (
        <img
          src={`${API_URL}/images/${image}`}
          width="50"
          alt={name || "Design image"}
        />
      )}

      <button onClick={handleSubmit}>Update</button>
      <Link to="/admin">Back</Link>
    </div>
  );
};

export default UpdateDesign;
