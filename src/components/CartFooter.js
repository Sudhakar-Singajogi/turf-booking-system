import React, { useEffect } from "react";

import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useValidateBooking from "../CustomHooks/useValidateBooking";
import {
  checkTurfAvailability,
  validateBookingForm,
} from "../Redux/Slices/BookingFormValidatorReducer";
import useDateTimeRealated from "../CustomHooks/useDateTimeRealated";

function CartFooter({ isAdmin, showConfirmSlot }) {
  const { data } = useSelector((state) => state.booking);
  const { validateBooking, isTurfAvailable } = useValidateBooking();
  const isAvailable = useSelector((state) => state.validateForm.isAvailable);
  const errors = useSelector((state) => state.validateForm.errors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { convertDateYmd, convertDateTimeToMillSec, addHoursToTimeSlot } =
    useDateTimeRealated();

  console.log("isAdmin:", isAdmin);

  const ProceedToPolicy = async (e) => {
    e.preventDefault();
    validateBooking(isAdmin);
    // checkTurfAvailability();

    // Split the original date string into components
    const dateComponents = data.bookeddate.split("/");

    // Create a new date string in "Y-m-d" format
    const year = dateComponents[2];
    const month = dateComponents[1].padStart(2, "0");
    const day = dateComponents[0].padStart(2, "0");

    const bookedDate = `${year}-${month}-${day}`;

    let reqObj = {
      arena_id: data.venuedetails.arena_id,
      bookedAt: data.timeslot,
      bookedTill: data.hrs,
      turf_id: data.turf,
      bookedDate: bookedDate,
    }; 

    console.log("req obj is:", reqObj);

    let resp = await isTurfAvailable(reqObj);

    console.log("isTurfAvailable:", resp);

    if (isAdmin) {
      showConfirmSlot();
    }
  };

  useEffect(() => {
    let form_errors = { ...errors };
    console.log("use effect ran");

    if (isAvailable === "") {
    } else if (isAvailable === false) {
      form_errors.turf_error = "Turf is not available during this time slot";
      dispatch(validateBookingForm(form_errors));
    } else {
      // navigate("/booking/confirm");
    }
    dispatch(validateBookingForm(form_errors));
  }, [isAvailable]);

  return (
    <div className="footer">
      <div className="footer-icon">
        <ProductionQuantityLimitsIcon style={{ fontSize: "2rem" }} />
      </div>
      <div className="footer-middle flex-right">
        <div className="total-hours">
          {data.hrs > 0 && data.timedata !== "" && <TimelapseIcon />}

          {data.hrs > 0 && data.timeslot !== ""
            ? data.hrs > 1
              ? `${data.hrs} hrs`
              : `${data.hrs} hr`
            : ""}
        </div>
        <div style={{ marginLeft: "20px" }}> </div>
        <div className="total-cost">
          {data.timeslot !== "" ? data.hrs > 0 && <CurrencyRupeeIcon /> : ""}
          {data.timeslot !== ""
            ? data.hrs > 0 && data.bookingamount.toFixed(2)
            : ""}
        </div>
      </div>
      <div className="footer-icon">
        {isAdmin ? (
          <>
            <span
              onClick={(e) => ProceedToPolicy(e)}
              style={{ color: "#fff", cursor: "pointer" }}
            >
              <ArrowCircleRightIcon className="proceed-icon" />{" "}
            </span>
          </>
        ) : (
          <>
            <Link
              to="/booking/confirm"
              onClick={(e) => ProceedToPolicy(e)}
              style={{ color: "#fff" }}
            >
              <ArrowCircleRightIcon className="proceed-icon" />{" "}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default CartFooter;
