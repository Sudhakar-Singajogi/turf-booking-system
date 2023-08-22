import React, { useState } from "react";
import PublicHeader from "./PublicHeader";
import "../Home.css";
import "./Login.css";
import ImageSlider from "./ImageSlider";
import SlideShow from "../SlideShow";

function AreanaLogin() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const [products, setProducts] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    // You can add your login logic here, such as making API requests to authenticate the venue owner
    console.log("Login ID:", loginId);
    console.log("Password:", password);
  };

  const images = [
    "assets/pngs/venue.png",
    "assets/pngs/venue.png",
    "assets/pngs/venue.png",
  ];

  return (
    <>
    {/* {
      products.length && products.map((product) => (
        <p>product.title</p>
      )) 
    } */}
      <PublicHeader />
      <div className="login-container">
        <div className="image-gallery">
          {/* <ImageSlider images={images} /> */}
          <SlideShow />
        </div>
        <div className="login-form">
          <h2>Venue Owner Login</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="loginId">Venue Login ID</label>
            <input
              type="text"
              id="loginId"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AreanaLogin;
