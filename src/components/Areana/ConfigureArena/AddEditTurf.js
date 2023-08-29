import React from "react";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import List from "@mui/material/List";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateATurf } from "../../../Redux/Slices/VenueSliceReducer";
import { useEffect } from "react";
import useVenue from "../../../CustomHooks/useVenue";

function AddEditTurf({ turfInfo, onChange: onTurfInfoChange, showEdit }) {
  const [validationError, setValidationError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const dispatch = useDispatch();
  const { getSelectedTurf } = useVenue();
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

  const updateTurf = async () => {
    console.log("updated object is: ", turfInfo);
    dispatch(updateATurf(turfInfo));
    setTimeout(() => {
      showEdit(0);
    }, 400);
  };

  const createturf = async (formValues) => {
    console.log("formValues: ", formValues);
    // dispatch(createATurf(formValues));
  };
  // const resp = getSelectedTurf();
  // console.log("resp is:", resp)
  //   if(!resp.hasOwnProperty('turfId')) {
  //     turfInfo = {}
  //   }

  useEffect(() => {
    console.log("add edit turf", turfInfo);
  }, [turfInfo]);

  return (
    <>
      <List dense={false} className="list-parent">
        <ListItem className="add-turf-form-control" key="add-edit-turfs">
          <TextField
            id="outlined-basic"
            label={`${turfInfo.turfId ? "" : "Enter turf name"}`}
            fullWidth={true}
            value={turfInfo.turfId > 0 ? turfInfo.turf_name : ""}
            name="turf_name"
            onChange={onTurfInfoChange}
          />
        </ListItem>
        {/* {fieldErrors["turf_name"] !== "" && (
            <p className="validation-error">{fieldErrors["turf_name"]}</p>
          )} */}
        <ListItem className="add-turf-form-control">
          <TextField
            id="outlined-basic"
            label={`${turfInfo.turfId ? "" : "Enter turf size"}`}
            fullWidth={true}
            name="areana_size"
            value={turfInfo.turfId > 0 ? turfInfo.areana_size : ""}
            onChange={onTurfInfoChange}
          />
        </ListItem>
        {/* {fieldErrors["areana_size"] !== "" && (
            <p className="validation-error">{fieldErrors["areana_size"]}</p>
          )} */}

        <ListItem className="add-turf-form-control">
          <div className="form-element-wid">
            <TextField
              id="outlined-basic"
              label={`${
                turfInfo.turfId > 0 && turfInfo.weekdays_cost
                  ? ""
                  : "Week day cost"
              }`}
              fullWidth={true}
              value={turfInfo.turfId > 0 ? turfInfo.weekdays_cost : ""}
              name="weekdays_cost"
              onChange={onTurfInfoChange}
              type="number"
            />
          </div>

          <div className="form-element-wid">
            <TextField
              id="outlined-basic"
              label={`${turfInfo.weekends_cost ? "" : "Week end cost"}`}
              fullWidth={true}
              name="weekends_cost"
              type="number"
              value={turfInfo.turfId > 0 ? turfInfo.weekends_cost : ""}
              onChange={onTurfInfoChange}
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
          {turfInfo?.turfId > 0 ? (
            <>
              <button
                type="button"
                onClick={() => validateForm("update", turfInfo)}
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
                // onClick={() => resetUpdateForm()}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <button
                type="button"
                // onClick={() => validateForm("add", turfSelected)}
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
