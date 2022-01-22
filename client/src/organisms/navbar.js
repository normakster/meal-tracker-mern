import React from 'react';
import { Link } from 'react-router-dom';

import settings from '../config/settings';

 const Navbar = (props) => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">Meal-Tracker {settings.version}</Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/Profile" className="nav-link">Profile</Link>
          </li>
          <li className="navbar-item">
            <Link to="/Pantry" className="nav-link">Pantry</Link>
          </li>
          <li className="navbar-item">
            <Link to="/Cook" className="nav-link">Cook</Link>
          </li>
          <li className="navbar-item">
            <Link to="/Food" className="nav-link">Food</Link>
          </li>
          <li className="navbar-item">
            <Link to="/Scanner" className="nav-link">Scanner</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}


export default Navbar;
import { Link } from 'react-router-dom';

import settings from '../config/settings';

 const Navbar = (props) => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">Meal-Tracker {settings.version}</Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/Profile" className="nav-link">Profile</Link>
          </li>
          <li className="navbar-item">
            <Link to="/Pantry" className="nav-link">Pantry</Link>
          </li>
          <li className="navbar-item">
            <Link to="/Cook" className="nav-link">Cook</Link>
          </li>
          <li className="navbar-item">
            <Link to="/Food" className="nav-link">Food</Link>
          </li>
          <li className="navbar-item">
            <Link to="/Scanner" className="nav-link">Scanner</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}


export default Navbar;
