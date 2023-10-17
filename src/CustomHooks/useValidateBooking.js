import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkTurfAvailability,
  validateBookingForm,
} from "../Redux/Slices/BookingFormValidatorReducer";
import { useNavigate } from "react-router-dom";
import useDateTimeRealated from "./useDateTimeRealated";
import { postCall } from "../APIServices";
import { useLoaderContext } from "../contexts/LoaderContextProvider";

function useValidateBooking() {
  const dispatch = useDispatch();
  const { setLoader } = useLoaderContext();
  const { data } = useSelector((state) => state.booking);
  const isAvailable = useSelector((state) => state.validateForm.isAvailable);
  const errors = useSelector((state) => state.validateForm.errors);
  const { convertDateYmd, convertDateTimeToMillSec, addHoursToTimeSlot } =
    useDateTimeRealated();

  const navigate = useNavigate();

  const validateBooking = async (isAdmin) => {
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
    setLoader(true);
    if (hasError) {
      await dispatch(validateBookingForm(form_errors));
      console.log("form_errors", form_errors);
      setLoader(false);
      return true;
    } else {
      /*
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

      await dispatch(checkTurfAvailability(reqBody));
      if (isAvailable === false) {
        form_errors.turf_error = "Turf is not available during this time slot";
        dispatch(validateBookingForm(form_errors));
        return true;
      }
      */
      // if (!isAdmin) navigate("/booking/confirm");
    }
    setLoader(false);
  };

  const CheckAvailability = useCallback(async () => {
    let form_errors = { ...errors };
    console.log("use effect ran");

    if (isAvailable === "") {
    } else if (isAvailable === false) {
      form_errors.turf_error = "Turf is not available during this time slot";
      dispatch(validateBookingForm(form_errors));
    } else {
      // navigate("/booking/confirm");
    }
    setLoader(true);
    await dispatch(validateBookingForm(form_errors));
    setLoader(false);
  }, [isAvailable]);

  const isTurfAvailable = async (reqBody) => {
    let body = JSON.stringify({
      ...reqBody,
      arena_id: "r434edd09765457698asd",
    });

    let resp = await postCall("turf/exists", body);

    resp = await resp.json();
    if (resp.resultCode === 200) {
      if (resp.hasOwnProperty("ValidationErrors") && resp.ValidationErrors !== "" ) {
        console.log("coupons are:", resp.data);
        return [{ "exists" : false, "message": resp.ValidationErrors }];
      } else {
        return [];
      }
    }
    return [];
  };

  return { validateBooking, CheckAvailability, isTurfAvailable };
}

export default useValidateBooking;
