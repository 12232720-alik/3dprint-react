import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const UpdateDesign = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/search/${id}`).then((res) => {
      setName(res.data[0].name);
      setPrice(res.data[0].price);
      setImage(res.data[0].image);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (image instanceof File) formData.append("image", image);

    await axios.post(`http://localhost:5000/modify/${id}`, formData);
    navigate("/admin");
  };

  return (
    <div className="form">
      <h2>Update Design</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      {image && !(image instanceof File) && (
        <img src={`http://localhost:5000/images/${image}`} width="100" />
      )}

      <button onClick={handleSubmit}>Update</button>
      <Link to="/admin">Back</Link>
    </div>
  );
};

export default UpdateDesign;
