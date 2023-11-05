import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useFormatDateYmd from "./useFormatDateYmd";
import { checkIsWeekEnd } from "../CustomLogics/customLogics";
import { postCall } from "../APIServices";
// import { getBookedSlots } from "../Redux/Slices/BokingSliceReducer";
function useBooking() {
  const { data } = useSelector((state) => state.booking);
  const { convertDateYmd } = useFormatDateYmd();

  const getBookingInfo = () => {
    const advPay = data.bookingamount * 0.3;
    let advPayRoundOff = Math.floor(advPay);
    let balance_amount =
      data.bookingamount - data.bookingamount * 0.3 + (advPay - advPayRoundOff);

    if (data.isFullPayment) {
      advPayRoundOff = data.bookingamount;
      balance_amount = 0;
    }

    const obj = {
      arena_id: data.venuedetails.arena_id,
      turfid: data.turf,
      gameid: data.game,
      booked_by: data.captain?.captainId,
      booked_on: convertDateYmd(data.bookeddate) + "",
      booked_at: data.timeslot,
      total_hrs: data.hrs,
      is_weekend: checkIsWeekEnd(data.bookeddate) ? "1" : "0",
      booking_cost: data.bookingamount,
      advance_payment: advPayRoundOff,
      balance_amount: balance_amount,
      status: "0",
      turf_cost: parseInt(data.turfcost),
      coupon_code: data.coupon_code,
      coupon_amount: data.coupon_amount,
    };
    console.log("booking object is: ", obj);
    return obj;
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

  const getBookedSlots = async (obj) => {
    let resp = await postCall("booking/get-booked-slots", JSON.stringify(obj));
    return validateResp(resp);
  };

  const getBookingOrders = async (obj) => {
    let resp = await postCall("booking/get-bookings-info", JSON.stringify(obj));
    return validateResp(resp);
  };

  const getBookingOrderDetails = async (obj) => {
    let resp = await postCall(
      "booking/get-bookings-order-details",
      JSON.stringify(obj)
    );
    return validateResp(resp);
  };

  const payBalAmount = async (obj) => {
    let resp = await postCall(
      "booking/pay-balance-amount",
      JSON.stringify(obj)
    );

    return validateResp(resp, "updateOrderAmount");
  };

  const cancelOrder = async (obj) => {
    let resp = await postCall(
      "booking/cancel-booking-order",
      JSON.stringify(obj)
    );

    return validateResp(resp, "cancelOrder");
  };

  const validateResp = async (resp, feature = "") => {
    resp = await resp.json();
    if (resp.resultCode === 200) {
      if (resp.resultTotal > 0 || resp.totalRows > 0) {
        console.log("Response Data is:", resp.data);
        return [resp.data];
      } else {
        if (resp.message === "Validation Errors") {
          let errs = resp.ValidationErrors;
          let validationErrors = [];
          let errors = [];

          if (feature === "updateOrderAmount" || feature === "cancelOrder") {
            errs.map((obj) => {
              if (obj.hasOwnProperty("Booking")) {
                validationErrors.push({
                  bookingError: obj.Booking,
                });
              } else if (obj.hasOwnProperty("order")) {
                validationErrors.push({
                  orderError: obj.order,
                });
              }
            });
          }

          if (validationErrors.lengrth > 0) {
            return (errors["validationErrors"] = validationErrors);
          }
          return [];
        }
        return [];
      }
    } else if (resp.responseCode === 403) {
      //do a local logs here
      console.log("Error message is:", resp.message);
    }

    return [];
  };

  return {
    getBookingInfo,
    getCaptainInfo,
    useCurrentBookedDate,
    getBookedSlots,
    getBookingOrders,
    getBookingOrderDetails,
    payBalAmount,
    cancelOrder,
  };
}

export default useBooking;
