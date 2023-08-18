import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import {
  calculateBookingCost,
  changeGame,
  changeTurf,
  getSportsByTurf,
  getTurfs,
} from "../../Redux/Slices/BokingSliceReducer";

import GrassOutlinedIcon from "@mui/icons-material/GrassOutlined";
import { validateBookingForm } from "../../Redux/Slices/BookingFormValidatorReducer";
function SelectTurf({ wid80, title, options, onChange, defValue }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.booking);
  const errors = useSelector((state) => state.validateForm.errors);
  const turf = data.turf; 
  
  const handleturfChange = (value) => { 
    const cost = data.turfs.filter((i) => i.value === value)
    const turfCost = cost[0].turfcost || 0.00;

    dispatch(changeTurf({"turfId": value, "turfCost": turfCost}))

      if(data.hrs > 0) {
        dispatch(calculateBookingCost());
      } 
      
      dispatch(getSportsByTurf(value));
      let ers = {
        ...errors,
        turf_error: "",
      };
      dispatch(validateBookingForm(ers));
     
  };

  // const handleChange = (e) => {
  //   onChange(e.target.value);
  // };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={turf}
          label={title}
          onChange={(e) => handleturfChange(e.target.value)}
        >
          {data.turfs.length > 0 &&
            data.turfs.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.hasIcon && (
                  <GrassOutlinedIcon style={{ color: "green" }} />
                )}{" "}
                {option.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectTurf;
