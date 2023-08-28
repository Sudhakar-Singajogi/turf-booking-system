import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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

import { addEditTurfValidationSchema } from "../../../validationSchema";

function AddEditTurf({ showEdit, selectedTurf, onChange }) {
  const { admin } = useSelector((state) => state.venue);
  const turfsel = selectedTurf;
  const isTurfSel = turfsel.hasOwnProperty("turfId");
  const [fieldErrors, setFieldErrors] = useState({});
  const [turfSelected, setTurfSelected] = useState(admin.selectedTurf);

  const [turfName, setTurfName] = useState(turfSelected ? turfSelected.turf_name : "")
  const [turfSize, setTurfSize] = useState(turfSelected ? turfSelected.areana_size : "")
  const [weedaycost, setWeedayCost] = useState(turfSelected ? turfSelected.weekdays_cost : "")
  const [weekendCost, setWeekendCost] = useState(turfSelected ? turfSelected.weekends_cost : "")

  const turfStruct = {
     
  };
  

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

  const resetErrorMsg = async (e) => {
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));

    setTurfSelected((prevValues) => ({
      ...prevValues,
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

  const createturf = async (formValues) => {
    dispatch(createATurf(formValues));
  };

  useEffect(() => {
    console.log("hey", admin.selectedTurf);
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
  }, [turfSelected]);

  const validateForm = async (formType, values) => { 

    const newFieldErrors = {};
    const areana_size = values.areana_size;
    const turf_name = values.turf_name;
    const weekdays_cost = values.weekdays_cost;
    const weekends_cost = values.weekends_cost;

    let hasError = false;

    if (areana_size.trim() === "") {
      newFieldErrors["areana_size"] = "Arena Size is required";
      hasError = true;
    } else {
      newFieldErrors["areana_size"] = "";
    }

    if (turf_name.trim() === "") {
      newFieldErrors["turf_name"] = "Turf Name is required";
      hasError = true;
    } else {
      newFieldErrors["turf_name"] = "";
    }

    if (weekdays_cost.trim() === "") {
      newFieldErrors["weekdays_cost"] = "Weekdays Cost is required";
      hasError = true;
    } else {
      if (parseInt(weekends_cost) < 1) {
        newFieldErrors["weekdays_cost"] = "Weekdays Cost should greater than 0";
        hasError = true;
      } else {
        newFieldErrors["weekdays_cost"] = "";
      }
    }

    if (weekends_cost.trim() === "") {
      newFieldErrors["weekends_cost"] = "Weekends Cost is required";
      hasError = true;
    } else {
      if (parseInt(weekends_cost) < 1) {
        newFieldErrors["weekends_cost"] = "Weekends Cost should greater than 0";
        hasError = true;
      } else {
        newFieldErrors["weekends_cost"] = "";
      }
    }

    if (!hasError) {
      if (!(weekends_cost > weekdays_cost)) {
        newFieldErrors["weekends_cost"] =
          "Weekends Cost should greater than Weekdays Cost";
        hasError = true;
      }
    }

    setFieldErrors(newFieldErrors);

    if (!hasError) {
      formType === "add" ? createturf(values) : updateTurf(values);
    }
  };

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
{JSON.stringify(selectedTurf)}
      <List dense={false} className="list-parent"> 
          <ListItem className="add-turf-form-control">
            <TextField
              id="outlined-basic"
              label={`${turfName ? "" : "Enter turf name"}`}
              fullWidth={true}
              value={selectedTurf.turf_name}
              name="turf_name"
              onChange={(e) => {
                onChange(e);
              }}
            />
          </ListItem>
          {fieldErrors["turf_name"] !== "" && (
            <p className="validation-error">{fieldErrors["turf_name"]}</p>
          )}
          <ListItem className="add-turf-form-control">
            <TextField
              id="outlined-basic"
              label={`${turfSize ? "" : "Enter turf size"}`}
              fullWidth={true}
              name="areana_size"
              value={turfSize}
              onChange={(e) => { setTurfSize(() => e.target.value)
              }}
            />
          </ListItem>
          {fieldErrors["areana_size"] !== "" && (
            <p className="validation-error">{fieldErrors["areana_size"]}</p>
          )}

          <ListItem className="add-turf-form-control">
            <div className="form-element-wid">
              <TextField
                id="outlined-basic"
                label={`${weedaycost ? "" : "Week day cost"}`}
                fullWidth={true}
                value={weedaycost}
                name="weekdays_cost"
                onChange={(e) => {
                  setWeedayCost(() => e.target.value);
                }}
                type="number"
              />
            </div>

            <div className="form-element-wid">
              <TextField
                id="outlined-basic"
                label={`${weekendCost ? "" : "Week end cost"}`}
                fullWidth={true}
                name="weekends_cost"
                type="number"
                value={weekendCost}
                onChange={(e) => {
                  setWeekendCost(e.target.value);
                }}
              />
            </div>
          </ListItem>
          <>
            {fieldErrors["weekdays_cost"] !== "" && (
              <p className="validation-error">{fieldErrors["weekdays_cost"]}</p>
            )}
            {fieldErrors["weekends_cost"] !== "" && (
              <p className="validation-error">{fieldErrors["weekends_cost"]}</p>
            )}
          </>

          <div style={{ marginTop: "7px" }}>
            {turfSelected?.turfId > 0 ? (
              <>
                <button
                  type="button"
                  onClick={() => validateForm("update", turfSelected)}
                  style={{ width: "69%" }}
                >
                  Update turf
                </button>
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
              <>
                <button
                  type="button"
                  onClick={() => validateForm("add", turfSelected)}
                  style={{ width: "96%" }}
                >
                  Add turf
                </button>
              </>
            )}
          </div> 
        {/* )}
        </Formik> */}
      </List>
    </>
  );
}

export default AddEditTurf;
