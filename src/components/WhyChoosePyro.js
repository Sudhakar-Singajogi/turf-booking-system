import React from "react";

function WhyChoosePyro() {
  return (
    <>
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
                      Unforgettable Moments on the Turf{" "}
                    </span>
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
    </>
  );
}

export default WhyChoosePyro;
