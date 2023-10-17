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
import VisibilityIcon from '@mui/icons-material/Visibility';


function ManageSlots() {
  const [startDate, setStartDate] = useState(new Date());
  const [slotsBooked, setSlotsBooked] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [value, setValue] = React.useState(dayjs(new Date()));
  const [turf, setTurf] = React.useState("");
  const [venueTurfs, setVenueTurfs] = useState([]);

  const { admin } = useSelector((state) => state.venue);
  console.log("Turfs are  :", admin.turfs);

  const handleChange = (event) => {
    setTurf(event.target.value);
    getAllBookedSlots("", event.target.value);
  };

  const gotCoupons = useRef(false);

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
      selector: (row) => row.bookedOn,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button
          className="grid-btn-view"
          variant="contained"
          startIcon={<VisibilityIcon />}
          onClick={() => handleButtonClick(row)}
          style={{fontSize:'10px'}}
        >
          Details
        </Button>
      ),
    },
  ];

  const { getBookedSlots } = useBooking();
  const checkSlotAvailable = () => {
    console.log("selected date and time is:", startDate);
  };

  const handleButtonClick = (row) => {
    console.log("clicked on ", row);
  };

  useEffect(() => {
    console.log("slotsBooked are:", slotsBooked);
    let turfs = [];
    if (admin.turfs.length > 0) {
      let allTurfs = admin.turfs;
      console.log("admin.turfs", admin.turfs);
      allTurfs.map((turf) => {
        turfs.push({
          turfName: turf.turf_name,
          turfId: turf.turfId,
        });
      });

      setVenueTurfs(() => turfs);
    }
  }, [startDate, slotsBooked]);

  const getAllBookedSlots = async (selectedDate = "", selectedTurf = "") => {
    let obj = {};

    if (startDate !== "" && selectedDate !== "") {
      obj.bookedDate = selectedDate;
    } else {
      if (startDate !== "") {
        obj.bookedDate = startDate;
      }
    }

    if (startDate !== "") {
      obj.bookedDate = startDate;
    }

    if (selectedDate !== "") {
      obj.bookedDate = selectedDate;
    }

    if (turf !== "") {
      obj.turf_id = turf;
    }

    if (selectedTurf !== "") {
      obj.turf_id = selectedTurf;
    }

    obj.arena_id = admin.info.arena_id;

    let resp = await getBookedSlots(obj);
    console.log("Response is:", resp);

    let arr = [];
    if (resp.length > 0) {
      let slotsData = resp[0].data;
      console.log("booked slots are:", slotsData);

      if (slotsData.length > 0) {
        slotsData.map((item) => {
          let start = item.start;
          start = start.split(".");

          let end = item.end;
          end = end.split(".");

          let allTurfs = admin.turfs;
          const foundTurf = allTurfs.find((turf) => turf.turfId === item.turf);
          const turfName = foundTurf ? foundTurf.turf_name : "";

          start = start[0].slice(0, -3);
          end = end[0].slice(0, -3);

          arr.push({
            turf: turfName,
            bookedOn: obj.bookedDate,
            mobile: "84908081693",
          });
        });
      }
    }
    setSlotsBooked(arr);
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
    getAllBookedSlots(formattedDate);
  };

  const handleKeyPress = (e) => {
    const input = e.target.value;
    
    // Remove any non-numeric characters
    const numericValue = input.replace(/\D/g, '');    
    // Limit the input to 10 digits
    const truncatedValue = numericValue.slice(0, 10);    
    // Update the state with the sanitized value
    setMobileNumber(truncatedValue);

    if (input.length === 10) { 
          console.log("check the slots booked here"); 
      }

 
  };

  return (
    <>
      <div className="date-time-picker-parent">
        <div className="stack-top left">Manage Slots</div>
        <h2 className="dashboard-comp-title">Manage Slots</h2>

        <div className="filter-sec">
          <div className="filter-opt">
            <div style={{ display: "flex" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Booke Date"
                  value={value}
                  onChange={handleDateChange}
                  disablePast={true}
                />
              </LocalizationProvider>

              <FormControl style={{ marginLeft: "5px" }} fullWidth>
                <TextField
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

                {/* <InputLabel id="demo-simple-select-label">
                  Booked Turf
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={turf} // Set the selected value to the state variable
                  label="Turfs"
                  onChange={handleChange}
                >
                  {venueTurfs.map((turf) => (
                    <MenuItem key={turf.turfId} value={turf.turfId}>
                      {turf.turfName}
                    </MenuItem>
                  ))}
                </Select> */}
              </FormControl>
            </div>

            {/* <span className="booked-slot-search-icon">
              <SearchIcon onClick={() => checkSlotAvailable()} />
            </span> */}
          </div>
        </div>
        <div
          className="slots-booked-section"
          style={{ marginTop: "2rem", overflowX: "auto" }}
        >
          <ReactDataTable
            columns={columns}
            data={slotsBooked}
            selectableRows={false}
          />
        </div>
      </div>
    </>
  );
}

export default ManageSlots;
