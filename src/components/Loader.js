import React from "react";
import "./Loader.css"; // Import your CSS file for styling 
import { useLoaderContext } from "../contexts/LoaderContextProvider";

function Loader() {
    const { isLoading } = useLoaderContext();
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
