import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Admin.css";

const Admin = () => {
  const [designs, setDesigns] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/designs`
      );
      setDesigns(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load designs");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this design?")) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/designs/${id}`
      );

      // Remove from UI without refresh
      setDesigns((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="admin">
      <h2>Admin Panel</h2>

      <Link className="add-btn" to="/admin/add">
        + Add Design
      </Link>

      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {designs.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>${Number(d.price).toFixed(2)}</td>
              <td>
                {d.image ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/images/${d.image}`}
                    alt={d.name}
                    width="60"
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td className="actions">
                <Link to={`/admin/update/${d.id}`} className="edit-btn">
                  ✏️ Edit
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(d.id)}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
