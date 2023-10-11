import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import "./policy.css";

import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GrassIcon from "@mui/icons-material/Grass";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors } from "./Redux/Slices/BookingFormValidatorReducer";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useGetExactToTime from "./CustomHooks/useGetExactToTime";
import MUIModal from "./components/MUI/MUIModal";
import LoginComponent from "./components/LoginComponent";
import RazorPayment from "./CustomHooks/RazorPayment";
import { checkIsWeekEnd } from "./CustomLogics/customLogics";
import { applyCouponCost } from "./Redux/Slices/BokingSliceReducer";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SlotBookingForm from "./components/Areana/SlotBookingForm";
import ValidateCaptain from "./components/Areana/ValidateCaptain";
import { Divider } from "@mui/material";

function getTurfName(turfs, turfId) {
  if (turfId > 0) {
    const turf = turfs.filter((i) => i.value === turfId);
    return turf[0].label;
  }
}

function getGameName(games, gameId) {
  if (gameId > 0) {
    const sport = games.filter((i) => i.value === gameId);
    return sport[0].label;
  }
}

function CartPaymentPolicy({ isAdmin = false }) {
  const { data: slot } = useSelector((state) => state.booking);
  const [modalOpen, setModalOpen] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showPaymentForm,  setShowPaymentForm] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getExactToTime } = useGetExactToTime();
  const { initiatePayment } = RazorPayment();
  const couponCost = 0.05;


  console.log("slot is: ", slot);
  const turfs = slot.turfs;
  const sports = slot.sports;
  const bookingAmount = slot.bookingamount;

  useEffect(() => {
    console.log("booked date is:", slot.bookeddate);
    console.log("is weekend: ", checkIsWeekEnd(slot.bookeddate));

    if (!checkIsWeekEnd(slot.bookeddate)) {
      dispatch(applyCouponCost({couponCost: couponCost, "couponCode":"WeekDay"}));
    }
  }, [couponCost]);

  const proceedToPaymentForm = () => {
    setShowPaymentForm(true)
  }

  if (
    slot.game === 0 ||
    slot.turf === 0 ||
    slot.timeslot === "" ||
    slot.bookeddate === ""
  ) {
    dispatch(clearErrors());
    if (slot.venuedetails.arena_id === "") {
      navigate("/");
    } else {
      navigate("/booking?venueid=" + slot.venuedetails.arena_id);
    }
    return false;
  }

  let hours = slot.hrs;
  let duration = "";
  if (slot.hrs > 0) {
    duration = getExactToTime(slot.timeslot, slot.hrs * 60);
  }

  const disptimings = `${slot.timeslot} ${slot.hrs > 0 ? duration : ""}`;

  const game_venue_details = [
    [
      {
        value: getGameName(sports, slot.game),
        icon_comp: <SportsEsportsIcon style={{ color: "orange" }} />,
        css_class: "",
      },
      {
        value: slot.bookeddate,
        icon_comp: <EventAvailableIcon style={{ color: "orange" }} />,
        css_class: "flex-col-right",
      },
      {
        value: disptimings.replace(" pm ", " - ").replace(" am ", " - "),
        extraparam: "",
        icon_comp: <AccessTimeIcon style={{ color: "orange" }} />,
        css_class: "txt-lower-case",
      },
    ],
    [
      {
        value: getTurfName(turfs, slot.turf),
        icon_comp: <GrassIcon style={{ color: "green" }} />,
        css_class: "flex-col-right",
      },
      {
        value: slot.turfcost,
        icon_comp: <CurrencyRupeeIcon style={{ color: "orange" }} />,
        css_class: "",
      },
      {
        value:
          slot.hrs > 0
            ? slot.hrs > 1
              ? `${slot.hrs} hrs`
              : `${slot.hrs} hr`
            : "Nill",
        icon_comp: <TimelapseIcon style={{ color: "orange" }} />,
        css_class: "flex-col-right",
      },
    ],
  ];

  const handlePaymentProcess = (e) => {
    //cross verify whether this slot is still is available or not

    console.log("hey");
    // setModalOpen(true);
    e.preventDefault();
    initiatePayment(isAdmin);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setShowOTP(false);
  };
  const advPay = slot.bookingamount * 0.3;
  const advPayRoundOff = Math.floor(advPay);

  return (
    <>
      <div className="containers" style={{ marginTop: "2rem" }}>
        <div className="div-a game-venue-details">
          <div className="policy-container ">
            <div className="cart-header">
              <div
                className="cart-title"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex-item">
                  <h5 style={{ fontWeight: "bold", fontSize: "18px" }}>
                    {slot.venuedetails?.arena_name}
                  </h5>
                </div>
                <div className="flex-item text-right">
                  <h5
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      position: "relative",
                    }}
                  >
                    <DeleteIcon
                      style={{
                        position: "absolute",
                        right: "1rem",
                        top: "0rem",
                      }}
                      onClick={() => {
                        dispatch(clearErrors());
                        navigate("/");
                      }}
                      className="trash-icon"
                    />
                  </h5>
                </div>
              </div>
            </div>
            <div className="cart-items">
              <div style={{ position: "relative" }}>
                <h6
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    paddingLeft: "10px",
                  }}
                >
                  Game & Scheule Details
                </h6>
              </div>
              {game_venue_details.map((items) => (
                <div className="cart-item m-y-10 dnt-show-at-765">
                  <div className="flex flex-row  justify-start col-span-5 space-x-1 w100">
                    {items.map((item) => (
                      <div className="flex-col">
                        <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer ">
                          {item.icon_comp}
                          <span className={`cart-label  ${item.css_class} `}>
                            {item.value !== "" ? item.value : "Nill"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="cart-item flex flex-row  show-mble pos-rel">
                {game_venue_details.map((items, index) => (
                  <>
                    <div
                      className={` ${index === 0 ? "flex-col" : " pos-abs"}`}
                    >
                      {items.map((item) => (
                        <>
                          <div className="venue-detail-items">
                            <div className="w- text-xs font-medium md:text-sm md:mt-0.5 pointer ">
                              {item.icon_comp}
                              <span
                                className={`cart-label  ${item.css_class} `}
                              >
                                {item.value !== "" ? item.value : "Nill"}
                              </span>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                    {index === 0 ? (
                      <div style={{ margin: "1.1rem" }}> </div>
                    ) : null}
                  </>
                ))}
              </div>
            </div>
            {isAdmin === false && (
              <>
                <hr />
                <div className="dnt-show-at-765">
                  <h6 style={{ fontWeight: "bold", fontSize: "18px" }}>
                    Reschedule Policy:
                  </h6>
                  <ul className="fancy-bullets">
                    <li>
                      <strong style={{ fontSize: "13px" }}>
                        Advance Notice Required:
                      </strong>{" "}
                      <span className="policy-bullet-points">
                        Rescheduling requests must be submitted at least 2 hours
                        prior to the scheduled booking time.
                      </span>
                    </li>
                    <li>
                      <strong style={{ fontSize: "13px" }}>
                        One-time Reschedule:
                      </strong>{" "}
                      <span className="policy-bullet-points">
                        Customers are allowed a single opportunity to reschedule
                        their booking. Once rescheduled, cancellations will no
                        longer be permitted.
                      </span>
                    </li>
                  </ul>
                  <hr />
                </div>
                <div className="dnt-show-at-765">
                  <h6 style={{ fontWeight: "bold", fontSize: "18px" }}>
                    Cancellation Policy:
                  </h6>
                  <ul className="fancy-bullets">
                    <li>
                      <strong style={{ fontSize: "13px" }}>
                        Cancellation Timeframe:
                      </strong>{" "}
                      <span className="policy-bullet-points">
                        Cancellation is not possible less than 2 hours prior to
                        the scheduled booking time.
                      </span>
                    </li>
                    <li>
                      <strong style={{ fontSize: "13px" }}>
                        Cancellation Fee:
                      </strong>{" "}
                      <span className="policy-bullet-points">
                        In case of cancellations made within the permissible
                        timeframe, a cancellation fee of 15% of the total
                        booking amount will be deducted.
                      </span>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="div-b pricing-details ">
          <div className="policy-container">
            <div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex-item">
                  <h5 style={{ fontSize: "1rem", fontWeight: "bold" }}>
                    Price Details
                  </h5>
                </div>
              </div>
            </div>
            <hr style={{ marginTop: "5px" }} />
            <div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex-item">
                  <h6 style={{ fontWeight: "bold", fontSize: "0.987rem" }}>
                    <GrassIcon style={{ color: "green" }} /> Turf Cost:{" "}
                  </h6>
                </div>
                <div className="flex-item text-center">
                  <CurrencyRupeeIcon
                    style={{ color: "black", fontSize: "0.9rem" }}
                  />
                  <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                    {slot.turfcost * slot.hrs}
                  </span>
                </div>
              </div>

              {isAdmin === false ? (
                <ul className="fancy-bullets">
                  <li>
                    <strong style={{ fontSize: "13px" }}>Incldues:</strong>{" "}
                    <span className="policy-bullet-points">
                      New ball, Two Heavy Duty Plastic Cricket Bat
                    </span>
                  </li>
                  <li>
                    <strong style={{ fontSize: "13px" }}>After Game:</strong>{" "}
                    <span className="policy-bullet-points">
                      The person who booked the game will be responsbile to
                      handover the Bats & balls
                    </span>
                  </li>
                </ul>
              ) : (
                <>
                  <div className="price-section ">
                    <ul className="fancy-bullets admin-fancy-bullets ">
                      {!checkIsWeekEnd(slot.bookeddate) ? (
                        <>
                          <li>
                            <strong style={{ fontSize: "11px" }}>
                              Coupon Applied:{" "}
                              <CurrencyRupeeIcon style={{ fontSize: "15px" }} />
                              {slot.turfcost * slot.hrs - bookingAmount}
                            </strong>
                          </li>
                        </>
                      ) : (
                        ""
                      )}

                      <li>
                        <strong style={{ fontSize: "11px" }}>
                          Advance to pay:{" "}
                          <CurrencyRupeeIcon style={{ fontSize: "15px" }} />
                          {advPayRoundOff}
                        </strong>
                      </li>
                      <li>
                        <strong style={{ fontSize: "11px" }}>
                          Amount to be paid at venue:{" "}
                          <CurrencyRupeeIcon style={{ fontSize: "15px" }} />
                          {bookingAmount -
                            bookingAmount * 0.3 +
                            (advPay - advPayRoundOff)}
                        </strong>
                      </li>
                    </ul>
                  </div>
                  <hr />
                  {
                    showPaymentForm === false ? (<ValidateCaptain proceedToPaymentForm={() => proceedToPaymentForm()} />) : (<SlotBookingForm />)
                  }
                  
                </>
              )}

              <hr />
            </div>
            {/** has to uncomment when coupon module is ready */}
            {/* <div>
              <h6 style={{ fontWeight: "bold", fontSize: "1rem" }}>
                <CardGiftcardIcon style={{ color: "orange" }} /> Apply Coupon:
              </h6>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-start",
                }}
              >
                <div style={{ position: "relative" }}>
                  <div title={"Apply Coupon"}>
                    <CheckCircleIcon
                      className="apply-coupon-btn"
                      style={{ color: "orange", cursor: "pointer" }}
                      onClick={() => console.log("hey")}
                    />{" "}
                  </div>
                  <TextFieldWithIcon />{" "}
                </div>
              </div>
            </div> */}

            {/* <hr /> */}

            {isAdmin === false && (
              <>
                <div className="price-section ">
                  <div className="flex-item ">
                    <h6 style={{ fontWeight: "bold", fontSize: "1rem" }}>
                      <CurrencyRupeeIcon
                        style={{ color: "black", fontSize: "1.3rem" }}
                      />{" "}
                      Total Price:{" "}
                    </h6>
                  </div>
                  <div className="flex-item text-center ">
                    <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                      <CurrencyRupeeIcon style={{ fontSize: "15px" }} />

                      {bookingAmount}
                    </span>
                  </div>
                </div>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <div className="price-section m-y-10">
                      <div className="flex-item ">
                        <FormControlLabel
                          value="Pay Advance"
                          control={<Radio />}
                          label="Pay Advance"
                        />

                        <ul className="fancy-bullets ">
                          {!checkIsWeekEnd(slot.bookeddate) ? (
                            <>
                              <li>
                                <strong style={{ fontSize: "11px" }}>
                                  Coupon Applied:{" "}
                                  <CurrencyRupeeIcon
                                    style={{ fontSize: "15px" }}
                                  />
                                  {slot.turfcost * slot.hrs - bookingAmount}
                                </strong>
                              </li>
                            </>
                          ) : (
                            ""
                          )}

                          <li>
                            <strong style={{ fontSize: "11px" }}>
                              Advance to pay:{" "}
                              <CurrencyRupeeIcon style={{ fontSize: "15px" }} />
                              {advPayRoundOff}
                            </strong>
                          </li>
                          <li>
                            <strong style={{ fontSize: "11px" }}>
                              Amount to be paid at venue:{" "}
                              <CurrencyRupeeIcon style={{ fontSize: "15px" }} />
                              {bookingAmount -
                                bookingAmount * 0.3 +
                                (advPay - advPayRoundOff)}
                            </strong>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="price-section m-y-10">
                      <div className="flex-item">
                        <FormControlLabel
                          value="Pay Full"
                          control={<Radio />}
                          label="Pay Full"
                        />

                        <ul className="fancy-bullets ">
                          {!checkIsWeekEnd(slot.bookeddate) ? (
                            <>
                              <li>
                                <strong style={{ fontSize: "11px" }}>
                                  Coupon Applied:{" "}
                                  <CurrencyRupeeIcon
                                    style={{ fontSize: "15px" }}
                                  />
                                  {slot.turfcost * slot.hrs - bookingAmount}
                                </strong>
                              </li>
                            </>
                          ) : (
                            ""
                          )}

                          <li>
                            <strong style={{ fontSize: "11px" }}>
                              Amount to be paid:{" "}
                              <CurrencyRupeeIcon style={{ fontSize: "15px" }} />
                              {bookingAmount}
                            </strong>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>

                <div className="cart-footer">
                  {slot.captain.captainId ? (
                    <>
                      <button
                        className="proceed-btn btn-block"
                        onClick={(e) => {
                          handlePaymentProcess(e);
                        }}
                      >
                        Proceed To Pay
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="proceed-btn btn-block btn-secondary"
                        onClick={(e) => {
                          setModalOpen(true);
                        }}
                      >
                        Sign To Pay
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="div-c policy-terms show-at-765">
          <div>
            <h6
              className="dnt-show-at-765"
              style={{ fontWeight: "bold", fontSize: "1rem" }}
            >
              Reschedule Policy:
            </h6>
            <h6 className="show-at-765" style={{ fontWeight: "bold" }}>
              Reschedule & Cancellation Policy:
            </h6>
            <ul className="fancy-bullets">
              <li>
                <strong style={{ fontSize: "14px" }}>
                  Advance Notice Required:
                </strong>{" "}
                <span className="policy-bullet-points">
                  Rescheduling requests must be submitted at least 2 hours prior
                  to the scheduled booking time.
                </span>
              </li>
              <li>
                <strong style={{ fontSize: "14px" }}>
                  One-time Reschedule:
                </strong>{" "}
                <span className="policy-bullet-points">
                  Customers are allowed a single opportunity to reschedule their
                  booking. Once rescheduled, cancellations will no longer be
                  permitted.
                </span>
              </li>
            </ul>

            <h6 className="dnt-show-at-765" style={{ fontWeight: "bold" }}>
              Cancellation Policy:
            </h6>

            <ul className="fancy-bullets">
              <li>
                <strong style={{ fontSize: "13px" }}>
                  Cancellation Timeframe:
                </strong>{" "}
                <span className="policy-bullet-points">
                  Cancellation is not possible less than 2 hours prior to the
                  scheduled booking time.
                </span>
              </li>
              <li>
                <strong style={{ fontSize: "13px" }}>Cancellation Fee:</strong>{" "}
                <span className="policy-bullet-points">
                  In case of cancellations made within the permissible
                  timeframe, a cancellation fee of 15% of the total booking
                  amount will be deducted.
                </span>
              </li>
            </ul>
          </div>
        </div>
        <MUIModal
          params={{
            open: modalOpen,
            handleClose: handleModalClose,
            modalTitle: "Login",
            component: LoginComponent,
            width: 1000,
            adjustTop: "30%",
            showTitle: "yes",
          }}
        />
      </div>

      {/* <div className="show-at-765">
        <div className="footer">
          <div className="footer-icon">
            <ProductionQuantityLimitsIcon style={{ fontSize: "2rem" }} />
          </div>
          <div className="footer-middle flex-right">
            <div className="total-hours">
              <TimelapseIcon />:{" "}
              {slot.hrs > 0
                ? slot.hrs > 1
                  ? `${slot.hrs} hrs`
                  : `${slot.hrs} hr`
                : "Nill"}
            </div>
            <div style={{ marginLeft: "20px" }}> </div>
            <div className="total-cost">
              Advance: <CurrencyRupeeIcon /> {bookingAmount * 0.3}
               <span style={{marginLeft:'1rem'}}>
                  Pay @ venue: <CurrencyRupeeIcon /> {bookingAmount - (bookingAmount * 0.3)}
                </span>
            </div>
          </div>
          <div className="footer-icon">
            <Link
              to="/confirm-cart"
              onClick={(e) => {
                handlePaymentProcess(e);
              }}
              style={{ color: "#fff" }}
            >
              <ArrowCircleRightIcon className="proceed-icon" />{" "}
            </Link>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default CartPaymentPolicy;
