/*import axios from "axios";
import React, { useState } from "react";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
const {initializeApp} = require("firebase/app");  

const firebaseConfig = {
  apiKey: "AIzaSyAalAjOW-GarzGQ68xNAsopzUTpXwOnlS0",
  authDomain: "sil-sport-zone.firebaseapp.com",
  projectId: "sil-sport-zone",
  storageBucket: "sil-sport-zone.appspot.com",
  messagingSenderId: "105124115586",
  appId: "1:105124115586:web:f79a09d083053f3685309b",
  measurementId: "G-BZ33T1JBCE"
};

const app = initializeApp(firebaseConfig); 

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

function LoginComponent({showOTP, setShowOTP, setShowVisibilityForm, showVisibilityForm}) {
    const [orderId, setOrderId] = useState("");
    const auth = getAuth(app);
    
    const initiatePayment = async () => {
        try {
          const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
          );
    
          if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
          }
          const resp = await fetch("http://127.0.0.1:8080/api/razor/create-order", {
            method: "POST",
          });
          if (!resp.result === "OK") {
            throw new Error("Failed to get response, contact admin");
          }
          const response = await resp.json();
          console.log("resp data: ", response.data[0]);
    
          const { order_id, amount } = response.data[0];
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
              }; 

              const result = await axios.post(
                "http://127.0.0.1:8080/api/razor/success",
                data
              );
    
              alert(result.data.message);
            },
            prefill: {
              name: "Soumya Dey",
              email: "SoumyaDey@example.com",
              contact: "9999999999",
            },
            notes: {
              address: "Soumya Dey Corporate Office",
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
  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="left-section">
            <img
              src="https://c7.alamy.com/comp/2F4TF5W/four-happy-kids-playing-characters-2F4TF5W.jpg"
              alt="Graphic"
              className="graphic-image"
            />
          </div>
          <div className="right-section">
            <form style={{ marginTop: "1rem" }}>
              {!showOTP ? (
                <>
                  <h4>Login</h4>
                  <input type="text" placeholder="Enter mobile number" /> 
                  <button
                    className="send-otp-btn"
                    onClick={(e) => {
                    //   setShowOTP(true);
                    //   setShowVisibilityForm(true);
                    console.log('auth is:  ', auth)
                      e.preventDefault();
                    }}
                  >
                    Send OTP
                  </button>
                </>
              ) : (
                <>
                  <div className="register-user">
                    <h4 style={{ marginBottom: "0.5rem" }}>
                      Enter OTP {showVisibilityForm}
                    </h4>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      style={{ marginBottom: "1rem" }}
                    />
                    {showVisibilityForm ? (
                      <div>
                        <h4>Register your visibility</h4>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your full name"
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter email id"
                        />
                      </div>
                    ) : (
                      ""
                    )}

                    <button
                      className="validate-otp"
                      onClick={(e) => {
                        setShowOTP(true);
                        initiatePayment();
                        e.preventDefault();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
*/

import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useEffect, useState, useCallback } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewCaptain,
  getUserInfo,
} from "../Redux/Slices/BokingSliceReducer";

const LoginComponent = (props) => {
  console.log('props are: ', props )
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [user, setUser] = useState(null);
  const [contactAvail, setContactAvail] = useState(false);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.booking);
  const captain = data.captain;

  useEffect(() => {
    setContactAvail((prev) => captain.hasOwnProperty("captain_contact"));
    console.log("Captain is:", data);
    console.log("user is:", user);
    console.log("contact is avail:", data.isCaptainExists);
  }, [data.isCaptainExists, user]);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            OnSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  const OnSignup = () => {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph; 
    
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
        //give a call to backend and check whether this contact is already exists or not
        dispatch(getUserInfo(ph));
      })
      .catch((error) => {
        dispatch(getUserInfo(ph));
        console.log(error);
        setLoading(false);
      }); 
  };

  function onOTPVerify() {
    setLoading(true);
    console.log("phone is: ", ph);

    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        //if user not exists already then we have to create a new user
        //call the api to create a new user
        if (data.isCaptainExists === false) {
          let teamcaptain = {
            captain_name: userName,
            captain_email: userEmail,
            captain_contact: ph,
            status: 1,
          };

          dispatch(createNewCaptain(teamcaptain));
        }

        setUser(data.captain);
        setLoading(false);
        props.params.handleClose();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍Login Success
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4 mar-tp30">
            {showOTP ? (
              <>
                <label htmlFor="otp" className="font-bold text-xl">
                  Enter your OTP{" "}
                  {contactAvail === false ? " to signup" : " to login"}
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                {contactAvail === false && (
                  <>
                    <div>
                      {/* <h4>Register your visibility</h4> */}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your full name"
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter email id"
                        onChange={(e) => setUserEmail(e.target.value)}
                      />
                    </div>
                  </>
                )}

                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                {/* <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label> */}
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button
                  onClick={() => OnSignup("+" + ph)}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LoginComponent;
