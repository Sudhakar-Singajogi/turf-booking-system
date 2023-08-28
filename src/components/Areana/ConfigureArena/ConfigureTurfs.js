import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux"; 
import AddEditTurf from "./AddEditTurf";
import { useCallback } from "react";
import { getATurf } from "../../../Redux/Slices/VenueSliceReducer";
import { useLoaderContext } from "../../../contexts/LoaderContextProvider";
// import TurfList from "./TurfList";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";  
import { deleteATurf } from "../../../Redux/Slices/VenueSliceReducer";


function ConfigureTurfs() {
  const [edit, setEdit] = useState(0);
  const { admin } = useSelector((state) => state.venue);
  const dispatch = useDispatch();
  const [turfInfo, setTurfInfo] = useState(admin.selectedTurf)
  const { setLoader } = useLoaderContext();

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const deleteTurf = (id) => { 
    showEdit(id);
    dispatch(deleteATurf(id));
    
  };
  const updateTurf = (id) => {
    // setLoader(true);
    setEdit(() =>id);
  };

  const onTurfInfoChange = (e) => {
    setTurfInfo((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));

  }


  useEffect(() => { 
    const getTurfDetails = async () => {      
      if (edit > 0 && edit !== admin.selectedTurf.turfId) {
        await dispatch(getATurf(edit)); 
        setTimeout(async () => {          
        }, 100) 
      }
      // setLoader(false);
    };
    
    getTurfDetails();
  }, [edit, admin.selectedTurf.turfId]);

  const showEdit = useCallback((id) => {
    setEdit(() => id); 
    
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
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
            
            <AddEditTurf
              key="addoredit"
              selectedTurf={turfInfo}
              onChange={onTurfInfoChange}
              edit={edit}
              showEdit={showEdit}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <h6 className="accodion-sub-title">Turfs Available</h6>
          <Demo>
            <List dense={false}>
              <Divider className="divider-line" />
              {/* {admin.turfs.length > 0 &&
                admin.turfs.map((turf) => {
                  return (
                    <>
                      <TurfListItem
                        key={turf.turfId}
                        showEdit={showEdit}
                        turf={turf}
                      />
                    </>
                  );
                })} */}
                {/* <TurfList key="turfs list"
                        showEdit={showEdit}
                        turfs={admin.turfs} /> */}

                        {
                          admin.turfs.map((turf) => {
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
                          })
                        }

            </List>
          </Demo>
        </Grid>
      </Grid>
      
    </Box>
  );
}
export default ConfigureTurfs;
