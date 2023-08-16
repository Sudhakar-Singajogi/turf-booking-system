import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkTurfAvailability,
  validateBookingForm,
} from "../Redux/Slices/BookingFormValidatorReducer";
import { useNavigate } from "react-router-dom";
import useFormatDateYmd from "./useFormatDateYmd";
import { checkIsWeekEnd } from "../CustomLogics/customLogics";
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
      is_weekend: checkIsWeekEnd(data.bookeddate)? "1" : "0",
      booking_cost: data.bookingamount,
      advance_payment:data.bookingamount* 0.3,
      balance_amount:(data.bookingamount - data.bookingamount * 0.3),
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
          captainId:data.captain.captainId,
          totalBookings: data.captain.total_bookings,
          earnedPoints: data.captain.earned_points,
        };
      }
    }
    return captain;
  };

  return { getBookingInfo, getCaptainInfo };
}

export default useBooking;
