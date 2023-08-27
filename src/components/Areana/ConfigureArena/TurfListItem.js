import React from "react"; 
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";  
import { useLoaderContext } from "../../../contexts/LoaderContextProvider";


function TurfListItem({showEdit,turf}) {
    const { setLoader } = useLoaderContext();
  const deleteTurf = (id) => {
    showEdit(id);
  }
  const updateTurf = (id) => {
    setLoader(true);
      showEdit(id);
  }
  
  return (
    <>
      <ListItem
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
        <ListItemText
          primary={turf.turf_name} 
        />

        <ListItemText
          primary={`₹ (${turf.weekdays_cost}, ${turf.weekends_cost})`} 
        />
      </ListItem>
    </>
  );
}

export default React.memo(TurfListItem);
