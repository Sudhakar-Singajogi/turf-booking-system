import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
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
      <header className="sticky top-0 z-50 bgblack">
        <div className="flex justify-between items-center py-3 px-5 w100">
          <div className="logo">
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
              PyroSports
            </Link>
          </div>
          <nav className="navbar">
            <ul className="menu ">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Sports</a>
              </li>
              <li>
                <a href="#">Bookings</a>
              </li>
              <li>
                <a href="#">Contact</a>
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
      </header>

      <div className={`mobile-nav ${mobileNavActive ? "active" : ""}`}>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Sports</a>
          </li>
          <li>
            <a href="#">Bookings</a>
          </li>
          <li>
            <a href="#">Contact</a>
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

      <section className="unique-selling-points">
        <div className="heading-container">
          <div className="vertical-line"></div>
          <h2>Why Choose PyroSport?</h2>
        </div>
        <div className="usp">
          <div className="cart-item m-y-10">
            <div className="flex-col">
              <div className="font-medium md:text-sm md:mt-0.5 pointer ">
                <div className="flex">
                  <div className="svg-container">
                    <img
                      src="assets/pngs/sports.png"
                      alt="SVG Image1"
                      className="svg-width"
                    />
                    <span className="why-pyro  ml-0-5rem">
                      Wide range of sports activities
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-col">
              <div className="font-medium md:text-sm md:mt-0.5 pointer ">
                <div className="flex">
                  <div className="svg-container">
                    <img
                      src="assets/pngs/schedule.png"
                      alt="SVG Image1"
                      className="svg-width"
                    />
                    <span className="why-pyro  ml-0-5rem">
                      Easy and convenient booking
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-col">
              <div className="font-medium md:text-sm md:mt-0.5 pointer ">
                <div className="flex">
                  <div className="svg-container">
                    <img
                      src="assets/pngs/photo-camera.png"
                      alt="Unforgettable Moments on the Turf"
                      className="svg-width"
                    />
                    <span className="why-pyro  ml-0-5rem">
                    Unforgettable Moments on the Turf </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-item m-y-10">
            <div className="flex-col">
              <div className="font-medium md:text-sm md:mt-0.5 pointer ">
                <div className="flex">
                  <div className="svg-container">
                    <img
                      src="assets/pngs/pitch.png"
                      alt="SVG Image1"
                      className="svg-width"
                    />
                    <span className="why-pyro  ml-0-5rem">
                      Top-notch sports venues
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-col">
              <div className="font-medium md:text-sm md:mt-0.5 pointer ">
                <div className="flex">
                  <div className="svg-container">
                    <img
                      src="assets/pngs/partners.png"
                      alt="SVG Image1"
                      className="svg-width"
                    />
                    <span className="why-pyro  ml-0-5rem">
                      Passionate organizers
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-col">
              <div className="font-medium md:text-sm md:mt-0.5 pointer ">
                <div className="flex">
                  <div className="svg-container">
                    <img
                      src="assets/pngs/open-mind.png"
                      alt="Like Minded People"
                      className="svg-width"
                    />
                    <span className="why-pyro  ml-0-5rem">
                    Connect with Like-Minded Enthusiasts

                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      <section className="testimonials">
        <div className="heading-container">
          <div className="vertical-line"></div>
          <h2>Our Top Venues</h2>
        </div>

        <div className="venues-container">
          <div className="venue-card">
            <div className="venue-image">
              <img   src="assets/pngs/venue.png" alt="Venue Images" />
            </div>
            <div className="venue-details">
                <div className="tx-left">
                <p>Venue Name @ Uppal</p>
                <p> 9:00 AM - 9:00 PM</p>
                </div>

                <div className="tx-right">
                <p>Total Turfs: 3</p>
                <p>
                    
                    <SportsCricketIcon sx={{color:"gray"}} />
                    <SportsSoccerIcon sx={{color:"gray"}} />
                </p>

                </div>
              
              
              
              
            </div>
              <button className="book-button">View Details</button>
          </div>

          <div className="venue-card">
            <div className="venue-image">
              <img   src="assets/pngs/venue.png" alt="Venue Images" />
            </div>
            <div className="venue-details">
            <div className="tx-left">

                <p>Venue Name @ Uppal</p>
                <p> 9:00 AM - 9:00 PM</p>
                </div>

                <div className="tx-right">
                <p>Total Turfs: 3</p>
                <p>
                    
                    <SportsCricketIcon sx={{color:"gray"}} />
                    <SportsSoccerIcon sx={{color:"gray"}} />
                </p>

                </div>
              
              
              
              
            </div>
              <button className="book-button">View Details</button>
          </div>

          <div className="venue-card">
            <div className="venue-image">
              <img   src="assets/pngs/venue.png" alt="Venue Images" />
            </div>
            <div className="venue-details">
            <div className="tx-left">

                <p>Venue Name @ Uppal</p>
                <p> 9:00 AM - 9:00 PM</p>
                </div>

                <div className="tx-right">
                <p>Total Turfs: 3</p>
                <p>
                    
                    <SportsCricketIcon sx={{color:"gray"}} />
                    <SportsSoccerIcon sx={{color:"gray"}} />
                    <SportsTennisIcon sx={{color:"gray"}}  />
                </p>

                </div>
              
              
              
              
            </div>
              <button className="book-button">View Details</button>
          </div>
           
        </div>
      </section>

      <section className="testimonials">
        <div className="heading-container">
          <div className="vertical-line"></div>
          <h2>What Our Users Say</h2>
        </div>

        <div className="feedback-container">
          <div className="feedback-card">
            <div className="feedback-left">
              <div className="stars">★★★★☆</div>
            </div>

            <div className="feedback-content">
              <p className="feedback-text">
                "Excellent experience! The facilities are top-notch."
              </p>
              <p className="feedback-author">
                - John Doe{" "}
                <img
                  src="assets/pngs/sudhakar.png"
                  className="feedback-user-img"
                  alt="User Profile"
                />
              </p>
            </div>
          </div>
          <div className="feedback-card">
            <div className="feedback-left">
              <div className="stars">★★★★☆</div>
            </div>

            <div className="feedback-content">
              <p className="feedback-text">
                "Excellent experience! The facilities are top-notch."
              </p>
              <p className="feedback-author">
                - John Doe{" "}
                <img
                  src="assets/pngs/sudhakar.png"
                  className="feedback-user-img"
                  alt="User Profile"
                />
              </p>
            </div>
          </div>
          <div className="feedback-card">
            <div className="feedback-left">
              <div className="stars">★★★★☆</div>
            </div>

            <div className="feedback-content">
              <p className="feedback-text">
                "Excellent experience! The facilities are top-notch."
              </p>
              <p className="feedback-author">
                - John Doe{" "}
                <img
                  src="assets/pngs/sudhakar.png"
                  className="feedback-user-img"
                  alt="User Profile"
                />
              </p>
            </div>
          </div>
          <div className="feedback-card">
            <div className="feedback-left">
              <div className="stars">★★★★☆</div>
            </div>

            <div className="feedback-content">
              <p className="feedback-text">
                "Excellent experience! The facilities are top-notch."
              </p>
              <p className="feedback-author">
                - John Doe{" "}
                <img
                  src="assets/pngs/sudhakar.png"
                  className="feedback-user-img"
                  alt="User Profile"
                />
              </p>
            </div>
          </div>
        </div>
      </section>
      
    </>
  );
}

export default Home;
