import React from "react";
import { useState } from "react";

import ReactDataTable from "../../MUI/ReactDataTable";
import TextField from "@mui/material/TextField";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import "./BookedSlots.css";
import SearchIcon from '@mui/icons-material/Search';


const columns = [
  {
    name: "Turf",
    selector: (row) => row.turf,
    sortable: true,
  },
  {
    name: "Booked@",
    selector: (row) => row.bookedOn,
    sortable: true,
  },
  {
    name: "Game",
    selector: (row) => row.game,
    sortable: true,
  },
];

let array = new Array(10).fill("");

let games = ["Cricket", "Soccer", "Suttle", "Table Tennis"];

function getRandomGame() {
  const randomIndex = Math.floor(Math.random() * games.length);
  return games[randomIndex];
}

function generateRandomText(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomText = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }
  return randomText;
}

function generateRandomTimeToday() {
  const today = new Date();
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const seconds = Math.floor(Math.random() * 60);

  const timestamp = today.setHours(hours, minutes, seconds);
  const { date, time } = formatDateAndTime(timestamp);
  let startsAt = date + " " + time;

  const endtimestamp = today.setHours(hours + 1, minutes, seconds);
  const { date: dt, time: ti } = formatDateAndTime(endtimestamp);
  let endsAt = dt + " " + ti;

  return {
    startsAt,
    endsAt,
  };
}

function formatDateAndTime(timestamp) {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based, so we add 1
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format the date as "d/m/Y"
  const formattedDate = `${day}/${month}/${year}`;

  // Format the time as "hh:mm:ss"
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

let data = [];
// localStorage.setItem("slotsBooked", null);
const storedValue = localStorage.getItem("slotsBooked");

if (storedValue === null) {
  data = array.map((val, ind) => {
    const resp = generateRandomTimeToday();

    return {
      id: ind + 1,
      turf: generateRandomText(10),
      bookedOn: resp.startsAt + " to " + resp.endsAt.split(" ")[1],
      game: getRandomGame(),
    };
  });
  const arrayJSON = JSON.stringify(data);

  // Store the JSON string in localStorage with a specific key
  localStorage.setItem("slotsBooked", arrayJSON);
} else {
  const retrievedArrayJSON = localStorage.getItem("slotsBooked");
  // Parse the JSON string back into an array
  data = JSON.parse(retrievedArrayJSON);
}

function BookedSlots() {
  const [value, onChange] = useState(new Date());

  const checkSlotAvailable = () => {
    console.log('selected date and time is:', value);
  }


  return (
    <>
      <div className="date-time-picker-parent">
        <h2 className="dashboard-comp-title">Booked Slots</h2>

        <div className="filter-sec">
          <label>Filter by</label>
          <span className="booked-slot-search-icon">
          <SearchIcon onClick={() => checkSlotAvailable()} />
          </span>
          <DateTimePicker
            onChange={onChange}
            value={value}
            minDate={new Date()}
            style={{ border: "none" }}
          />
          
          

        </div>
        <div className="slots-bboked-section">
          <ReactDataTable 
          columns={columns} 
          data={data} 
          selectableRows={false}
           />
        </div>
      </div>
    </>
  );
}

export default BookedSlots;
