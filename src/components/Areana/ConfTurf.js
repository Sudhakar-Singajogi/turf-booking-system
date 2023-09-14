import React, { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import AddTurf from "./ConfigureArena/AddTurf";
import EditTurf from "./ConfigureArena/EditTurf";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useLoaderContext } from "../../contexts/LoaderContextProvider";
import useManageTurfs from "../../CustomHooks/useManageTurfs";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function ConfTurf({ ...props }) {
  const [allTurfs, setAllTurfs] = useState([]);
  const { admin } = useSelector((state) => state.venue);
  const dispatch = useDispatch();
  const [turfInfo, setTurfInfo] = useState({});
  const [edit, setEdit] = useState(0);
  const [showDownArr, setShowDownArr] = useState(true);
  const { isLoading, setLoader } = useLoaderContext();
  const { getAllTurfsByArena } = useManageTurfs();

  useEffect(() => {
    const fetchAllTurfs = async (arena_id) => {
      const allturfsResp = await getAllTurfsByArena(arena_id);
      console.log('allturfsResp: ', allturfsResp)
      if (allturfsResp.success) {
        setAllTurfs(() => allturfsResp.data);
      }
    };

    fetchAllTurfs(admin.info.arena_id);
  }, [edit]);

  const updateTurf = useCallback((turfId) => {
    setEdit(turfId);
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* <h6 className="accodion-sub-title">Turfs Available</h6> */}
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Turfs Available
            </Typography>
            <Demo key="listing-turfs">
              <List dense={false}>
                <Divider className="divider-line" />

                {allTurfs.map((turf) => {
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
                            //   onClick={() => deleteTurf(turf.turfId)}
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
              <AddTurf key="addturf" showEdit={setEdit} />
            )}
            {edit > 0 && showDownArr && (
              <EditTurf
                key={`editTurf_${edit}`}
                turfInfo={turfInfo}
                showEdit={setEdit}
                edit={edit}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ConfTurf;
