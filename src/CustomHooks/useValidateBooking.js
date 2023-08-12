import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkTurfAvailability,
  validateBookingForm,
} from "../Redux/Slices/BookingFormValidatorReducer";
import { useNavigate } from "react-router-dom";
import useDateTimeRealated from "./useDateTimeRealated";

function useValidateBooking() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.booking);
  const isAvailable = useSelector((state) => state.validateForm.isAvailable);
  const errors = useSelector((state) => state.validateForm.errors);
  const { convertDateYmd, convertDateTimeToMillSec, addHoursToTimeSlot } =
    useDateTimeRealated();

  const navigate = useNavigate();

  const validateBooking = async () => {
    let form_errors = {
      game_error: "",
      bookeddate_error: "",
      timeslot_error: "",
      hrs_error: 0,
      turf_error: "",
    };
    const slot = data;
    let hasError = false;

    console.log("slot are:", slot);

    if (slot.game === 0) {
      hasError = true;
      form_errors.game_error = "Please select a game";
    }

    if (slot.bookeddate.trim() === "") {
      hasError = true;
      form_errors.bookeddate_error = "Please select a date";
    } else {
      form_errors.bookeddate_error = "";
    }

    if (slot.timeslot.trim() === "") {
      hasError = true;
      form_errors.timeslot_error = "Please select a time slot";
    } else {
      form_errors.timeslot_error = "";
    }

    if (slot.turf === 0) {
      hasError = true;
      form_errors.turf_error = "Please select a turf";
    } else {
      form_errors.turf_error = "";
    }

    console.log("hours:", slot.hrs);

    if (slot.hrs > 0) {
      form_errors.hrs_error = "";
    } else {
      if (slot.timeslot.trim() !== "") {
        hasError = true;
        form_errors.hrs_error = "Please select duration";
      } else {
        form_errors.hrs_error = "";
      }
    }

    /**
     * check whether the turf is free on that time or not
     * Has to do a api call to check if the turf is free
     * */
    if (hasError) {
      dispatch(validateBookingForm(form_errors));
      console.log("form_errors", form_errors);
      return true;
    } else {
      const bookedAt = convertDateTimeToMillSec(
        convertDateYmd(slot.bookeddate) + " " + slot.timeslot
      );

      const bookedTill = convertDateTimeToMillSec(
        convertDateYmd(slot.bookeddate) +
          " " +
          addHoursToTimeSlot(slot.timeslot, slot.hrs)
      );

      let reqBody = {
        bookedAt: bookedAt,
        bookedTill: bookedTill,
        turf: slot.turf,
        arena_id: slot.venuedetails.arena_id,
      };

      dispatch(checkTurfAvailability(reqBody));
      if (isAvailable === false) {
        form_errors.turf_error = "Turf is not available during this time slot";
        dispatch(validateBookingForm(form_errors));
        return true;
      }
    }
  };

  const CheckAvailability = useCallback(() => {
    let form_errors = { ...errors };
    console.log("use effect ran");

    if (isAvailable === "") {
    } else if (isAvailable === false) {
      form_errors.turf_error = "Turf is not available during this time slot";
      dispatch(validateBookingForm(form_errors));
    } else {
      navigate("/confirm-slot");
    }
    dispatch(validateBookingForm(form_errors));
  }, [isAvailable]);

  return { validateBooking, CheckAvailability };
}

export default useValidateBooking;
