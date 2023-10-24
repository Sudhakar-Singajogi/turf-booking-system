import React, { useState } from "react";
import { useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";

function splitArrayIntoRows(arr, elementsPerRow) {
  const rows = [];
  for (let i = 0; i < arr.length; i += elementsPerRow) {
    const row = arr.slice(i, i + elementsPerRow);
    rows.push(row);
  }
  return rows;
}

function ShowTimeSlots(props) {
  const { onClose, open, disabledTimes } = props;
  const { data } = useSelector((state) => state.booking);
  console.log("booked date is:", data.bookeddate);

  const { admin } = useSelector((state) => state.venue);

  let isAdmin = admin?.info?.venueId ? true:false

  console.log('isAdmin: ', isAdmin)

  const handleClose = (value) => {
    onClose("");
  };

  let times = [];
  const startDate = new Date(0); // Initialize with the Unix epoch
  startDate.setUTCHours(0, 0, 0, 0); // Set the start time to midnight
  let dontallowtime = false;

  for (let i = 0; i <= 90; i++) {
    // 24 hours * 60 minutes / 30-minute intervals
    times.push(
      startDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
    startDate.setMinutes(startDate.getMinutes() + 15);
  }
  times = times.sort();

  console.log("times are:", times);
  times = splitArrayIntoRows(times, 29);

  console.log("disabledTimes areere: ", disabledTimes);

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
  const day = currentDate.getDate();

  let todayIs = `${year}-${month}-${day}`;
  let tday = `${day}/${month}/${year}`;

  const setSelectedTime = (timeSel) => {
    console.log("setSelectedTime: ", timeSel);
    onClose(timeSel);
  };

  return (
    <Dialog onClose={() => handleClose()} open={open} className="time-slot">
      <div className={`time-slot-container ${isAdmin === true ? "admin-time-picker-popup" :""}`} >
        {times.map((items) => {
          return (
            <div className="column">
              {items.map((item) => {
                console.log("item is:", item);

                if (item === "23:15") {
                  dontallowtime = true;
                }
                // return shouldShowTime(item, disabledTimes) && <div className="hour">{item}</div>;

                let isTimebtw = false;
                if (!dontallowtime) {
                  if (disabledTimes.length > 0) {
                    disabledTimes.map((bookedSlots) => {
                      const startTimeObj = new Date(
                        `${todayIs} ${bookedSlots.start}`
                      );

                      const endTimeObj = new Date(
                        `${todayIs} ${bookedSlots.end}`
                      );
                      const timeObj = new Date(`${todayIs} ${item}`);

                      // Check if time is between startTime and endTime
                      if (timeObj >= startTimeObj && timeObj <= endTimeObj) {
                        isTimebtw = true;
                      }
                    });
                  }
                }

                /**
                 *
                 * disable previous times if booked date is today
                 *
                 *
                 *
                 *  */

                console.log("Booked date:", data.bookeddate);
                console.log("today is:", tday);

                console.log(
                  "is selected date today:",
                  data.bookeddate === tday
                );

                if (data.bookeddate === tday) {
                  const currentDateTime = new Date();
                  const timeObj = new Date(`${todayIs} ${item}`);
                  if (currentDateTime >= timeObj) {
                    isTimebtw = true;
                  }
                }

                if (!dontallowtime) {
                  return !isTimebtw ? (
                    <div
                      className="hour"
                      onClick={() => {
                        setSelectedTime(item);
                      }}
                    >
                      {item}
                    </div>
                  ) : (
                    <div className="hour disabled">{item}</div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </Dialog>
  );
}
export default ShowTimeSlots;
