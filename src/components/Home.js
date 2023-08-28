import React, {useCallback} from "react";
import "./Home.css"; 

import Testimonials from "./Testimonials";
import Venues from "./Venues";
import WhyChoosePyro from "./WhyChoosePyro";
import PublicHeader from "./Areana/PublicHeader";
function Home() {
  return (
    <>
      <PublicHeader />

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
