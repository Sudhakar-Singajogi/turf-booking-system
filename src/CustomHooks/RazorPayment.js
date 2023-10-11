import axios from "axios";
import React, { useState } from "react";
import useBooking from "./useBooking";
import { useDispatch, useSelector } from "react-redux";
import { turfbookedsuccessfully } from "../Redux/Slices/BookingFormValidatorReducer";
import { useNavigate } from "react-router-dom";
import { clearTurf } from "../Redux/Slices/BokingSliceReducer";

const baseURL = process.env.REACT_APP_apibaseURL;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function RazorPayment() {
  const { getBookingInfo, getCaptainInfo } = useBooking();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: bookingData } = useSelector((state) => state.booking);
  console.log("bookingData: ", bookingData);

  const initiatePayment = async (isAdmin, paymentobj = "") => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      const resp = await fetch(`${baseURL}order/create-order`, {
        method: "POST",
        body: paymentobj === "" ? JSON.stringify({ ...getBookingInfo() }) : JSON.stringify(paymentobj),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!resp.result === "OK") {
        throw new Error("Failed to get response, contact admin");
      }
      const response = await resp.json();
      console.log("resp data: ", response.data[0]);

      const { order_id, amount, bookingid, orderId } = response.data[0];

      console.log("amount is: ", amount);

      const options = {
        key: "rzp_test_kvq0flV7YLPMFu", // Enter the Key ID generated from the Dashboard
        amount: amount,
        name: "Sonet Info Labs.",
        description: "Test Transaction",
        image: "",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            bookingid: bookingid,
            orderId: orderId,
          };

          const result = await axios.post(`${baseURL}order/success`, data);

          dispatch(turfbookedsuccessfully(true));
          dispatch(clearTurf());
          console.log(
            "redirecting fro here: ",
            bookingData.venuedetails.arena_id
          );

          if (isAdmin !== true) {
            navigate("/booking?venueid=" + bookingData.venuedetails.arena_id);
          } else {
            navigate("/admin/dashboard");
          }
        },
        prefill: { ...getCaptainInfo(false) },
        // prefill: userInfo,
        notes: {
          address: "",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return { initiatePayment };
}

export default RazorPayment;
