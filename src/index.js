import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext';   
import { DesignProvider } from "./DesignContext";
import { CartProvider } from './CartContext';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider> 
      <DesignProvider>
        <CartProvider>
        <App />
        </CartProvider>
      </DesignProvider>
    </AuthProvider>
  </React.StrictMode>
);



