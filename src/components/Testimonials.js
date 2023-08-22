import React from "react";
import TestimonialCard from "./TestimonialCard";

function Testimonials({testimonials}) {
  return (
    <>
      <section className="testimonials">
        <div className="heading-container">
          <div className="vertical-line"></div>
          <h2>What Our Users Say</h2>
        </div>

        <div className="feedback-container">
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
        </div>
      </section>
    </>
  );
}

export default Testimonials;
