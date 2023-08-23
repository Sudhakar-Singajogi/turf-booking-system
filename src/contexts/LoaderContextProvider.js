import React, { createContext, useContext, useState } from "react"; 
export const context = createContext();

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

export const useLoaderContext = () => useContext(context);
