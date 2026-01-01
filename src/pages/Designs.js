import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../CartContext";
import "../styles/Designs.css";
function Designs() {
  const [designs, setDesigns] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
  axios.get(`${process.env.REACT_APP_API_URL}/designs`)
      .then((res) => setDesigns(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="designs">
      {designs.map((d) => (
        <div key={d.id} className="design-card">
          <h3>{d.name}</h3>
          <p>${d.price}</p>

          {d.image && (
            <img
              src={`${process.env.REACT_APP_API_URL}/images/${d.image}`}
              alt={d.name}
              style={{ width: "200px" }}
            />
          )}

          <button onClick={() => addToCart(d)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Designs;
