import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Designs from "./pages/Designs";
import Upload from "./pages/Upload";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

import AuthContext from "./AuthContext";  
import { AuthProvider } from "./AuthContext";
import { useAuth } from "./AuthContext";
import LoginForm from "./pages/LoginForm";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/designs" element={<Designs />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} /> 
          
          <Route path="/auth" element={<AuthProvider><LoginForm /></AuthProvider>} /> 
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
