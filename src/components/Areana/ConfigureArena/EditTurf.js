import React, { useRef } from "react";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";

import List from "@mui/material/List";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTuyfsByArena, updateATurf } from "../../../Redux/Slices/VenueSliceReducer";
import { useEffect } from "react";
import { validateAddEditTurfForm } from "../../../CustomLogics/customLogics";
import { useLoaderContext } from "../../../contexts/LoaderContextProvider";
import useManageTurfs from "../../../CustomHooks/useManageTurfs";

const baseURL = process.env.REACT_APP_apibaseURL;
function EditTurf({ showEdit, edit, turfInfo: turf }) {
  const { admin } = useSelector((state) => state.venue);
  const [turfInfo, setTurfInfo] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const dispatch = useDispatch();
  const { setLoader } = useLoaderContext();
  const { updateTurf } = useManageTurfs();

  useEffect(() => {
    const getturf = async (id) => {
      const resp = await fetch(`${baseURL}turf/getdetails`, {
        method: "POST",
        body: JSON.stringify({ turfId: id, arena_id: admin.info.arena_id }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      let turfInfo = await resp.json();
      setTurfInfo(turfInfo.data);
    };
    getturf(edit);
  }, [edit]);

  const resetUpdateForm = () => {
    showEdit(0);
  };

  const validateForm = async (formType, values) => {
    let { hasErrors, fieldErrors } = validateAddEditTurfForm(values);
    setFieldErrors(fieldErrors);
    if (hasErrors !== true) {
      update_turf(values);
    }
  };

  const update_turf = async () => {
    setLoader(true);
    // await dispatch(updateATurf(turfInfo));
    updateTurf(turfInfo);
    showEdit(0);
    
    setLoader(false);
  };

  const onTurfInfoChange = (e) => {
    const { name, value } = e.target;
    setTurfInfo((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  return (
    <>
      <List dense={false} className="list-parent">
        <ListItem className="add-turf-form-control" key={`edit-turfs-${edit}`}>
          <TextField
            id="outlined-basic"
            label={`${turfInfo?.turfId ? "" : "Enter turf name"}`}
            fullWidth={true}
            value={turfInfo?.turfId > 0 ? turfInfo?.turf_name : ""}
            name="turf_name"
            onChange={onTurfInfoChange}
          />
        </ListItem>
        {fieldErrors["turf_name"] !== "" && (
          <p className="validation-error">{fieldErrors["turf_name"]}</p>
        )}
        <ListItem className="add-turf-form-control">
          <TextField
            id="outlined-basic"
            label={`${turfInfo?.turfId ? "" : "Enter turf size"}`}
            fullWidth={true}
            name="areana_size"
            value={turfInfo?.turfId > 0 ? turfInfo?.areana_size : ""}
            onChange={onTurfInfoChange}
          />
        </ListItem>
        {fieldErrors["areana_size"] !== "" && (
          <p className="validation-error">{fieldErrors["areana_size"]}</p>
        )}

        <ListItem className="add-turf-form-control">
          <div className="form-element-wid">
            <TextField
              id="outlined-basic"
              label={`${
                turfInfo?.turfId > 0 && turfInfo?.weekdays_cost
                  ? ""
                  : "Week day cost"
              }`}
              fullWidth={true}
              value={turfInfo?.turfId > 0 ? turfInfo?.weekdays_cost : ""}
              name="weekdays_cost"
              onChange={onTurfInfoChange}
              type="number"
            />
          </div>

          <div className="form-element-wid">
            <TextField
              id="outlined-basic"
              label={`${turfInfo?.weekends_cost ? "" : "Week end cost"}`}
              fullWidth={true}
              name="weekends_cost"
              type="number"
              value={turfInfo?.turfId > 0 ? turfInfo?.weekends_cost : ""}
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
          <>
            <button
              type="button"
              onClick={() => validateForm("update", turfInfo)}
              style={{
                width: "69%",
                background: "#007bff",
                color: "#fff",
                borderRadius: "5px",
              }}
            >
              Update turf
            </button>
            <button
              style={{
                width: "25%",
                marginLeft: "4px",
                background: "orange",
                color: "#fff",
                borderRadius: "5px",
              }}
              onClick={() => resetUpdateForm()}
            >
              Cancel
            </button>
          </>
        </div>
        {/* )}
        </Formik> */}
      </List>
    </>
  );
}

export default EditTurf;
