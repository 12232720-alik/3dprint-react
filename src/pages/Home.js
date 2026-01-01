import "../styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>3D Print Library</h1>
        <p>Discover premium 3D designs crafted for creators.</p>
        <Link to="/designs" className="hero-btn">
          Explore Designs
        </Link>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>High Quality</h3>
          <p>Professionally crafted 3D models.</p>
        </div>

        <div className="feature-card">
          <h3>Instant Access</h3>
          <p>Download and print instantly.</p>
        </div>

        <div className="feature-card">
          <h3>Secure & Reliable</h3>
          <p>Trusted designs from verified creators.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
