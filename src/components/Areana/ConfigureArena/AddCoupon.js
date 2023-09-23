import React, { useRef, useState } from "react";
import { Divider, List, ListItem, TextField, Typography } from "@mui/material"; 
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { InputAdornment } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DatePicker from "react-datepicker";
import useDateTimeRealated from "../../../CustomHooks/useDateTimeRealated";
import { styled } from "@mui/material/styles";

import useCoupons from "../../../CustomHooks/useCoupons";

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

function AddCoupon({setCouponId}) {
  const [showDownArr, setShowDownArr] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({});
  const [coupon, setCoupon] = useState({
    couponName: "",
    offer: "",
    offerEndAt: "",
    offerStartsAt: "",
  });
  const calenderRef = useRef();
  const calenderRef2 = useRef();

  const datePickerRef = useRef(null);
  const datePickerRef2 = useRef(null);
  const today = new Date(); // Get today's date

  const { dateStringToYmd, compareTwoDates } = useDateTimeRealated();

  const{addACoupon} =  useCoupons();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
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

  const handleDateChange = async (date) => {
    setCoupon((prevValues) => ({
      ...prevValues,
      offerStartsAt: date,
    }));
    setFieldErrors((prev) => ({
      ...prev,
      offerStartsAt: "",
    }));
  };

  const handleEndAtDateChange = async (date) => {
    setCoupon((prevValues) => ({
      ...prevValues,
      offerEndAt: date,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      offerEndAt: "",
    }));
  };

  const validateCoupon = async () => {
    let hasError = false;
    let newCoupon = coupon;

    if (newCoupon.offer === "") {
      setFieldErrors((prev) => ({
        ...prev,
        offer: "Please enter offer",
      }));
      hasError = true;
    }

    if (newCoupon.couponName === "") {
      setFieldErrors((prev) => ({
        ...prev,
        couponName: "Please enter coupon name",
      }));
      hasError = true;
    }

    console.log("newCoupon is:", newCoupon);
    if (newCoupon.offerStartsAt !== "" && newCoupon.offerEndAt !== "") {
      const isDatesAllowed = compareTwoDates(
        newCoupon.offerStartsAt,
        newCoupon.offerEndAt
      );
      if (isDatesAllowed) {
        setFieldErrors((prev) => ({
          ...prev,
          offerStartsAt: "",
          offerEndAt: "",
        }));
      } else {
        hasError = true;
        setFieldErrors((prev) => ({
          ...prev,
          offerEndAt: "Should be lessthan or equal to start Date",
        }));
      }
    } else {
      hasError = true;
      if (newCoupon.offerStartsAt === "") {
        setFieldErrors((prev) => ({
          ...prev,
          offerStartsAt: "Please select From Date",
        }));
      } else {
        setFieldErrors((prev) => ({
          ...prev,
          offerStartsAt: "'",
        }));
      }

      if (newCoupon.offerEndAt === "") {
        setFieldErrors((prev) => ({
          ...prev,
          offerEndAt: "Please select To Date",
        }));
      } else {
        setFieldErrors((prev) => ({
          ...prev,
          offerEndAt: "'",
        }));
      }
    }

    if (!hasError) {
      const resp = await addACoupon(newCoupon);
      if(resp.length > 0) {
        setCouponId(0);
      } 
    }
  };

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
              <ListItem className="add-turf-form-control">
                <TextField
                  id="outlined-basic"
                  label="Enter coupon name"
                  fullWidth={true}
                  value={coupon?.couponName || ""}
                  name="couponName"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </ListItem>
              {fieldErrors["couponName"] !== "" && (
                <p className="validation-error">{fieldErrors["couponName"]}</p>
              )}
              <ListItem className="add-turf-form-control">
                <TextField
                  id="outlined-basic"
                  label="Enter coupon Offer"
                  fullWidth={true}
                  value={coupon?.offer || ""}
                  name="offer"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </ListItem>
              {fieldErrors["offer"] !== "" && (
                <p className="validation-error">{fieldErrors["offer"]}</p>
              )}
              <ListItem className="add-turf-form-control">
                <div className="form-element-wid">
                  <TextField
                    className="w100"
                    label="From Date"
                    id="outlined-start-adornment"
                    ref={calenderRef}
                    value={
                      coupon?.offerStartsAt &&
                      dateStringToYmd(coupon.offerStartsAt)
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
                  {fieldErrors["offerStartsAt"] !== "" && (
                    <p className="validation-error">
                      {fieldErrors["offerStartsAt"]}
                    </p>
                  )}
                </div>

                <div className="form-element-wid">
                  <TextField
                    className="w100"
                    label="To Date"
                    id="outlined-start-adornment2"
                    ref={calenderRef2}
                    value={
                      coupon?.offerEndAt && dateStringToYmd(coupon.offerEndAt)
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
                  {fieldErrors["offerEndAt"] !== "" && (
                    <p className="validation-error">
                      {fieldErrors["offerEndAt"]}
                    </p>
                  )}
                </div>
              </ListItem>
              <div style={{ marginTop: "7px" }}>
                <>
                  <button
                    type="button"
                    onClick={() => {
                      validateCoupon();
                    }}
                    style={{
                      width: "100%",
                      background: "#007bff",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                  >
                    Add Coupon
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

export default AddCoupon;
