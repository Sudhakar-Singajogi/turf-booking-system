import React from "react";
import "./Loader.css"; // Import your CSS file for styling
import { useDrawerCloseContext } from "../contexts/DrawerCloseBtn";

function Loader() {
    const { isLoading } = useDrawerCloseContext();
    console.log('hey i haven loaded here:', isLoading)

  return isLoading ? (
    <>
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    </>
  ) : (
    ""
  );
}

export default Loader;
