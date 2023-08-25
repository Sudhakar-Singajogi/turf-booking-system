import React, { useEffect, useState } from "react";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function TopNav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { admin } = useSelector((state) => state.venue);

  const handleClose = () => {
    setAnchorEl(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <div className="header sticky top-0 z-50 bgblack">
        <div className="admin-header w100">
          <Tooltip title="Account settings" className="account-menu-tooltip">
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
            <MenuItem>
              {/* <Avatar />{" "} */}
              {parseInt(Object.keys(admin.info).length) > 0
                ? admin.info.arena_name.toUpperCase()
                : ""}
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <Link to="/admin/configure-arena" className="links-under-profile">
                Configure Arena
              </Link>
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <Link
                className="links-under-profile"
                onClick={() => {
                  window.location.href = "/arena-login";
                }}
              >
                Logout
              </Link>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
}

export default TopNav;
