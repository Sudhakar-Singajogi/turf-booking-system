import {useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid"; 
import AddIcon from "@mui/icons-material/Add";
import { Avatar, Divider, ListItemAvatar } from "@mui/material";
import GrassIcon from "@mui/icons-material/Grass"; 

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
        <Grid item xs={12} sx={{ paddingTop: "0px !important" }}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { mb: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <List dense={dense}>
              <ListItem
                className="add-turf-form-control"
                secondaryAction={
                  <>
                    <Avatar className="add-turf-btn-icon">
                      <AddIcon />
                    </Avatar>
                  </>
                }
              >
                <TextField
                  id="outlined-basic"
                  className="form-element-wid"
                  label="Enter turf name"
                  variant="standard"
                  fullWidth={true}
                />
              </ListItem>
            </List>
          </Box>

          <Divider style={{ background: "##dfdfdf" }} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h6 className="accodion-sub-title">Existing Turfs</h6>
          <Demo>
            <List dense={dense}>
              {[1, 2, 3].map((value) => {
                return (
                  <>
                    <ListItem
                    
                      secondaryAction={
                        <>
                          {edit === value ? (
                            <>
                              <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() => showEdit(value)}
                                sx={{mx:0}}
                              >
                                <i className="fas fa-check-circle fa-lg"></i>
                              </IconButton>
                              <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() => showEdit(value)}
                                sx={{mx:-2}}
                              >
                                <i className="fas fa-times-circle fa-lg"></i>
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() => showEdit(value)}
                              >
                                <i className="fas fa-edit fa-md"></i>
                              </IconButton>
                              <IconButton edge="end" aria-label="delete">
                                {/* <DeleteIcon /> */}
                                <i class="fas fa-trash-alt fa-md"></i>
                              </IconButton>
                            </>
                          )}
                        </>
                      } 
                    >
                      {edit === value ? (
                        <TextField
                          id="standard-basic"
                          className="form-element-wid"
                          label="standard"
                          variant="standard"
                        />
                      ) : (
                        <>
                          <ListItemAvatar>
                            <Avatar
                              sx={{ backgroundColor: "green" }}
                              className="accordion-Icons"
                            >
                              <GrassIcon sx={{ color: 'green"' }} />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Single-line item"
                            secondary={secondary ? "Secondary text" : null}
                          />
                        </>
                      )}
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
