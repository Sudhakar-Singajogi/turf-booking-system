import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getATurf } from "../../../Redux/Slices/VenueSliceReducer";

function AddEditTurf({ showEdit, edit, selectedTurf }) {
  const [turfSelected, setTurfSelected] = useState(selectedTurf);
  const dispatch = useDispatch();
  const resetUpdateForm = async () => {
    showEdit(0);
    await dispatch(getATurf(0)); 
  };
  return (
    <>
      {/* {turfSelected?.turfId && (<p>Update Turf</p>)}

    { (edit === 0  && turfSelected.turfId === undefined) && (<p>Add New Turf</p>) } */}

      <List dense={false} className="list-parent">
        <ListItem className="add-turf-form-control">
          <TextField
            id="outlined-basic"
            label={`${turfSelected?.turf_name ? "" : "Enter turf name"}`}
            fullWidth={true}
            value={turfSelected?.turf_name}
          />
        </ListItem>
        <ListItem className="add-turf-form-control">
          <TextField
            id="outlined-basic"
            label={`${turfSelected?.areana_size ? "" : "Enter turf size"}`}
            fullWidth={true}
            value={turfSelected?.areana_size}
          />
        </ListItem>

        <ListItem className="add-turf-form-control">
          <div className="form-element-wid">
            <TextField
              id="outlined-basic"
              label={`${turfSelected?.weekdays_cost ? "" : "Week day cost"}`}
              fullWidth={true}
              value={turfSelected?.weekdays_cost}
            />
          </div>

          <div className="form-element-wid">
            <TextField
              id="outlined-basic"
              label={`${turfSelected?.weekends_cost ? "" : "Week end cost"}`}
              fullWidth={true}
              value={turfSelected?.weekends_cost}
            />
          </div>
        </ListItem>
        <div style={{ marginTop: "7px" }}>
          {turfSelected?.turfId > 0 ? (
            <>
              <Button variant="contained" sx={{ width: "69%" }}>
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
            <Button variant="contained" sx={{ width: "96%" }}>
              Add turf
            </Button>
          )}
        </div>
      </List>
    </>
  );
}

export default AddEditTurf;
