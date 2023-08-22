import React, { useContext } from "react";
import Drawer from "@mui/material/Drawer";
import { context } from "../../contexts/context";

export default function MUIDrawer({ open, component, onClose }) {
  const { isOpen } = useContext(context);

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
