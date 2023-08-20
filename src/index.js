import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyApp from './MyApp';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline'; // Import CssBaseline for base styles
import 'react-datepicker/dist/react-datepicker.css'; 

import { Provider } from "react-redux";
import store from "./Redux/store";
import LoaderContextProvider from './contexts/LoaderContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Provider store={store}>
      <LoaderContextProvider>
    <CssBaseline />

    <MyApp />
    </LoaderContextProvider>
    </Provider>
    {/* <CartPaymenyPolicy /> */}

  </React.StrictMode>
);

reportWebVitals();
