import React, { useCallback, useEffect, useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./AddSportToTurf.css";
import { Divider, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTuyfsByArena } from "../../../Redux/Slices/VenueSliceReducer";
import useVenue from "../../../CustomHooks/useVenue";
import AddSportToTurf from "./AddSportToTurf";
import { useSportsToTurfContext } from "../../../contexts/SportsToTurfContextProvider";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
function ManageSportToTurf({...props}) {
  const { admin } = useSelector((state) => state.venue);
  const { turfId, getSportsByTurf } = useSportsToTurfContext();

  const handleTurfChange = async (turfid) => {
    await getSportsByTurf(turfid);
  };

  console.log("turfId:", turfId);

  return (
    <>
      <Typography sx={{ mb: 2.5 }} color="text.secondary">
        Turfs Available
      </Typography>
      <Demo key="listing-turfs">
        <Divider className="divider-line" />
        <FormControl sx={{ m: 0 }} style={{ marginTop: "10px", width: "100%" }}>
          <InputLabel id="demo-simple-select-helper-label">Turfs</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={turfId > 0 ? turfId : ""}
            label="Turfs"
            onChange={(e) => handleTurfChange(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {admin.turfs.length > 0
              ? admin.turfs.map((turf, index) => (
                  <MenuItem key={turf.turfId} value={turf.turfId}>
                    {turf.turf_name}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
        <AddSportToTurf />
      </Demo>
    </>
  );
}

export default React.memo(ManageSportToTurf);
