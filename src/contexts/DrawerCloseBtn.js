import React, { createContext, useContext, useState } from "react";
export const context = createContext();

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

export const useDrawerCloseContext = () => useContext(context);
export default DrawerCloseBtnProvider;