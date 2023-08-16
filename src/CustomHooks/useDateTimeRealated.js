import React from "react";

function useDateTimeRealated() {
  const convertDateTimeToMillSec = (dateTimeStr) => {
    // const dateString = "2023-08-12 6:30 am";
    console.log('dateTimeStr: ', dateTimeStr);
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

  
  return { convertDateTimeToMillSec, convertDateYmd, addHoursToTimeSlot};
}

export default useDateTimeRealated;
