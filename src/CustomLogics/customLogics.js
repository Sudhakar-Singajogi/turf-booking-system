export const checkIsWeekEnd = (bookeddate) => {
    let currentDate = new Date();
  if (bookeddate !== "") {
    const [day, month, year] = bookeddate.split("/").map(Number);
    const jsDate = new Date(year, month - 1, day);
    currentDate = new Date(jsDate);
  }

  const dayOfWeek = currentDate.getDay();

  return dayOfWeek === 0 || dayOfWeek === 6;
  
  }