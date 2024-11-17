import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo Section with Image */}
      <div className="navbar-logo">
        <img src="/logo.png" alt="Company Logo" className="logo-image" />
      </div>

      {/* Login/Register Section */}
      <div className="navbar-links">
        <button className="navbar-button">Login</button>
        <button className="navbar-button register">Register</button>
      </div>
    </nav>
  );
};

export default Navbar;
