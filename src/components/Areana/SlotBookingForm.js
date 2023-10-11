import React from "react";
import { useSelector } from "react-redux";
import useFormatDateYmd from "../../CustomHooks/useFormatDateYmd";
import { checkIsWeekEnd } from "../../CustomLogics/customLogics";

import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Button from '@mui/material/Button';


function SlotBookingForm() {
  const { data } = useSelector((state) => state.booking);
  const { convertDateYmd } = useFormatDateYmd();
  console.log("data is:", data);

  const advPay = data.bookingamount * 0.3;
  const advPayRoundOff = Math.floor(advPay);

  const paymentObj = {
    arena_id: data.venuedetails.arena_id,
    turfid: data.turf,
    gameid: data.game,
    booked_by: data.captain?.captainId,
    booked_on: convertDateYmd(data.bookeddate) + "",
    booked_at: data.timeslot,
    total_hrs: data.hrs,
    is_weekend: checkIsWeekEnd(data.bookeddate) ? "1" : "0",
    booking_cost: data.bookingamount,
    advance_payment: advPayRoundOff,
    balance_amount:
      data.bookingamount - data.bookingamount * 0.3 + (advPay - advPayRoundOff),
    status: "0",
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
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <CurrencyRupeeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Initial Payment"
              variant="standard"
              fullWidth

            />
          </Box>
        </div>
        <Button variant="contained">Proceed To Pay</Button>
      </Box>
    </>
  );
}

export default SlotBookingForm;
