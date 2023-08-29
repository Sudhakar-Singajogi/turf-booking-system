import React from "react";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import List from "@mui/material/List";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearMsgs, createATurf } from "../../../Redux/Slices/VenueSliceReducer";

import Alert from "@mui/material/Alert";
import { useEffect } from "react";
let addNew = {
  turf_name: "",
  areana_size: "",
  weekdays_cost: "",
  weekends_cost: "",
};

function AddTurf({showEdit}) {
  const [fieldErrors, setFieldErrors] = useState({});
  const [turfInfo, setTurfInfo] = useState(addNew);
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.venue);

  

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

    if (weekdays_cost === "") {
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

    if (weekends_cost === "") {
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
      if (parseInt(weekdays_cost) > parseInt(weekends_cost)) {
        console.log(weekdays_cost);
        console.log(weekends_cost);
        newFieldErrors["weekends_cost"] =
          "Weekends Cost should greater than Weekdays Cost";
        hasError = true;
      } else {
        newFieldErrors["weekends_cost"] = "";
        hasError = false;
      }
    }

    if (!hasError) {
      if ((weekends_cost < weekdays_cost)) {
        newFieldErrors["weekends_cost"] =
          "Weekends Cost should greater than Weekdays Cost";
        hasError = true;
      }
    }

    setFieldErrors(newFieldErrors);

    if (!hasError) {
      createturf(values);
    }
  };

  const createturf = async (formValues) => {
    console.log("formValues: ", formValues);
    await dispatch(createATurf(formValues));
    setTurfInfo(addNew);
    showEdit(0);
  };

  const onChange = async (e) => {
    setTurfInfo((prevTurfSelected) => ({
      ...prevTurfSelected,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log('hey')
  }, []) 

  return (
    <> 
      <List dense={false} className="list-parent">
        <ListItem className="add-turf-form-control" key="add-edit-turfs">
          <TextField
            id="outlined-basic"
            label="Enter turf name"
            fullWidth={true}
            value={turfInfo.turf_name}
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
            label="Enter turf size"
            fullWidth={true}
            name="areana_size"
            value={turfInfo.areana_size}
            onChange={(e) => {
              onChange(e);
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
              label="Week days cost"
              fullWidth={true}
              value={turfInfo.weekdays_cost}
              name="weekdays_cost"
              type="number"
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>

          <div className="form-element-wid">
            <TextField
              id="outlined-basic"
              label="Week end cost"
              fullWidth={true}
              name="weekends_cost"
              type="number"
              value={turfInfo.weekends_cost}
              onChange={(e) => {
                onChange(e);
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
          <button
            type="button"
            onClick={() => validateForm("add", turfInfo)}
            style={{ width: "96%" }}
          >
            Add turf
          </button>
        </div>
        {/* )}
        </Formik> */}
      </List>
    </>
  );
}

export default AddTurf;
