import React, { useCallback, useState } from 'react'

function useGetExactToTime() {
    const [toTime, setToTime] = useState("");
    
    const getExactToTime = useCallback(
        (time, counter) => { 
          const [hours, minutes, period] = time
            .match(/(\d+):(\d+) ([ap]m)/)
            .slice(1);
          const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
          const newTotalMinutes = (totalMinutes + counter) % (12 * 60);
          const newHours = Math.floor(newTotalMinutes / 60);
          const newMinutes = newTotalMinutes % 60;
          const newPeriod =
            newTotalMinutes < totalMinutes
              ? period === "am"
                ? "pm"
                : "am"
              : period;
          const updatedTime = `${newHours === 0 ? 12 : newHours}:${String(
            newMinutes
          ).padStart(2, "0")} ${newPeriod}`;
          return updatedTime;
        },
        []
      );
      return { toTime, setToTime, getExactToTime }; // Return the state and the function

}

export default useGetExactToTime