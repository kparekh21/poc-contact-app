import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <nav className="navbar">
      {/* Logo Section with Image */}
      <div className="navbar-logo">
        <img src="/logo.png" alt="Company Logo" className="logo-image" />
      </div>

      {/* Login/Register Section */}
      <div className="navbar-links">
        <button 
          className="navbar-button" 
          onClick={handleLogin}
        >
          Login
        </button>
        <button 
          className="navbar-button register" 
          onClick={handleSignup}
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;