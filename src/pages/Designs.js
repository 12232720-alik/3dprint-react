import { useEffect, useState } from "react";
import axios from "axios";

const Designs = () => {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/designs`);
        setDesigns(res.data);
      } catch (err) {
        console.error("Error fetching designs:", err);
      }
    };

    fetchDesigns();
  }, []);

  return (
    <div>
      {designs.map((d) => (
        <div key={d.id}>
          <img
            src={`${process.env.REACT_APP_API_URL}${d.image}`}
            alt={d.name || ""}
            width="50"
          />
          <p>{d.name}</p>
          <p>{d.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Designs;
