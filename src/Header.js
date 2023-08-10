import React from "react";
import { Link } from "react-router-dom";
import DiamondIcon from '@mui/icons-material/Diamond';

function Header({logo}) {
  return (
    <header className="top-nav-bar">
      <nav className="top-nav">
        <div className="logo">
          <Link to="/" style={{color:"#fff", textDecoration: "none"}}> 
           Sonet Info
          </Link>
        </div>
        <ul className="nav-links">
          {/* <li>
            <a href="#">Sign Up</a>
          </li> */}
          {/* <li>
            <a href="#">Sign In</a>
          </li> */}
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <a href="#">Logout</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
