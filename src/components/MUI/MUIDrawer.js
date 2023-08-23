import React from "react";
import Drawer from "@mui/material/Drawer"; 
import { useDrawerCloseContext } from "../../contexts/DrawerCloseBtn";

export default function MUIDrawer({ open, component, onClose }) {
  const { isOpen } = useDrawerCloseContext();

  return (
    <div>
      {
        <React.Fragment key="right">
          <Drawer
            //    variant="persistent"
            anchor="right"
            open={isOpen} 
          >
            {component}
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}
