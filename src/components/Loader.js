import React, { useContext } from "react";
import "./Loader.css"; // Import your CSS file for styling
import { context } from "../contexts/context";

function Loader() {
    const { isLoading } = useContext(context);
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
