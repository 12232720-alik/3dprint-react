import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h3>3D Print Library</h3>
      <p>Turning your ideas into reality with professional 3D printing.</p>
      <div className="footer-bottom">
        © {new Date().getFullYear()} 3D Print Library — All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
