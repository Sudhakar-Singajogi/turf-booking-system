import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
// import AddEditTurf from "./AddEditTurf";
import { useCallback } from "react";
import {
  getATurf,
  getSelectedTurf,
} from "../../../Redux/Slices/VenueSliceReducer";
import { useLoaderContext } from "../../../contexts/LoaderContextProvider";
// import TurfList from "./TurfList";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { deleteATurf } from "../../../Redux/Slices/VenueSliceReducer";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import useVenue from "../../../CustomHooks/useVenue";
import AddEditTurf from "./AddEditTurf";

let addNew = {
  turf_name: "",
  areana_size: "",
  weekdays_cost: "",
  weekends_cost: "",
};
function ConfigureTurfs() {
  const [edit, setEdit] = useState(0);
  const { admin } = useSelector((state) => state.venue);
  const dispatch = useDispatch();
  const [turfInfo, setTurfInfo] = useState({});
  const { setLoader } = useLoaderContext();
  const [tempState, setTempState] = useState();
  const turfIdRef = useRef(0);
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const { getSelectedTurf } = useVenue();

  useEffect(() => {
    if (edit > 0) {
      setTimeout(() => {
        const resp = getSelectedTurf();
        setTurfInfo(resp);
        console.log("selected turf is: ", resp);

      },0)
    } else {
      console.log('sd')
      setTurfInfo(addNew);
    }
  }, [tempState, edit]);

  const deleteTurf = (id) => {
    showEdit(id);
    dispatch(deleteATurf(id));
  };
  const updateTurf = (id) => {
    console.log(turfIdRef.current);
    console.log(id);

    const getTurfDetails = async () => {
      setEdit(() => id);
      await dispatch(getATurf(id));
      setTimeout(async () => {
        setTempState(admin.selectedTurf);
      },0);
      turfIdRef.current = id;
    };
    if (turfIdRef.current !== id || !turfInfo.hasOwnProperty('turfId')) {
      getTurfDetails();
    }
  };

  const onTurfInfoChange = (e) => {
    const { name, value } = e.target;
    setTurfInfo((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    console.log(turfInfo)
  };

  const handleTurfInfoChange = (newTurfInfo) => {
    setTurfInfo(newTurfInfo);
  };
  

  const showEdit = (id) => {
    console.log('hey id now is: ', id)
    setEdit(() => id);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <h6 className="accodion-sub-title">Turfs Available</h6>
          <Demo key="listing-turfs">
            <List dense={false}>
              <Divider className="divider-line" />

              {admin.turfs.map((turf) => {
                return (
                  <ListItem
                    key={turf.turfId}
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => updateTurf(turf.turfId)}
                          className="manage-btns-l"
                          sx={{ mx: 3 }}
                        >
                          <i className="fas fa-edit "></i>
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          className="manage-btns-r"
                          sx={{ mx: -4.5 }}
                          onClick={() => deleteTurf(turf.turfId)}
                        >
                          {/* <DeleteIcon /> */}
                          <i class="fas fa-trash-alt "></i>
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText primary={turf.turf_name} />

                    <ListItemText
                      primary={`₹ (${turf.weekdays_cost}, ${turf.weekends_cost})`}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Demo>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ paddingTop: "0px !important", mt: 1 }}>
          {/* <h6 className="accodion-sub-title">Add new turf</h6> */}

          <Box
            component="form"
            sx={{
              "& > :not(style)": { mb: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <AddEditTurf turfInfo={turfInfo} onChange={onTurfInfoChange} showEdit={showEdit}    updateTurfInfo={handleTurfInfoChange} // Add this prop
/>

            {/* <List dense={false} className="list-parent">
              <ListItem className="add-turf-form-control" key="add-edit-turfs">
                <TextField
                  id="outlined-basic"
                  label={`${turfInfo.turf_name ? "" : "Enter turf name"}`}
                  fullWidth={true}
                  value={turfInfo.turf_name}
                  name="turf_name"
                  onChange={onTurfInfoChange}
                />
              </ListItem> 
              <ListItem className="add-turf-form-control">
                <TextField
                  id="outlined-basic"
                  label={`${turfInfo.areana_size ? "" : "Enter turf size"}`}
                  fullWidth={true}
                  name="areana_size"
                  value={turfInfo.areana_size}
                  onChange={onTurfInfoChange}
                />
              </ListItem> 

              <ListItem className="add-turf-form-control">
                <div className="form-element-wid">
                  <TextField
                    id="outlined-basic"
                    label={`${turfInfo.weekdays_cost ? "" : "Week day cost"}`}
                    fullWidth={true}
                    value={turfInfo.weekdays_cost}
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
                    value={turfInfo.weekends_cost}
                    onChange={onTurfInfoChange}
                  />
                </div>
              </ListItem> 
              <div style={{ marginTop: "7px" }}>
                {turfInfo?.turfId > 0 ? (
                  <>
                    <button
                      type="button"
                      // onClick={() => validateForm("update", turfSelected)}
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
            </List> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default ConfigureTurfs;
