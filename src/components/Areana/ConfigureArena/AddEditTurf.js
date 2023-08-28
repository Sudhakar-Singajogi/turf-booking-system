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

function AddEditTurf({ showEdit, selectedTurf }) {
  const { admin } = useSelector((state) => state.venue);
  const turfsel = admin.selectedTurf;
  const isTurfSel = turfsel.hasOwnProperty("turfId");
  const [fieldErrors, setFieldErrors] = useState({});

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
  }, []);
  
  const validateForm = async (formType, values) => {
    try {
      await addEditTurfValidationSchema.validate(values, {
        abortEarly: false,
      });
      setFieldErrors({});
      // Validation passed, you can call the createturf function here
      formType === "add" ? createturf(values) : updateTurf(values);
    } catch (error) {
      const newFieldErrors = {};
      error.inner.forEach((err) => {
        newFieldErrors[err.path] = err.message;
      });
      setFieldErrors(newFieldErrors);
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

      <List dense={false} className="list-parent">
        <Formik initialValues={turfSelected}>
          {({ handleChange, values }) => (
            <Form>
              <ListItem className="add-turf-form-control">
                <TextField
                  id="outlined-basic"
                  label={`${values?.turf_name ? "" : "Enter turf name"}`}
                  fullWidth={true}
                  value={values.turf_name}
                  name="turf_name"
                  onChange={(e) => {
                    resetErrorMsg(e);
                    handleChange(e);
                  }}
                />
              </ListItem>
              {fieldErrors["turf_name"] !== "" && (
                <p className="validation-error">{fieldErrors["turf_name"]}</p>
              )}
              <ListItem className="add-turf-form-control">
                <TextField
                  id="outlined-basic"
                  label={`${values?.areana_size ? "" : "Enter turf size"}`}
                  fullWidth={true}
                  name="areana_size"
                  value={values.areana_size}
                  onChange={(e) => {
                    resetErrorMsg(e);
                    handleChange(e);
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
                    label={`${values?.weekdays_cost ? "" : "Week day cost"}`}
                    fullWidth={true}
                    value={values.weekdays_cost}
                    name="weekdays_cost"
                    onChange={(e) => {
                      resetErrorMsg(e);
                      handleChange(e);
                    }}
                    type="number"
                  />
                </div>

                <div className="form-element-wid">
                  <TextField
                    id="outlined-basic"
                    label={`${values?.weekends_cost ? "" : "Week end cost"}`}
                    fullWidth={true}
                    name="weekends_cost"
                    type="number"
                    value={values.weekends_cost}
                    onChange={(e) => {
                      resetErrorMsg(e);
                      handleChange(e);
                    }}
                  />
                </div>
              </ListItem>
              <>
                {fieldErrors["weekdays_cost"] !== "" && (
                  <p className="validation-error">
                    {fieldErrors["weekdays_cost"]}
                  </p>
                )}
                {fieldErrors["weekends_cost"] !== "" && (
                  <p className="validation-error">
                    {fieldErrors["weekends_cost"]}
                  </p>
                )}
              </>

              <div style={{ marginTop: "7px" }}>
                {turfSelected?.turfId > 0 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => validateForm("update", values)}
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
                      onClick={() => validateForm("add", values)}
                      style={{ width: "96%" }}
                    >
                      Add turf
                    </button>
                  </>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </List>
    </>
  );
}

export default AddEditTurf;
