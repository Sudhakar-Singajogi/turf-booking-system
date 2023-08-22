import React, { memo, useEffect } from "react";
import VenueCard from "./VenueCard";



function Venues({venus}) {
  useEffect(() => {}, []);

  return (
    <>
      <section className="testimonials">
        <div className="heading-container">
          <div className="vertical-line"></div>
          <h2>Our Top Venues</h2>
        </div>

        <div className="venues-container">
        <VenueCard />
        <VenueCard />
        <VenueCard />
        </div>
      </section>
    </>
  );
}

export default memo(Venues);
