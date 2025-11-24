import React from "react";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      <h1>Welcome to 3D Print Library</h1>
      <p>
        Choose from a variety of 3D designs or upload your own for printing.
      </p>
      <a href="/designs" className="btn">Browse Designs</a>
    </div>
  );
}

export default Home;
