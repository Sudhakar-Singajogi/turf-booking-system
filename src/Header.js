import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux/";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import MUIModal from "./components/MUI/MUIModal";
import LoginComponent from "./components/LoginComponent";

function Header({ logo }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.booking);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setShowOTP(false);
  };

  return (
    <header className="top-nav-bar">
      <nav className="top-nav">
        <div className="logo">
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            Sonet Info
          </Link>
        </div>
        <ul className="nav-links">
          {data.captain.captainId ? (
            <li>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
                  <AccountCircleIcon
                    sx={{ width: 32, height: 32 }}
                    style={{ color: "#fff", fontSize: "1.6rem" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 0.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1.5,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </li>
          ) : (
            <Tooltip
              title="Sign In"
              style={{ color: "#fff", fontSize: "1.6rem", cursor: "pointer" }}
            >
              <LoginIcon
                onClick={(e) => {
                  setModalOpen(true);
                }}
              />
            </Tooltip>
          )}
        </ul>
      </nav>
      <MUIModal
        params={{
          open: modalOpen,
          handleClose: handleModalClose,
          modalTitle: "Login",
          component: LoginComponent,
          width: 1000,
          adjustTop: "30%",
          showTitle: "yes",
        }}
      />
    </header>
  );
}

export default Header;
