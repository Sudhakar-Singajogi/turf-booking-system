import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyApp from './MyApp';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline'; // Import CssBaseline for base styles
import 'react-datepicker/dist/react-datepicker.css'; // Import the datepicker CSS
import CartPaymenyPolicy from './CartPaymenyPolicy';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline />
    {/* <MyApp /> */}
    <CartPaymenyPolicy />

  </React.StrictMode>
);

reportWebVitals();
