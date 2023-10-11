import React, { useState } from "react";
import { useSelector } from "react-redux";
import useFormatDateYmd from "../../CustomHooks/useFormatDateYmd";
import { checkIsWeekEnd } from "../../CustomLogics/customLogics";

import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Button from "@mui/material/Button";
import RazorPayment from "../../CustomHooks/RazorPayment";

function SlotBookingForm() {
    const { initiatePayment } = RazorPayment();
  const { data } = useSelector((state) => state.booking);

  const advPay = data.bookingamount * 0.3;
  const advPayRoundOff = Math.floor(advPay);
  const [initAmount, setInitAmount] = useState(advPayRoundOff);

  const { convertDateYmd } = useFormatDateYmd();

  let paymentObj = {
    arena_id: data.venuedetails.arena_id,
    turfid: data.turf,
    gameid: data.game,
    booked_by: data.bookedBy,
    booked_on: convertDateYmd(data.bookeddate) + "",
    booked_at: data.timeslot,
    total_hrs: data.hrs,
    is_weekend: checkIsWeekEnd(data.bookeddate) ? "1" : "0",
    booking_cost: data.bookingamount,
    advance_payment: advPayRoundOff,
    balance_amount:
      data.bookingamount - data.bookingamount * 0.3 + (advPay - advPayRoundOff),
    status: "0",
    turf_cost: parseInt(data.turfcost),
    coupon_code: data.coupon_code,
    coupon_amount: data.coupon_amount,
  };

  console.log("data is:", data);

  const addInitPayment = (e) => {
    const { name, value } = e.target;
    var newValue = value.replace(/[^0-9]/g, "");
    setInitAmount(newValue);

    if (parseInt(newValue) > data.bookingamount) {
      setInitAmount(data.bookingamount);
    }

    paymentObj.advance_payment = initAmount;

    if (parseInt(initAmount) === data.bookingamount) {
      paymentObj.balance_amount = 0;
    }
  };

  const goForpay = () => {
    if (parseInt(initAmount) < advPayRoundOff) {
      setInitAmount(advPayRoundOff);
    }

    paymentObj.booking_cost = data.turfcost;

    paymentObj.advance_payment = initAmount;
    paymentObj.balance_amount =
      parseInt(data.bookingamount) - parseInt(initAmount);
      console.log("paymentObj is: ", paymentObj);
      initiatePayment(true, paymentObj);
  };

  return (
    <>
      <h5 className="m10">Payment Details</h5>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <div>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <span>Full Name</span>
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <span>Email@example.com</span>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "flex-end", marginTop: "1rem" }}
          >
            <CurrencyRupeeIcon
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
            />
            <TextField
              id="input-with-sx"
              label="Initial Payment"
              variant="standard"
              fullWidth
              value={initAmount}
              onChange={(e) => addInitPayment(e)}
            />
          </Box>
        </div>
        <Button variant="contained" onClick={() => goForpay()}>
          Proceed To Pay
        </Button>
      </Box>
    </>
  );
}

export default SlotBookingForm;
