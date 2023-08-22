import React, { memo } from "react";

const TestimonialCard = memo(function VenueCard() {
  return (
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
  );
});

export default TestimonialCard;
