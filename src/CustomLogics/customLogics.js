import { useCallback } from "react";

 export const checkIsWeekEnd = (bookeddate) => {
  let currentDate = new Date();
  if (bookeddate !== "") {
    const [day, month, year] = bookeddate.split("/").map(Number);
    const jsDate = new Date(year, month - 1, day);
    currentDate = new Date(jsDate);
  }

  const dayOfWeek = currentDate.getDay();

  return dayOfWeek === 0 || dayOfWeek === 6;
};

export const bookedSlots = (slots, bookeddate) => { 
  const bookedSlotsData = slots.map((slot) => {
    let strt = slot.start.split(":");
    let end = slot.end.split(":");

    return {
      start: new Date(bookeddate).setHours(strt[0], strt[1], 0),
      end: new Date(bookeddate).setHours(end[0], end[1], 59),
    };
  });

  console.log("booked Slots: ", bookedSlots);

  const disabledTimes = bookedSlotsData.map((slot) => {
    return {
      start: new Date(slot.start),
      end: new Date(slot.end),
    };
  });

  console.log("disabledTimes: ", disabledTimes);

  const disabledIntervals = slots.map((slot) => {
    let strt = slot.start.split(":");
    let end = slot.end.split(":");

    return {
      start: new Date(bookeddate).setHours(strt[0], strt[1], 0),
      end: new Date(bookeddate).setHours(end[0], end[1], 59),
    };
  });

  return {
    disabledIntervals,
    disabledTimes,
    bookedSlots:bookedSlotsData,
  }; 
}