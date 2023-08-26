import React, { useCallback, useEffect, useMemo, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./AddSportToTurf.css";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTuyfsByArena } from "../../../Redux/Slices/VenueSliceReducer";
import useVenue from "../../../CustomHooks/useVenue";

function AddSportToTurf() {
  const [game, setGame] = useState("");
  const [turf, setTurf] = useState("");
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.venue); 
  const handleGameChange = (event) => {
    setGame(event.target.value);
  };

  const handleTurfChange = (event) => {
    setTurf(event.target.value);
  }; 

  return (
    <>
    <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Turfs</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={turf.turfId}
          label="Turfs"
          onChange={handleTurfChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {admin.turfs.length > 0
            ? admin.turfs.map((turf, index) => (
                <MenuItem key={turf.turfId} value={turf.turfId}>{turf.turf_name}</MenuItem>
              ))
            : null}
        </Select>
      </FormControl>

      <Divider className="divider-line" />

      {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label2">Turf</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label2"
          id="demo-simple-select-helper2"
          value={turf}
          label="Turf"
          onChange={handleTurfChange}
          sx={{ mt: 2 }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}
    </>
  );
}

export default React.memo(AddSportToTurf);
