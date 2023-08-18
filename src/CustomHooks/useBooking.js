import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFormatDateYmd from "./useFormatDateYmd";
import { checkIsWeekEnd } from "../CustomLogics/customLogics";
import { getBookedSlots } from "../Redux/Slices/BokingSliceReducer";
function useBooking() {
  const { data } = useSelector((state) => state.booking);
  const { convertDateYmd } = useFormatDateYmd();

  const getBookingInfo = () => {
    return {
      arena_id: data.venuedetails.arena_id,
      turfid: data.turf,
      gameid: data.game,
      booked_by: data.captain?.captainId,
      booked_on: convertDateYmd(data.bookeddate) + "",
      booked_at: data.timeslot,
      total_hrs: data.hrs,
      is_weekend: checkIsWeekEnd(data.bookeddate) ? "1" : "0",
      booking_cost: data.bookingamount,
      advance_payment: data.bookingamount * 0.3,
      balance_amount: data.bookingamount - data.bookingamount * 0.3,
      status: 0,
    };
  };
  const getCaptainInfo = (fullInfo = false) => {
    let captain = data.captain;

    if (data.captain?.captainId) {
      captain = {
        name: data.captain.captain_name,
        email: data.captain.captain_name,
        contact: data.captain.captain_name,
      };
      if (fullInfo) {
        captain = {
          ...captain,
          captainId: data.captain.captainId,
          totalBookings: data.captain.total_bookings,
          earnedPoints: data.captain.earned_points,
        };
      }
    }
    return captain;
  };

  const useCurrentBookedDate = (bookedDate) => {
    const { convertDateYmd } = useFormatDateYmd();
    const currentTimeRef = useRef(new Date());
    const prevBookedDateRef = useRef(null);

    useEffect(() => {
      if (prevBookedDateRef.current !== bookedDate) {
        console.log("effect ran");
        const getCurrentBookedDate = (dateString) => {
          const currentDate = new Date();
          const day = currentDate.getDate();
          const month = currentDate.getMonth() + 1;
          const year = currentDate.getFullYear();
          const today = `${year}/${month}/${day}`;

          if (dateString !== "") {
            const newDate = new Date(convertDateYmd(dateString));
            const newDay = newDate.getDate();
            const newMonth = newDate.getMonth() + 1;
            const newYear = newDate.getFullYear();
            const selectedDay = `${newYear}/${newMonth}/${newDay}`;

            if (selectedDay !== today) {
              return new Date(`${convertDateYmd(dateString)} 00:00:00 am`);
            }
            return new Date();
          }

          return new Date();
        };

        console.log("previous vakue is:", prevBookedDateRef.current);
        currentTimeRef.current = getCurrentBookedDate(bookedDate);
        prevBookedDateRef.current = bookedDate;
        console.log("current vakue is:", prevBookedDateRef.current);
      }
    }, [bookedDate]);

    return currentTimeRef.current;
  };

  return {
    getBookingInfo,
    getCaptainInfo,
    getBookedSlots,
    useCurrentBookedDate,
  };
}

export default useBooking;
