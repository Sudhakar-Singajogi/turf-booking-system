import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { Drawer } from "@mui/material";

export default function MUIDrawer({ open, component }) {
  console.log('ope is: ', open)
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: true,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 370 }}
      role="presentation" 
      className="admin-book-slot"
    >
      {component}
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <>
         <Drawer
            variant="persistent"
            anchor={anchor}
            open={open}
            // onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer> 
        </>
         
          
      ))}
    </div>
  );
}
