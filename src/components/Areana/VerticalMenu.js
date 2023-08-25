import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCog, faTags } from "@fortawesome/free-solid-svg-icons";
import "./VerticalMenu.css"; // Import your CSS for styling
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

function VerticalMenu({ isFullMenu }) {
  console.log('isFullMenu: ', isFullMenu)
  return (
    <div className="vertical-menu">
      <Link to="/admin/dashboard" className="left-nav-links">
      <div className="menu-item menu-item-active">
        <div className="menu-item-cotent">
          {isFullMenu ? (
            <>
              <span className="menu-item-name dnt-show-530">Dashboard</span>
              <FontAwesomeIcon className="menu-item-icon" icon={faHome} />
            </>
          ) : (
            <>
              <Tooltip title="Dashboard" placement="right-start">
                <FontAwesomeIcon className="menu-item-icon" icon={faHome} />
              </Tooltip>
            </>
          )}
        </div>
      </div>
      </Link>
      <div className="menu-item">
        <FontAwesomeIcon icon={faCog} />
      </div>
      <div className="menu-item">
        <FontAwesomeIcon icon={faTags} />
      </div>
    </div>
  );
}

export default VerticalMenu;
