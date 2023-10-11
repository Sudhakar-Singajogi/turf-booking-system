import React, { useEffect, useState } from "react";
import { validateMobileNumber } from "../../CustomLogics/customLogics";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import PhoneIcon from "@mui/icons-material/Phone";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";
import Button from "@mui/material/Button";
import { setBookedBy } from "../../Redux/Slices/BokingSliceReducer";
import useCaptain from "../../CustomHooks/useCaptain";

import useFormatDateYmd from "../../CustomHooks/useFormatDateYmd";
import { checkIsWeekEnd } from "../../CustomLogics/customLogics";

const teamcaptain = {
  captain_name: "",
  captain_email: "",
  captain_contact: "",
  status: 1,
};

function ValidateCaptain({ proceedToPaymentForm }) {
  const { data } = useSelector((state) => state.booking);

  const advPay = data.bookingamount * 0.3;
  const advPayRoundOff = Math.floor(advPay);
  const { GetCaptainDetails, createCaptain } = useCaptain();
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
    turf_cost:parseInt(data.turfcost),
    coupon_code : data.coupon_code,
    coupon_amount : data.coupon_amount
  };

  const [captain, setCaptain] = useState(teamcaptain);
  const [showTOP, setShowOTP] = useState(false);
  const [isCaptainExists, setIsCaptainExists] = useState(true);

  const [captainErrMsgs, setCaptainErrMsgs] = useState({
    captain_name: "",
    captain_email: "",
    captain_contact: "",
  });

    const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaptain((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (name === "captain_contact") {
      var newValue = value.replace(/[^0-9]/g, "");
      if (newValue.length > 10) {
        newValue = newValue.substring(0, 10); // Truncate to the first 10 characters
      } else if (newValue.length < 10) {
        setIsCaptainExists(true);
        setShowOTP(false);

        setCaptain((prevValues) => ({
          ...prevValues,
          captain_name: "",
          captain_email: "",
        }));
      }

      setCaptain((prevValues) => ({
        ...prevValues,
        [name]: newValue,
      }));
    }

    setCaptainErrMsgs((prevErrs) => ({
      ...prevErrs,
      [name]: "",
    }));
  };

  const sendOTP = async () => {
    const mble = captain.captain_contact;
    if (validateMobileNumber(mble)) {
      // dispatch(getUserInfo(mble));
      const resp = await GetCaptainDetails(mble);
      console.log("resp is:", resp);
      if (resp.length > 0) {
        setIsCaptainExists(true);
        setShowOTP(true);
        paymentObj.booked_by = resp.captainId;
        
        console.log("payment obj is: ", paymentObj);
      } else {
        setIsCaptainExists(false);
        setShowOTP(true);
      }
    } else {
      setCaptainErrMsgs((prevErrs) => ({
        ...prevErrs,
        captain_contact: "Please enter valid mobile number",
      }));
    }
  };

  const proceed = () => {
    console.log("captain is: ", captain);
    proceedToPaymentForm();
  };

  const proceedToCreateAccount = async () => {
    //validate the OTP
    if (true) {
      //create an captainobject and call the api
      let teamcaptain = {
        captain_name: captain.captain_name,
        captain_email: captain.captain_email,
        captain_contact: captain.captain_contact,
        status: '1',
      };
      
      const resp = await createCaptain(teamcaptain);
      console.log('resp obj is: ', resp)
      if (!resp.hasOwnProperty("resultCode") && resp.length > 0) {
        const capcy = resp[0];
        paymentObj.booked_by = capcy.captainId;
        dispatch(setBookedBy(capcy.captainId));
        proceed();
        
      } else {
        //show error msg that user has not created
        if (resp.resultCode !== 200) {
            console.log(resp.resultCode + ", error message is ", resp.message )
        }
      }
    } else {
      //show error msg that otp entered is invalid
    }
  };
  return (
    <>
      <h5 className="m10">Enter Captain Details</h5>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <div>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <PhoneIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Enter Mobile Number"
              variant="standard"
              fullWidth
              name="captain_contact"
              value={captain.captain_contact}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Box>
          {captainErrMsgs.captain_contact !== "" ? (
            <p className="errmsg m10">{captainErrMsgs.captain_contact}</p>
          ) : (
            ""
          )}
          {showTOP === true && (
            <>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <MessageIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  id="input-with-sx"
                  label="Enter OTP"
                  variant="standard"
                  fullWidth
                />
              </Box>
            </>
          )}
        </div>

        {isCaptainExists === false && (
          <div>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                label="Enter Full Name"
                variant="standard"
                fullWidth
                name="captain_name"
                value={captain.captain_name}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                label="Enter Email"
                variant="standard"
                fullWidth
                name="captain_email"
                value={captain.captain_email}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Box>
          </div>
        )}

        {showTOP === false ? (
          <>
            <Button variant="contained" onClick={() => sendOTP()}>
              Send OTP Message
            </Button>
          </>
        ) : isCaptainExists === true ? (
          <>
            <Button variant="contained" onClick={() => proceed()}>
              Continue
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={() => proceedToCreateAccount()}>
            Create and Continue
          </Button>
        )}
      </Box>
    </>
  );
}

export default ValidateCaptain;
