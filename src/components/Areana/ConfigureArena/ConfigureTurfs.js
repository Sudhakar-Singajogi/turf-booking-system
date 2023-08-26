import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid"; 
import { Avatar, Button, Divider, ListItemAvatar } from "@mui/material"; 
import CancelIcon from '@mui/icons-material/Cancel';

function ConfigureTurfs() {
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [edit, setEdit] = useState(0);

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const showEdit = (id) => {
    setEdit(id);
  };

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
            <List dense={dense} className="list-parent">
              <ListItem className="add-turf-form-control">
                <TextField
                  id="outlined-basic" 
                  label="Enter turf name"
                  fullWidth={true}
                />
              </ListItem>
              <ListItem className="add-turf-form-control">
                <TextField
                  id="outlined-basic" 
                  label="Enter turf size"
                  fullWidth={true}
                />
              </ListItem>

              <ListItem className="add-turf-form-control">
                <div className="form-element-wid">
                  <TextField
                    id="outlined-basic" 
                    label="Week day cost"
                    fullWidth={true}
                  />
                </div>

                <div className="form-element-wid">
                  <TextField
                    id="outlined-basic" 
                    label="Week end cost"
                    fullWidth={true}
                  />
                </div>
              </ListItem>
              <div>
                {edit > 0 ? (
                  <>
                  <Button variant="contained" sx={{ width: "63%" }}>
                    Update turf
                  </Button>
                  <Button sx={{width: "25%",  marginLeft: "4px", background:"orange", color:"#fff"}}  >
                    Cancel
                  </Button>
                  </>
                  
                ) : (
                  <Button variant="contained" sx={{ width: "100%" }}>
                    Add turf
                  </Button>
                )}
              </div>
            </List>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <h6 className="accodion-sub-title">Turfs Available</h6>
          <Demo>
            <List dense={dense}>
              <ListItem
                secondaryAction={
                  <>
                    <span className="grid-header">Turf Cost </span>
                    <span className="grid-header grid-header-adjust "> </span>
                    <span className="grid-header">Actions </span>
                  </>
                }
              >
                <span className="grid-header">Turf Name</span>
              </ListItem>
              <Divider className="divider-line" />

              {[1, 2, 3].map((value) => {
                return (
                  <>
                    <ListItem
                      secondaryAction={
                        <>
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() => showEdit(value)}
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
                          >
                            {/* <DeleteIcon /> */}
                            <i class="fas fa-trash-alt "></i>
                          </IconButton>
                        </>
                      }
                    >
                      <ListItemText
                        primary="Single-line item"
                        secondary={secondary ? "Secondary text" : null}
                      />

                      <ListItemText
                        primary="1000, 800"
                        secondary={secondary ? "Secondary text" : null}
                      />
                    </ListItem>
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
