import React, { useEffect, useRef, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome, faCog, faTags } from "@fortawesome/free-solid-svg-icons";
import MUIDrawer from "../MUI/MUIDrawer";
import "./VerticalMenu.css"; // Import your CSS for styling
import Tooltip from "@mui/material/Tooltip";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import BookingForm from "../BookingForm";
import { useSelector } from "react-redux";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const PATHS = ["/admin/dashboard", "/admin/book-slot", "/admin/bookings", "/manage-expense"];
const icons = [<HomeIcon />, <AddCircleIcon />, <CalendarMonthIcon />, <CurrencyRupeeIcon />];

function getPathDisplayName(path) {
  // Extract the display name from the path, e.g., "/admin/dashboard" -> "Dashboard"
  const parts = path.split("/");
  return parts[parts.length - 1].replace("-", " ").toUpperCase();
}

function VerticalMenu({ isFullMenu }) {
  const { admin } = useSelector((state) => state.venue);

  const pathName = window.location.pathname;
  const [openDrawer, setOpenDrawer] = useState(false); // Manage open state for the drawer

  const openBookSlot = () => {
    setOpenDrawer(true); // Open the drawer when this function is called
  };
  return (
    <>
      <div className="vertical-menu">
        {PATHS.map((path, index) => (
          <div
            key={index}
            className={
              pathName === path
                ? "menu-item-container menu-item-active"
                : "menu-item-container"
            }
          >
            {path === "/admin/book-slot" ? (
              <div
                onClick={() => {
                  openBookSlot();
                }}
              >
                <Link to={path} className="left-nav-links">
                  <div className="menu-item">
                    <div className="menu-item-content pos-rel">
                      {isFullMenu ? (
                        <>
                          <span className="menu-item-name dnt-show-530">
                            {`${getPathDisplayName(path)}`}
                          </span>
                          {icons[index]}
                        </>
                      ) : (
                        <>
                          <Tooltip
                            title={`${getPathDisplayName(path)}`}
                            placement="right-start"
                          >
                            {icons[index]}
                          </Tooltip>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <Link to={path} className="left-nav-links">
                <div>
                  <div className="menu-item">
                    <div className="menu-item-content pos-rel">
                      {isFullMenu ? (
                        <>
                          <span className="menu-item-name dnt-show-530">
                            {`${getPathDisplayName(path)}`}
                          </span>
                          {icons[index]}
                        </>
                      ) : (
                        <>
                          <Tooltip
                            title={`${getPathDisplayName(path)}`}
                            placement="right-start"
                          >
                            {icons[index]}
                          </Tooltip>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
      
    </>
  );
}

export default VerticalMenu;
