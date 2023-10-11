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
    bookedSlots: bookedSlotsData,
    
  };
};

export const validateAddEditTurfForm = (values) => {
  const newFieldErrors = {};
  const areana_size = values.areana_size;
  const turf_name = values.turf_name;
  const weekdays_cost = values.weekdays_cost;
  const weekends_cost = values.weekends_cost;

  let hasError = false;

  if (areana_size.trim() === "") {
    newFieldErrors["areana_size"] = "Arena Size is required";
    hasError = true;
  } else {
    newFieldErrors["areana_size"] = "";
  }

  if (turf_name.trim() === "") {
    newFieldErrors["turf_name"] = "Turf Name is required";
    hasError = true;
  } else {
    newFieldErrors["turf_name"] = "";
  }

  if (weekdays_cost === "") {
    newFieldErrors["weekdays_cost"] = "Weekdays Cost is required";
    hasError = true;
  } else {
    if (parseInt(weekends_cost) < 1) {
      newFieldErrors["weekdays_cost"] = "Weekdays Cost should greater than 0";
      hasError = true;
    } else {
      newFieldErrors["weekdays_cost"] = "";
    }
  }

  if (weekends_cost === "") {
    newFieldErrors["weekends_cost"] = "Weekends Cost is required";
    hasError = true;
  } else {
    if (parseInt(weekends_cost) < 1) {
      newFieldErrors["weekends_cost"] = "Weekends Cost should greater than 0";
      hasError = true;
    } else {
      newFieldErrors["weekends_cost"] = "";
    }
  }

  if (!hasError) {
    if (parseInt(weekdays_cost) > parseInt(weekends_cost)) {
      console.log(weekdays_cost);
      console.log(weekends_cost);
      newFieldErrors["weekends_cost"] =
        "Weekends Cost should greater than Weekdays Cost";
      hasError = true;
    } else {
      newFieldErrors["weekends_cost"] = "";
      hasError = false;
    }
  }

  if (!hasError) {
    if (parseInt(weekends_cost) < parseInt(weekdays_cost)) {
      newFieldErrors["weekends_cost"] =
        "Weekends Cost should greater than Weekdays Cost";
      hasError = true;
    }
  }

  return {
    fieldErrors: newFieldErrors,
    hasErrors: hasError,
  };
};

export const validateMobileNumber = (number) => {
  // Define a regular expression pattern for a 10-digit mobile number
  var pattern = /^[0-9]{10}$/;

  // Use the test method to check if the number matches the pattern
  return pattern.test(number);
}
