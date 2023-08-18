import React from "react";

function useFormatDateYmd() {
  const convertDateYmd = (dateString) => {
    const dateParts = dateString.split("/");
    const formattedDate = `${dateParts[2]}-${dateParts[1].padStart(
      2,
      "0"
    )}-${dateParts[0].padStart(2, "0")}`;
    return formattedDate
  };
  

  return {convertDateYmd}
}

export default useFormatDateYmd;
