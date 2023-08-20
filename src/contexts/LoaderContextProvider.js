import React, { useState } from "react";
import { context } from "./context";

const LoaderContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoader = (value) => {
    console.log('hey loading:', value)
    setIsLoading((prev) => value);
  };

  return (
    <context.Provider value={{ isLoading, setLoader }}>
      {children}
    </context.Provider>
  );
};
export default LoaderContextProvider;
