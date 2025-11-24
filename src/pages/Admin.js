import React from "react";
import "../styles/Admin.css";
import { useDesigns } from "../DesignContext";

function AdminContent() {
  const { designs, addDesign, removeDesign } = useDesigns();

  const addNewDesign = () => {
    const name = prompt("Enter design name:");
    const price = prompt("Enter price:");

    if (name && price) {
      addDesign({ name, price: Number(price) });
    }
  };

  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>
      <button onClick={addNewDesign}>Add Design</button>

      <ul>
        {designs.map((d) => (
          <li key={d.id}>
            {d.name} - ${d.price.toFixed(2)}
            <button onClick={() => removeDesign(d.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminContent;
