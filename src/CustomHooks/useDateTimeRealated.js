import React from "react";

function useDateTimeRealated() {
  const convertDateTimeToMillSec = (dateTimeStr) => {
    // const dateString = "2023-08-12 6:30 am";
    console.log("dateTimeStr: ", dateTimeStr);
    const dateObject = new Date(dateTimeStr);
    const milliseconds = dateObject.getTime();
    return milliseconds;
  };

  const convertDateYmd = (dateString) => {
    const dateParts = dateString.split("/");
    const formattedDate = `${dateParts[2]}-${dateParts[1].padStart(
      2,
      "0"
    )}-${dateParts[0].padStart(2, "0")}`;
    return formattedDate;
  };

  const addHoursToTimeSlot = (timeslot, totalhrs) => {
    const timeParts = timeslot.split(":");
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1].split(" ")[0]);
    const ampm = timeParts[1].split(" ")[1];

    const date = new Date();
    date.setHours(ampm === "am" ? hours : hours + 12);
    date.setMinutes(minutes);

    const newDate = new Date(date.getTime() + totalhrs * 60 * 60 * 1000);

    const newHours = newDate.getHours();
    const newMinutes = newDate.getMinutes();
    const newAmPm = newHours < 12 ? "am" : "pm";
    const formattedTime = `${newHours % 12 || 12}:${newMinutes
      .toString()
      .padStart(2, "0")} ${newAmPm}`;

    return formattedTime;
  };

  const dateTimeToyearMonthDay = (dateString) => {
    // const dateString = "2023-10-01T14:23:20.000Z";
    const date = new Date(dateString);

    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const yr = date.getYear().toString().padStart(2, "0");
    // const formattedDate = `${yr}-${month}-${day}`;
    const formattedDate = `${month}-${day}`;

    return formattedDate;
  };

  const dateStringToYmd = (datestr) => {
    //example "Wed Aug 30 2023 00:00:00 GMT+0530 (India Standard Time)"
    const inputDate = new Date(datestr);

    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const day = inputDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    console.log(formattedDate); // Output: 2023-08-30
    return formattedDate;
  };

  const compareTwoDates = (date1, date2) => {
    const dateObject1 = new Date(date1);
    const dateObject2 = new Date(date2);
  
    if (dateObject1 > dateObject2) {
      return false;
    }
    return true;
  };

  return {
    convertDateTimeToMillSec,
    convertDateYmd,
    addHoursToTimeSlot,
    dateTimeToyearMonthDay,
    dateStringToYmd,
    compareTwoDates
  };
}

export default useDateTimeRealated;
