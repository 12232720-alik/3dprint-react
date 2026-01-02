import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Admin.css";

const Admin = () => {
  const [designs, setDesigns] = useState([]);

  
  const API_URL = process.env.REACT_APP_API_URL;

  
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const res = await axios.get(`${API_URL}/designs`);
        setDesigns(res.data);
      } catch (err) {
        console.error("Error fetching designs:", err);
      }
    };
    fetchDesigns();
  }, [API_URL]);

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      setDesigns(designs.filter((d) => d.id !== id));
    } catch (err) {
      console.error("Error deleting design:", err);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <Link to="/admin/add">Add Design</Link>

      <table>
        <thead>
          <tr>
            <th>Name</th><th>Price</th><th>Image</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {designs.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.price}</td>
              <td>
                <img
                  src={`${API_URL}${d.image}`}
                  width="50"
                  alt={d.name || "Design image"}
                />
              </td>
              <td>
                <Link to={`/admin/update/${d.id}`}>Edit</Link>
                <button onClick={() => handleDelete(d.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
