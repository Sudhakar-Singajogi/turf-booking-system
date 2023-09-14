import {
  InputAdornment,
  Divider,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { styled } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { postCall } from "../../../APIServices";
import { useState } from "react";
import { useEffect } from "react";
import useCoupons from "../../../CustomHooks/useCoupons";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DatePicker from "react-datepicker";
import useDateTimeRealated from "../../../CustomHooks/useDateTimeRealated";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const CustomDatePickerInput = React.forwardRef((props, ref) => {
  return (
    <TextField
      {...props}
      variant="standard" // Add any other TextField props you want to customize
      style={{ width: "100%" }} // Make the input field take up the full width
      fullWidth
    />
  );
});

const CustomDatePickerInput2 = React.forwardRef((props, ref) => {
  return (
    <TextField
      {...props}
      variant="standard" // Add any other TextField props you want to customize
      style={{ width: "100%" }} // Make the input field take up the full width
      fullWidth
    />
  );
});

function EditCoupon({ couponId, updateCoupon }) {
  const [selectedCoupon, setSelectedCoupon] = useState({});
  const { GetACoupon } = useCoupons();
  const calenderRef = useRef();
  const calenderRef2 = useRef();

  const datePickerRef = useRef(null);
  const datePickerRef2 = useRef(null);
  const today = new Date(); // Get today's date

  const { dateStringToYmd } = useDateTimeRealated();

  useEffect(() => {
    const getCouponInfo = async (id) => {
      let resp = await GetACoupon(id); 
      setSelectedCoupon(resp);
    };
    getCouponInfo(couponId);
  }, [couponId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCoupon((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // setFieldErrors((prev) => ({
    //   ...prev,
    //   [name]: "",
    // }));
  };
  const handleDateChange = async (date) => {
    setSelectedCoupon((prevValues) => ({
      ...prevValues,
      offerStartsAt: date,
    }));
  };

  const handleEndAtDateChange = async (date) => {
    setSelectedCoupon((prevValues) => ({
      ...prevValues,
      offerEndAt: date,
    }));
  };

  const cancel = (id) => {
    updateCoupon(id);
  };

  const showCalender = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  const showCalender2 = () => {
    if (datePickerRef2.current) {
      datePickerRef2.current.setOpen(true);
    }
  };

  const [showDownArr, setShowDownArr] = useState(true);
  return (
    <>
      <Divider className="divider-line" />
      <Typography sx={{ mt: 1, mb: 1.5 }} color="text.secondary">
        <span style={{ float: "leftt", width: "10%" }}>Edit Coupon</span>{" "}
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
              <ListItem className="add-turf-form-control">
                <TextField
                  id="outlined-basic"
                  label={`${
                    selectedCoupon?.couponName ? "" : "Enter coupon name"
                  }`}
                  fullWidth={true}
                  value={selectedCoupon?.couponName || ""}
                  name="couponName"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </ListItem>
              <ListItem className="add-turf-form-control">
                <TextField
                  id="outlined-basic"
                  label={`${selectedCoupon?.offer ? "" : "Enter coupon Offer"}`}
                  fullWidth={true}
                  value={selectedCoupon?.offer || ""}
                  name="offer"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </ListItem>
              <ListItem className="add-turf-form-control">
                <div className="form-element-wid">
                  {/* <TextField
                    id="outlined-basic"
                    label="Starts on"
                    fullWidth={true}
                    value=""
                    name="weekdays_cost"
                    type="number"
                    onChange={(e) => {}}
                  /> */}
                  <TextField
                    className="w100"
                    label="Select Date"
                    id="outlined-start-adornment"
                    ref={calenderRef}
                    value={
                      selectedCoupon?.offerStartsAt &&
                      dateStringToYmd(selectedCoupon.offerStartsAt)
                    }
                    onFocus={() => showCalender()}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ width: "0%" }}>
                          <DatePicker
                            ref={datePickerRef}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            minDate={today} // Set the minimum selectable date to today
                            customInput={<CustomDatePickerInput />}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonthIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div className="form-element-wid">
                  <TextField
                    className="w100"
                    label="Select Date"
                    id="outlined-start-adornment2"
                    ref={calenderRef2}
                    value={
                      selectedCoupon?.offerEndAt &&
                      dateStringToYmd(selectedCoupon.offerEndAt)
                    }
                    onFocus={() => showCalender2()}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ width: "0%" }}>
                          <DatePicker
                            ref={datePickerRef2}
                            onChange={handleEndAtDateChange}
                            dateFormat="dd/MM/yyyy"
                            minDate={today} // Set the minimum selectable date to today
                            customInput={<CustomDatePickerInput2 />}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonthIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </ListItem>
              <div style={{ marginTop: "7px" }}>
                <>
                  <button
                    type="button"
                    onClick={() => {}}
                    style={{
                      width: "69%",
                      background: "#007bff",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                  >
                    Update Coupon
                  </button>
                  <button
                    style={{
                      width: "25%",
                      marginLeft: "4px",
                      background: "orange",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      cancel(0);
                    }}
                  >
                    Cancel
                  </button>
                </>
              </div>
            </List>
          </Demo>
        </>
      )}
    </>
  );
}

export default EditCoupon;
