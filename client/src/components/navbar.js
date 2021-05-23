import React from 'react';
import { Link } from 'react-router-dom';

 const Navbar = (props) => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">Meal-Tracker</Link>
      <div className="collpase navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/About" className="nav-link">About</Link>
        </li>
      </ul>
      </div>
    </nav>
  );
}


export default Navbar;
