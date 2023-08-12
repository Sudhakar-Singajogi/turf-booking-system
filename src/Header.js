import React from "react";
import { Link } from "react-router-dom"; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
          <li>
            <AccountCircleIcon style={{color:"#fff", fontSize:"1.6rem"}} />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
