import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import TurfListItem from "./TurfListItem";
import AddEditTurf from "./AddEditTurf";
import { useCallback } from "react";
import { getATurf } from "../../../Redux/Slices/VenueSliceReducer";
import { useLoaderContext } from "../../../contexts/LoaderContextProvider";

function ConfigureTurfs() {
  const [edit, setEdit] = useState(0);
  const { admin } = useSelector((state) => state.venue);
  const dispatch = useDispatch();
  const { setLoader } = useLoaderContext();

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  useEffect(() => {
    const getTurfDetails = async () => {      
      if (edit > 0 && edit !== admin.selectedTurf.turfId) {
        await dispatch(getATurf(edit)); 
        setTimeout(async () => {          
        }, 100)
        setLoader(false);
        setEdit(() => admin.selectedTurf.turfId)
      }
      
    };
    
    getTurfDetails();
  }, [edit, admin.selectedTurf.turfId, dispatch, setLoader]);

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
              selectedTurf={admin.selectedTurf}
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
              {admin.turfs.length > 0 &&
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
                })}
            </List>
          </Demo>
        </Grid>
      </Grid>
      
    </Box>
  );
}
export default ConfigureTurfs;
