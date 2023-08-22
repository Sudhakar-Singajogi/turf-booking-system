import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MyApp from "./MyApp";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline"; // Import CssBaseline for base styles
import "react-datepicker/dist/react-datepicker.css";

import { Provider } from "react-redux";
import store from "./Redux/store";
import LoaderContextProvider from "./contexts/LoaderContextProvider";
import DrawerCloseBtnProvider from "./contexts/DrawerCloseBtn";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LoaderContextProvider>
        <DrawerCloseBtnProvider>
          <CssBaseline />

          <MyApp />
        </DrawerCloseBtnProvider>
      </LoaderContextProvider>
    </Provider>
    {/* <CartPaymenyPolicy /> */}
  </React.StrictMode>
);

reportWebVitals();
