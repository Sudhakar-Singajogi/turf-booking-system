import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import { changeGame } from "../../Redux/Slices/BokingSliceReducer";
import { validateBookingForm } from "../../Redux/Slices/BookingFormValidatorReducer";

import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

function SelectGame({ wid80, title, options, onChange, defValue }) {
  const { data } = useSelector((state) => state.booking);
  const errors = useSelector((state) => state.validateForm.errors);
  const game = data.game;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(changeGame(value));
    let ers = {
      ...errors,
      game_error: "",
    };
    dispatch(validateBookingForm(ers));
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={game}
          label={title}
          onChange={(e) => handleChange(e)}
        >
          {data.sports.length >0 && data.sports.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label === "Cricket" ? <SportsCricketIcon style={{color:'blue'}} /> : ""}
              {option.label === "Soccer" ? <SportsSoccerIcon style={{color:'blue'}} /> : ""}
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectGame;
