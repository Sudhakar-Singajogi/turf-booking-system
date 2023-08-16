export const convertDateDYM = (dateString) => {
  // const dateString = "Tue Aug 15 2023 00:00:00 GMT+0530 (India Standard Time)";

  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Get the day, month, and year from the Date object
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-based, so we add 1 to get the correct month
  const year = date.getFullYear();

  // Create the formatted date string in "d/m/Y" format
  return `${day}/${month}/${year}`;
};

export const getTimeformDateTime = (dateTimeStr) => {
  let dateTime = new Date(dateTimeStr);
  const dateTimeString = dateTime.toString();

  // Check if dateTimeString is a string
  if (typeof dateTimeString === "string") {
    // Use regex to extract the time from the date-time string
    const timeRegex = /(\d{2}:\d{2}:\d{2})/;
    const match = dateTimeString.match(timeRegex);

    // Check if a match is found
    if (match && match.length >= 2) {
      const timeString = match[1];

      // Convert time to AM/PM format
      const [hours, minutes, seconds] = timeString.split(":");
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 === 0 ? "12" : hours % 12;
      const timeInAMPM = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
      return timeInAMPM;
    }
  } else {
    return "select correct time";
  }
};


