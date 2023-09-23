import React from "react";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createATurf } from "../../../Redux/Slices/VenueSliceReducer";
import { validateAddEditTurfForm } from "../../../CustomLogics/customLogics";
import { useEffect } from "react";
import { useLoaderContext } from "../../../contexts/LoaderContextProvider";
let addNew = {
  turf_name: "",
  areana_size: "",
  weekdays_cost: "",
  weekends_cost: "",
};

function AddTurf({ showEdit }) {
  const [fieldErrors, setFieldErrors] = useState({});
  const [turfInfo, setTurfInfo] = useState(addNew);
  const dispatch = useDispatch();
  const { setLoader } = useLoaderContext();

  const validateForm = async (formType, values) => {
    let { hasErrors, fieldErrors } = validateAddEditTurfForm(values);
    setFieldErrors(fieldErrors);
    if (hasErrors !== true) {
      createturf(values);
    }
  };

  const createturf = async (formValues) => {
    setLoader(true);
    await dispatch(createATurf(formValues));
    setTurfInfo(addNew);
    showEdit(-1);
    setTimeout(() => {
      setLoader(false);
    }, 300)
  };

  const onChange = async (e) => {
    setTurfInfo((prevTurfSelected) => ({
      ...prevTurfSelected,
      [e.target.name]: e.target.value,
    }));
    setFieldErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  useEffect(() => {
    console.log("hey");
  }, []);

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
