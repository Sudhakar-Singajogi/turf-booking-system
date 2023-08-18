import React, { useEffect } from 'react'

import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import useValidateBooking from '../CustomHooks/useValidateBooking';
import { checkTurfAvailability, validateBookingForm } from '../Redux/Slices/BookingFormValidatorReducer';



function CartFooter() {
    const { data } = useSelector((state) => state.booking);
    const {validateBooking} = useValidateBooking()
    const isAvailable = useSelector((state) => state.validateForm.isAvailable);
  const errors = useSelector((state) => state.validateForm.errors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const ProceedToPolicy = (e) => {
        e.preventDefault();
        validateBooking();
        // checkTurfAvailability();
    }

    useEffect(() => {
      let form_errors = { ...errors };
    console.log("use effect ran");

    if (isAvailable === "") {
    } else if (isAvailable === false) {
      form_errors.turf_error = "Turf is not available during this time slot";
      dispatch(validateBookingForm(form_errors));
    } else {
      navigate("/confirm-slot");
    }
    dispatch(validateBookingForm(form_errors));
    }, [isAvailable])


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
                  {data.timeslot !== ""
                    ? data.hrs > 0 && <CurrencyRupeeIcon />
                    : ""}
                  {data.timeslot !== ""
                    ? data.hrs > 0 && data.bookingamount.toFixed(2)
                    : ""}
                </div>
              </div>
              <div className="footer-icon">
                <Link
                  to="/confirm-slot"
                  onClick={(e) => ProceedToPolicy(e)}
                  style={{ color: "#fff" }}
                >
                  <ArrowCircleRightIcon className="proceed-icon" />{" "}
                </Link>
              </div>
            </div>
  )
}

export default CartFooter