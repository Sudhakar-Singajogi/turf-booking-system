import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useEffect, useState } from "react";
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
    
    // remove the below two line once your testing with existing phone number in the database. and uncomment the signInWithPhoneNumber section

    // dispatch(getUserInfo(ph));
    // props.params.handleClose();


    

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
        //give a call to backend and check whether this contact is already exists or not
        if(!contactAvail) {
          dispatch(getUserInfo(ph));
        }
      })
      .catch((error) => {
        //below dispatch has to remove, as of now kept for debugging 
        dispatch(getUserInfo(ph));

        console.log(error);
        // toast.success("Failed to send OTP");
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
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
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
