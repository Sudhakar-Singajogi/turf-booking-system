import React, { useEffect, useRef } from "react";
import { useState } from "react";

import ReactDataTable from "../../MUI/ReactDataTable";

import "./BookedSlots.css";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import useBooking from "../../../CustomHooks/useBooking";
import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector } from "react-redux";

function BookedSlots() {
  const [startDate, setStartDate] = useState(new Date());
  const [slotsBooked, setSlotsBooked] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
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
      name: "Booked On",
      selector: (row) => row.bookedOn,
    },

    {
      name: "Booked Slot",
      selector: (row) => row.bookedSlot,
    },
  ];

  const { getBookedSlots } = useBooking();
  const checkSlotAvailable = () => {
    console.log("selected date and time is:", startDate);
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
    
    setShowLoader(true)

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
            bookedSlot: start + " to " + end,
          });
        });
      }
    }

    setTimeout(() => {
      setShowLoader(false)
      setSlotsBooked(arr);
    },300)

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

  return (
    <>
      <div className="date-time-picker-parent">
        <div className="stack-top left">Booked Slots</div>

        <div className="filter-sec">
          <div className="filter-opt">
            <div style={{ display: "flex" }}>
              <div className="mng-slot-header-col">
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

              <div className="mng-slot-header-col">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
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
                  </Select>
                </FormControl>
              </div>
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
    </>
  );
}

export default BookedSlots;
