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
import AddSportToTurf from "./AddSportToTurf";
import { useSportsToTurfContext } from "../../../contexts/SportsToTurfContextProvider";

function ManageSportToTurf() {
  const [game, setGame] = useState("");
  const [turf, setTurf] = useState("");
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.venue); 
  const {turfId, getSportsByTurf, sportsByTurf, updateSportToTurf} = useSportsToTurfContext()
  const handleGameChange = (event) => {
    setGame(event.target.value);
  };

  const handleTurfChange = async (turfid) => {  
      await getSportsByTurf(turfid);
  }; 

  console.log('turfId:', turfId)

  return (
    <>
    <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Turfs</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={turfId>0 ? turfId : ''}
          label="Turfs"
          onChange={(e) => handleTurfChange(e.target.value)}
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
      <AddSportToTurf />
    </>
  );
}

export default React.memo(ManageSportToTurf);
