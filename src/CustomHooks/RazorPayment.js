import axios from "axios";
import React, { useState } from "react";
import useBooking from "./useBooking";
import { useDispatch } from "react-redux";
import { turfbookedsuccessfully } from "../Redux/Slices/BookingFormValidatorReducer";
import { useNavigate } from "react-router-dom";
import { clearTurf } from "../Redux/Slices/BokingSliceReducer";

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
  const [orderId, setOrderId] = useState("");
  const { getBookingInfo, getCaptainInfo } = useBooking();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initiatePayment = async () => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      const resp = await fetch("http://192.168.0.111:8080/api/order/create-order", {
        method: "POST",
        body: JSON.stringify({ ...getBookingInfo() }),
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
      
      setOrderId(order_id);

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

          const result = await axios.post(
            "http://192.168.0.111:8080/api/order/success",
            data
          );
          
          dispatch(turfbookedsuccessfully(true))
          dispatch(clearTurf());
          navigate("/");
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
