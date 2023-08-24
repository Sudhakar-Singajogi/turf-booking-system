import React, { useContext, useState } from "react";
import { Box, Divider } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { context } from "../../contexts/context";
import { Link } from "react-router-dom";
import { useDrawerCloseContext } from "../../contexts/DrawerCloseBtn";
import SignUpAdmin from "./SignUpAdmin";
import SignInAdmin from "./SignInAdmin";

const currentUrl = window.location.href;
let loginForm = false;
let forgotpwd = false;
let registration = false;

if (
  currentUrl === "http://localhost:3000/arena-login" ||
  currentUrl === "http://192.168.0.111:3000/arena-login"
) {
  loginForm = true;
}

if (
  currentUrl === "http://localhost:3000/arena-register" ||
  currentUrl === "http://192.168.0.111:3000/arena-register"
) {
  registration = true;
}
function LoginDrawerComponent() {
  console.log("registration: ", loginForm);
  const [showLoginForm, setShowLoginForm] = useState(loginForm);
  const [resetPwdForm, setResetPwdForm] = useState(forgotpwd);
  const [showSignUpForm, setShowSignUpForm] = useState(registration);

  // const { closeDrawer } = useContext(context);
  const { closeDrawer } = useDrawerCloseContext();
  const handleCloseDrawer = () => {
    closeDrawer(false);
  };




  return (
    <>
      <Box className="drawer-component" role="presentation">
        <div className="login-header">
          <span className="drawer-close-btn" onClick={handleCloseDrawer}>
            {" "}
            <CancelIcon />
          </span>
          <h2 style={{ fontSize: "1.5rem" }}>
            {showLoginForm ? "Sign In" : null}
            {resetPwdForm ? "Forgot Password" : null}
            {showSignUpForm ? "Arena Sign Up" : null}
          </h2>
          <Divider />
        </div>

        <div className="login-content">
          {showLoginForm ? (
            <>
              <SignInAdmin />
            </>
          ) : null}

          {resetPwdForm ? (
            <>
              <form>
                <label htmlFor="userid">Enter Email ID</label>
                <input
                  type="text"
                  id="userid"
                  placeholder="Enter your Email ID"
                  required
                />

                <button type="submit">Reset Password</button>
              </form>
            </>
          ) : null}

          {showSignUpForm ? ( 
            <SignUpAdmin />
          ) : null}

          <Divider />
          <div className="login-links">
            {showLoginForm ? (
              <>
                <Link
                  path=""
                  onClick={() => {
                    setResetPwdForm(true);
                    setShowLoginForm(false);
                    setShowSignUpForm(false);
                  }}
                >
                  Forgot Password?
                </Link>
              </>
            ) : null}

            {resetPwdForm ? (
              <Link
                path=""
                onClick={() => {
                  setResetPwdForm(false);
                  setShowLoginForm(true);
                  setShowSignUpForm(false);
                }}
              >
                Sign In
              </Link>
            ) : null}

            {showLoginForm || resetPwdForm ? (
              <>
                <span>|</span>
                <Link
                  path=""
                  onClick={() => {
                    setResetPwdForm(false);
                    setShowLoginForm(false);
                    setShowSignUpForm(true);
                  }}
                >
                  Sign Up?
                </Link>
              </>
            ) : null}

            {showSignUpForm ? (
              <>
                <Link
                  path=""
                  onClick={() => {
                    setResetPwdForm(false);
                    setShowLoginForm(true);
                    setShowSignUpForm(false);
                  }}
                >
                  Sign In?
                </Link>

                <span>|</span>
                <Link
                  path=""
                  onClick={() => {
                    setResetPwdForm(true);
                    setShowLoginForm(false);
                    setShowSignUpForm(false);
                  }}
                >
                  Forgot Password?
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </Box>
    </>
  );
}

export default React.memo(LoginDrawerComponent);
