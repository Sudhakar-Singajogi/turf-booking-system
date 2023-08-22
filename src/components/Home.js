import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

import Testimonials from "./Testimonials";
import Venues from "./Venues";
import WhyChoosePyro from "./WhyChoosePyro";
function Home() {
  const [mobileNavActive, setMobileNavActive] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavActive(!mobileNavActive);
  };

  useEffect(() => {
    const parallax = document.querySelector(".hero");
    window.addEventListener("scroll", () => {
      const offset = window.scrollY;
      parallax.style.backgroundPositionY = -offset * 0.5 + "px";
      if (mobileNavActive) {
        toggleMobileNav();
      }
    });
  }, []);

  return (
    <>
      <div className="header sticky top-0 z-50 bgblack">
        <div className="flex justify-between items-center py-3 px-5 w100">
          <div className="logo">
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
              PyroSports
            </Link>
          </div>
          <nav className="navbar">
            <ul className="menu ">
              <li>
                <Link path="">Home</Link>
              </li>
              <li>
                <Link path="">Sports</Link>
              </li>
              <li>
                <Link path="">Venues</Link>
              </li>
              <li>
                <Link path="">Contact</Link>
              </li>
            </ul>
          </nav>
          <div
            className={`hamburger ${mobileNavActive ? "active" : ""}`}
            onClick={toggleMobileNav}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>

      <div className={`mobile-nav ${mobileNavActive ? "active" : ""}`}>
        <ul>
          <li>
            <Link path="">Home</Link>
          </li>
          <li>
            <Link path="">Sports</Link>
          </li>
          <li>
            <Link path="">Venues</Link>
          </li>
          <li>
            <Link path="">Contact</Link>
          </li>
        </ul>
      </div>

      <section className="hero">
        <div className="hero-content">
          <h1>Discover the Thrill of Sports</h1>
          <p>Your go-to platform for booking and enjoying sports activities.</p>
          <a href="#" className="cta-button">
            View Venues
          </a>
        </div>
      </section>

      <WhyChoosePyro />
      <Venues />
      <Testimonials />
    </>
  );
}

export default Home;
