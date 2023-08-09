import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import { getTurfs } from "../../Redux/Slices/BokingSliceReducer";

import GrassOutlinedIcon from "@mui/icons-material/GrassOutlined";
function SelectTurf({ wid80, title, options, onChange, defValue }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.booking);
  const turf = data.turf;

  useEffect(() => {
    dispatch(getTurfs());
    console.log("turfs are", data.turfs)
  }, []);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={turf}
          label={title}
          onChange={(e) => handleChange(e)}
        >
          {(data.turfs.length > 0) &&
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
