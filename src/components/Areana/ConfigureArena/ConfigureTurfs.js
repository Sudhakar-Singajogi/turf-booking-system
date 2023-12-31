import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import { clearMsgs, getATurf } from "../../../Redux/Slices/VenueSliceReducer";
import { useLoaderContext } from "../../../contexts/LoaderContextProvider";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { deleteATurf } from "../../../Redux/Slices/VenueSliceReducer";
import useVenue from "../../../CustomHooks/useVenue";
import AddTurf from "./AddTurf";
import EditTurf from "./EditTurf";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

let addNew = {
  turf_name: "",
  areana_size: "",
  weekdays_cost: "",
  weekends_cost: "",
};
function ConfigureTurfs({ ...props }) {
  const [edit, setEdit] = useState(0);
  const { admin } = useSelector((state) => state.venue);
  const dispatch = useDispatch();
  const [turfInfo, setTurfInfo] = useState({});
  const [tempState, setTempState] = useState();
  const [severity, setSeverity] = useState("");
  const [msg, setMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { isLoading, setLoader } = useLoaderContext();
  const turfIdRef = useRef(0);
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  const [showDownArr, setShowDownArr] = useState(true);

  const { getSelectedTurf, getTurfErrorMsgs } = useVenue();

  useEffect(() => {
    let turfErrMsgs;

    // setLoader(false);
    console.log("configure turf called");
    setShowAlert(() => false);
    if (edit > 0) {
      setTimeout(() => {
        turfErrMsgs = getTurfErrorMsgs();
        setLoader(false);
      }, 300);
    } else {
      turfErrMsgs = getTurfErrorMsgs();
      setTurfInfo(addNew);
    }

    if (turfErrMsgs?.update !== "") {
      if (turfErrMsgs?.update === "Turf Updated successfully") {
        setMsg(turfErrMsgs?.update);
        setShowAlert(() => true);
        setSeverity(() => "success");
      } else {
        setMsg(turfErrMsgs?.update);
        setShowAlert(
          turfErrMsgs?.update === "Failed to update turf, kindly cntact admin"
        );
        setSeverity("error");
      }
    } else if (turfErrMsgs?.insert !== "") {
      if (turfErrMsgs?.insert === "Turf created successfully") {
        setShowAlert(true);
        setSeverity("success");
        setMsg(turfErrMsgs?.insert);
      } else {
        setMsg(turfErrMsgs?.insert);
        setSeverity("error");
        setShowAlert(
          turfErrMsgs?.insert === "Failed to create turf, kindly cntact admin"
        );
      }
    }
  }, [edit, getSelectedTurf]);

  const deleteTurf = async (id) => {
    showEdit(id);
    setLoader(true);
    await dispatch(deleteATurf(id));
    showEdit(0);
  };
  const updateTurf = (id) => {
    if (turfIdRef.current !== id) {
      setLoader(true);
      showEdit(id);
      setTempState(id);
      turfIdRef.current = id;
    }
  };

  const showEdit = (id) => {
    // console.log("hey id now is: ", id);
    setEdit(() => id);
  };

  const clearMessages = async () => {
    dispatch(clearMsgs(""));
    setShowAlert(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* <h6 className="accodion-sub-title">Turfs Available</h6> */}
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Turfs Available
          </Typography>
          <Demo key="listing-turfs">
            {showAlert === true && (
              <Alert
                onClose={() => {
                  clearMessages();
                }}
                sx={{ fontWeight: "bold" }}
                severity={severity}
              >
                {msg}
              </Alert>
            )}
            <List dense={false}>
              <Divider className="divider-line" />
              {turfInfo.turfId}

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
                          <i className="fas fa-trash-alt "></i>
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

      <Typography sx={{ mt: 1, mb: 1.5 }} color="text.secondary">
        <span style={{ float: "left", cursor: "pointer" }}>
          {edit === 0 ? "Add New Turf" : "Edit Turf"}
        </span>{" "}
        <span
          style={{ float: "right", cursor: "pointer" }}
          onClick={() => setShowDownArr(() => !showDownArr)}
        >
          {showDownArr ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </span>
      </Typography>

      <Grid container spacing={2}>
        <Grid item sx={{ paddingTop: "0px !important", mt: 1, mb: 1 }}>
          {edit === 0 && showDownArr && (
            <AddTurf key="addturf" showEdit={showEdit} />
          )}
          {edit > 0 && showDownArr && (
            <EditTurf
              key={`editTurf_${edit}`}
              turfInfo={turfInfo}
              showEdit={showEdit}
              edit={edit}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
export default ConfigureTurfs;
