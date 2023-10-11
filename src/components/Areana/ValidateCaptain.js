import React from "react";

import Box from "@mui/material/Box";
import PhoneIcon from "@mui/icons-material/Phone";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from '@mui/icons-material/Message';
import Button from '@mui/material/Button';


function ValidateCaptain({proceedToPaymentForm}) {

const proceed = () => {
    proceedToPaymentForm()

}
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
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <MessageIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Enter OTP"
            variant="standard"
            fullWidth
          />
        </Box>

        </div>
        

        <div>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Enter Full Name"
              variant="standard"
              fullWidth
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Enter Email"
              variant="standard"
              fullWidth
            />
          </Box>
        </div>
        <Button variant="contained" onClick={() => proceed()}>Continue</Button>

      </Box>
    </>
  );
}

export default ValidateCaptain;
