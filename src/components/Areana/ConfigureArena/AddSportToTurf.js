import React, { useEffect, useRef, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./AddSportToTurf.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { useSportsToTurfContext } from "../../../contexts/SportsToTurfContextProvider";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const games = ["Cricket", "Soccer", "Beach Volley Ball"];
function AddSportToTurf() {
  const [sports, setSports] = useState([]);
  const [showCancel, setShowCancel] = useState(false);

  const { turfId, sportsByTurf, updateSportToTurf, turfAddMsg, setTurfAddMsg } =
    useSportsToTurfContext();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if (!showCancel) {
      setShowCancel(true);
    }

    let sprts = sports;
    //check whether this sport already exists if so then remove that
    const index = sprts.indexOf(value);

    if (index !== -1) {
      sprts.splice(index, 1);
      setSports((prev) => [...sprts]);
    } else {
      setSports((prev) => [...prev, value]);
    }
  };

  useEffect(() => {
    setSports(() => []);
    sportsByTurf.map((sport) => {
      return setSports((prev) => [...prev, sport.sport]);
    });
  }, [sportsByTurf]);

  const submitSportsToTurf = async () => {
    //check whether we have any differences in the default and selected sports
    const turfSports = sportsByTurf.map((sport) => sport.sport);

    const differences = sports.filter((item) => !turfSports.includes(item));

    if (differences.length > 0) {
      setShowCancel(false);
      await updateSportToTurf(sports);
    }
  };

  const clearChangedSports = () => {
    if (turfAddMsg !== "Sports added successfully" && showCancel) {
      setSports(() => []);
      sportsByTurf.map((sport) => {
        return setSports((prev) => [...prev, sport.sport]);
      });
    }
  };
  const closeAlert = () => {
    setTurfAddMsg(() => "");
  };

  return (
    <>
      <Typography variant="h6" sx={{ m: 1 }}>
        {" "}
        Sports added to turf
      </Typography>

      {turfAddMsg !== "" && (
        <Alert
          onClose={() => {
            closeAlert();
          }}
          sx={{ fontWeight: "bold" }}
          // severity={`${turfAddMsg} === "Sports added successfully" ? "success" : "error"}`}
        >
          {turfAddMsg}
        </Alert>
      )}

      <div className="checkbox-stack">
        {games.map((sport) => (
          <MenuItem key={sport} value={sport}>
            <Checkbox
              checked={sports.indexOf(sport) > -1}
              value={sport}
              onChange={(e) => handleChange(e)}
            />
            <ListItemText primary={sport} />
          </MenuItem>
        ))}

        {turfId > 0 && (
          <>
            <button
              type="button"
              onClick={() => submitSportsToTurf()}
              style={{ width: "69%" }}
              className="rounded-corner"
            >
              Submit
            </button>

            <button
              className="rounded-corner"
              type="button"
              style={{
                width: "25%",
                marginLeft: "4px",
                background: "orange",
                color: "#fff",
                padding: "10px",
                textTransform: "capitalize",
              }}
              onClick={() => clearChangedSports()}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default React.memo(AddSportToTurf);
