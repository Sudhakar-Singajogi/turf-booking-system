import { Divider, List, ListItem, TextField, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState } from "react";
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function AddCoupon() {
  const [showDownArr, setShowDownArr] = useState(true);
  return (
    <>
      <Divider className="divider-line" />
      <Typography sx={{ mt: 1, mb: 1.5 }} color="text.secondary">
        <span style={{ float: "leftt", width: "10%" }}>Add New Coupon</span>{" "}
        <span
          style={{ float: "right", cursor: "pointer" }}
          onClick={() => setShowDownArr(() => !showDownArr)}
        >
          {showDownArr ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </span>
      </Typography>
      {showDownArr && (
        <>
          <Demo key="add-edit-coupons">
            <List dense={false} className="list-parent">
              <ListItem className="add-turf-form-control" >
                <TextField
                  id="outlined-basic"
                  label="Enter coupon name"
                  fullWidth={true}
                  value=""
                  name="turf_name"
                  onChange={(e) => {}}
                />
              </ListItem>
              <ListItem className="add-turf-form-control">
                <TextField
                  id="outlined-basic"
                  label="Enter coupon name"
                  fullWidth={true}
                  value=""
                  name="turf_name"
                  onChange={(e) => {}}
                />
              </ListItem>
              <ListItem className="add-turf-form-control" >
                <div className="form-element-wid">
                  <TextField
                    id="outlined-basic"
                    label="Starts on"
                    fullWidth={true}
                    value=""
                    name="weekdays_cost"
                    type="number"
                    onChange={(e) => {}}
                  />
                </div>

                <div className="form-element-wid">
                  <TextField
                    id="outlined-basic"
                    label="Ends on"
                    fullWidth={true}
                    name="weekends_cost"
                    type="number"
                    value=""
                    onChange={(e) => {}}
                  />
                </div>
              </ListItem>
              <div style={{ marginTop: "7px" }}>
                <button
                  type="button"
                  onClick={() => {}}
                  style={{ width: "96%" }}
                >
                  Add turf
                </button>
              </div>
            </List>
          </Demo>
        </>
      )}
    </>
  );
}

export default AddCoupon;
