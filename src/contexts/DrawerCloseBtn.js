import React, { useState } from "react";
import { context } from "./context";

const DrawerCloseBtnProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDrawer = (value) => { 
    setIsOpen((prev) => value);
  };

  return (
    <context.Provider value={{ isOpen, closeDrawer }}>
      {children}
    </context.Provider>
  );
}; 

export default DrawerCloseBtnProvider;