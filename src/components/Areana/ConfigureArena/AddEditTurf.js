import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearMsgs,
  createATurf,
  getATurf,
  updateATurf,
} from "../../../Redux/Slices/VenueSliceReducer";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useLoaderContext } from "../../../contexts/LoaderContextProvider";
import { useEffect } from "react";

function AddEditTurf({ showEdit, selectedTurf }) {
  const { admin } = useSelector((state) => state.venue);
  const turfsel = admin.selectedTurf;
  const isTurfSel = turfsel.hasOwnProperty("turfId");

  const turfStruct = {
    turf_name: "",
    areana_size: "",
    weekdays_cost: "",
    weekends_cost: "",
  };

  const [turfSelected, setTurfSelected] = useState(
    isTurfSel === true ? turfsel : turfStruct
  );
  const dispatch = useDispatch();
  const { setLoader } = useLoaderContext();
  const selectedTurfRef = selectedTurf;
  const [validationError, setValidationError] = useState("");
  const [severity, setSeverity] = useState("");
  const [msg, setMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const resetUpdateForm = async () => {
    showEdit(0);
    await dispatch(getATurf(0));
  };

  const handleChange = async (e) => {
    setTurfSelected((prevTurfSelected) => ({
      ...prevTurfSelected,
      [e.target.name]: e.target.value,
    }));
  };

  const updateTurf = async () => {
    if (JSON.stringify(selectedTurfRef) === JSON.stringify(turfSelected)) {
      console.log("they are equal");
      setValidationError("Do some changes to udpate");
    } else {
      setLoader(true);
      console.log("update a turf now");
      dispatch(updateATurf(turfSelected));
      if (admin.updateTurfMsg === "Turf Updated successfully") {
        showEdit(0);
      }
    }
  };

  const createturf = async () => {
    dispatch(createATurf(turfSelected));
  };

  useEffect(() => {
    console.log("hey");
    if (admin.updateTurfMsg !== "") {
      setSeverity("success");
      if (admin.updateTurfMsg !== "Turf Updated successfully") {
        setSeverity("error");
      }
      setMsg(admin.updateTurfMsg);
      setShowAlert(true);
    }

    if (admin.insertTurfMsg !== "") {
      setSeverity("success");
      if (admin.insertTurfMsg !== "Turf created successfully") {
        setSeverity("error");
      }
      setMsg(admin.insertTurfMsg);
      setShowAlert(true);
    }

    if (admin.deleteTurfMsg !== "") {
      setSeverity("success");
      if (admin.deleteTurfMsg !== "Turf deleted successfully") {
        setSeverity("error");
      }
      setMsg(admin.deleteTurfMsg);
      setShowAlert(true);
    }

    if (showAlert) {
      setTimeout(() => {
        setLoader(false);
      }, 300);
    }
  }, [setLoader]);

  return (
    <>
      <Stack sx={{ marginBottom: "1rem" }} spacing={2}>
        {showAlert && (
          <>
            <Alert
              onClose={() => {
                dispatch(clearMsgs(""));
              }}
              sx={{ fontWeight: "bold" }}
              severity={severity}
            >
              {msg}
            </Alert>
          </>
        )}
      </Stack>

      <List dense={false} className="list-parent">
        <ListItem className="add-turf-form-control">
          <TextField
            id="outlined-basic"
            label={`${turfSelected?.turf_name ? "" : "Enter turf name"}`}
            fullWidth={true}
            value={turfSelected.turf_name}
            name="turf_name"
            onChange={(e) => handleChange(e)}
          />
        </ListItem>
        <ListItem className="add-turf-form-control">
          <TextField
            id="outlined-basic"
            label={`${turfSelected?.areana_size ? "" : "Enter turf size"}`}
            fullWidth={true}
            name="areana_size"
            value={turfSelected.areana_size}
            onChange={(e) => handleChange(e)}
          />
        </ListItem>

        <ListItem className="add-turf-form-control">
          <div className="form-element-wid">
            <TextField
              id="outlined-basic"
              label={`${turfSelected?.weekdays_cost ? "" : "Week day cost"}`}
              fullWidth={true}
              value={turfSelected.weekdays_cost}
              name="weekdays_cost"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-element-wid">
            <TextField
              id="outlined-basic"
              label={`${turfSelected?.weekends_cost ? "" : "Week end cost"}`}
              fullWidth={true}
              name="weekends_cost"
              value={turfSelected.weekends_cost}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </ListItem>
        <div style={{ marginTop: "7px" }}>
          {turfSelected?.turfId > 0 ? (
            <>
              {validationError !== "" && (
                <p className="errmsg">{validationError}</p>
              )}
              <Button
                variant="contained"
                sx={{ width: "69%" }}
                onClick={() => updateTurf()}
              >
                Update turf
              </Button>
              <Button
                sx={{
                  width: "25%",
                  marginLeft: "4px",
                  background: "orange",
                  color: "#fff",
                }}
                onClick={() => resetUpdateForm()}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              sx={{ width: "96%" }}
              onClick={() => createturf()}
            >
              Add turf
            </Button>
          )}
        </div>
      </List>
    </>
  );
}

export default AddEditTurf;
