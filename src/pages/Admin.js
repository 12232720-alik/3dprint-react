import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Admin.css";
const Admin = () => {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/designs").then((res) => {
      setDesigns(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/designs/${id}`);
    setDesigns(designs.filter((d) => d.id !== id));
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
                <img src={`http://localhost:5000/images/${d.image}`} width="50" />
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
