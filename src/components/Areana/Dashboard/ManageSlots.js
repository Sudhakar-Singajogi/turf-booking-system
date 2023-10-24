import React, { useEffect, useRef } from "react";
import { useState } from "react";

import ReactDataTable from "../../MUI/ReactDataTable";
import "./BookedSlots.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import useBooking from "../../../CustomHooks/useBooking";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MUIModal from "../../MUI/MUIModal";
import ManageSlotsPopup from "./ManageSlotsPopup";

import "../../Loader.css";

function ManageSlots() {
  const [startDate, setStartDate] = useState(new Date());
  const [slotsBooked, setSlotsBooked] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [value, setValue] = React.useState(dayjs(new Date()));
  const [mobile, setMobile] = React.useState("");
  const [open, setOpen] = useState(false);
  const [bookingOrderDetails, setBookingOrderDetails] = useState({});
  const { admin } = useSelector((state) => state.venue);
  const [showLoader, setShowLoader] = useState(false);

  const columns = [
    {
      name: "Turf",
      selector: (row) => row.turf,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
    },
    {
      name: "Booked On",
      // selector: (row) => row.bookedOn,
      cell: (row) => <div>{dayjs(row.bookedOn).format("YYYY-MM-DD")}</div>,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button
          className="grid-btn-view"
          variant="contained"
          startIcon={<VisibilityIcon />}
          onClick={() => handleButtonClick(row)}
          style={{ fontSize: "10px" }}
        >
          Details
        </Button>
      ),
    },
  ];

  const { getBookingOrders, getBookingOrderDetails } = useBooking();

  const handleButtonClick = async (row) => {
    console.log("clicked on ", row);
    console.log("arena_id:", admin.info.arena_id);
    //get the details of the slot
    setShowLoader(true);
    let bookingOrderDetails = await getBookingOrderDetails({
      bookingId: row.bookingId,
      arena_id: admin.info.arena_id,
    });

    if (bookingOrderDetails.length > 0) {
      let details = bookingOrderDetails[0];
      setBookingOrderDetails(details[0]);
    }
    setTimeout(() => {
      setShowLoader(false);
      setOpen(true);
    }, 300);
  };

  const handleClose = (paymentSuccess=false) => {
    console.log('paymentSuccess: ', paymentSuccess);
    setOpen(false);
    if (paymentSuccess !=='' && paymentSuccess === true) {
      getBookingInfo(dayjs(new Date(startDate)).format("YYYY-MM-DD"));
    }
  };

  useEffect(() => {
    getBookingInfo(dayjs(new Date(startDate)).format("YYYY-MM-DD"));
    console.log("slotsBooked are:", slotsBooked);
  }, []);

  const getBookingInfo = async (selectedDate = "", selectedMobile = "") => {
    let obj = {};

    if (startDate !== "" && selectedDate !== "") {
      obj.bookedDate = dayjs(selectedDate).format("YYYY-MM-DD");
    } else {
      if (startDate !== "") {
        obj.bookedDate = dayjs(startDate).format("YYYY-MM-DD");
      }
    }

    if (startDate !== "") {
      obj.bookedDate = dayjs(startDate).format("YYYY-MM-DD");
    }

    if (selectedDate !== "") {
      obj.bookedDate = dayjs(selectedDate).format("YYYY-MM-DD");
    }

    if (mobile !== "") {
      obj.contact_number = mobile;
    }

    if (selectedMobile !== "") {
      obj.contact_number = selectedMobile;
    }

    obj.arena_id = admin.info.arena_id;

    setShowLoader(true);

    let resp = await getBookingOrders(obj);
    console.log("Response is:", resp);

    let arr = [];
    if (resp.length > 0) {
      let slotsData = resp[0];
      console.log("booked slots are:", slotsData);

      if (slotsData.length > 0) {
        slotsData.map((item) => {
          arr.push({
            bookingId: item.bookingId,
            turf: item.turf,
            bookedOn: item.bookedOn,
            mobile: item.mobile,
          });
          console.log("booked info is:", arr);
        });
      }
    }

    setTimeout(() => {
      setShowLoader(false);
      setSlotsBooked(arr);
    }, 300);
    // setSlotsBooked([]);
  };

  const handleDateChange = (newValue) => {
    let newDate = new Date(newValue);

    const year = newDate.getFullYear();
    const month = newDate.getMonth(); // Note: Months are zero-based (0 = January, 1 = February, etc.)
    const day = newDate.getDate();

    // You can also format the date as a string
    const formattedDate = `${year}-${month + 1}-${day}`; // Adding 1 to the month to make it human-readable (1-based).
    setStartDate(() => formattedDate);

    console.log("Selected date:", formattedDate);
    getBookingInfo(formattedDate);
  };

  const handleKeyPress = (e) => {
    const input = e.target.value;

    // Remove any non-numeric characters
    const numericValue = input.replace(/\D/g, "");
    // Limit the input to 10 digits
    const truncatedValue = numericValue.slice(0, 10);
    // Update the state with the sanitized value
    setMobileNumber(truncatedValue);

    if (input.length === 10) {
      console.log("check the slots booked here");
      getBookingInfo("", input);
    } else if (input.length === 0) {
      getBookingInfo("", "");
    }
  };

  const loadComponent = () => {
    return (
      <ManageSlotsPopup
        compProps={bookingOrderDetails}
        handleClose={handleClose}
      />
    );
  };

  return ( 
    <>
      <div className="date-time-picker-parent">
        <div className="stack-top left">Manage Slots</div>

        <div className="filter-sec">
          <div className="filter-opt">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div className="mng-slot-header-col w30Per">
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Booke Date"
                      value={value}
                      onChange={handleDateChange}
                      disablePast={true}
                    />
                  </LocalizationProvider>
                </FormControl>
              </div>

              <div className="mng-slot-header-col w30Per flex-end">
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    value={mobileNumber}
                    id="outlined-basic"
                    label="Mobile Number"
                    variant="outlined"
                    onChange={handleKeyPress}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*", // Additionally, you can use a regular expression pattern to further restrict input
                    }}
                  />
                </FormControl>
              </div>
            </div>
          </div>
        </div>
        <div
          className="slots-booked-section"
          style={{ marginTop: "1rem", overflowX: "auto" }}
        >
          <hr style={{ border: "1px solid #d4cfcf" }} />
          {showLoader === false ? (
            <>
              <ReactDataTable
                columns={columns}
                data={slotsBooked}
                selectableRows={false}
              />
            </>
          ) : (
            <>
              <div className="centered-container">
                <div className="loader"></div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* <MUIModal adjustTop="35%" modalTitle="Manage Booked Slots" handleClose={handleClose}  open={open} component={<ManageSlotsPopup /> } modalpopupwidth="modal-md" closebtncls="mnge-slots-modal-close-btn" /> */}

      <MUIModal
        params={{
          adjustTop: "45%",
          modalTitle: "Manage Booked Slots",
          handleClose: handleClose,
          open: open,
          width: 1000,
          component: loadComponent,
          compLoaded: true,
          modalpopupwidth: "modal-md",
          closebtncls: "mnge-slots-modal-close-btn",
        }}
      />
    </>
  );
}

export default ManageSlots;
