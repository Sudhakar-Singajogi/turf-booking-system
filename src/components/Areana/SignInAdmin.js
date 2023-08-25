import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLoaderContext } from "../../contexts/LoaderContextProvider";
import * as Yup from "yup"; // Import Yup
import { useDispatch, useSelector } from "react-redux";
import { doAdminLogin } from "../../Redux/Slices/VenueSliceReducer";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

function SignInAdmin() {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
  });
  const { isLoading, setLoader } = useLoaderContext();
  const { admin } = useSelector((state) => state.venue);
  console.log("admin data is:", admin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (admin.invalidcredentals === false) {
      console.log("login success");
      navigate("/admin/dashboard");
    } else {
      console.log("login Failed");
    }
  }, [admin.invalidcredentals, navigate]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email format"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, "Password must be alphanumeric"),
  });

  return (
    <>
      <Formik
        initialValues={signUpForm}
        validationSchema={validationSchema}
        onSubmit={async (
          values,
          { setSubmitting, setFieldError, resetForm }
        ) => {
          try {
            await setLoader(true);
            await validationSchema.validate(values); 

            dispatch(doAdminLogin(values)); 

            setTimeout(async () => {
              await setLoader(false);
            }, 500);
          } catch (errors) {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, values }) => (
          <Form sx={{ position: "relative" }}>
            <label htmlFor="userid">Email ID</label>
            <Field
              type="text"
              id="userid"
              name="email"
              onChange={handleChange}
            />
            {/* <ErrorMessage name="email" component="div" className="error" /> */}
            <ErrorMessage
              name="email"
              component="div"
              className="validation-error"
            />
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage
              name="password"
              component="div"
              className="validation-error"
            />
            <button type="submit">Register</button>
            {isLoading && (
              <>
                <div className="loader-container loader-container-absolute">
                  <div className="loader"></div>
                </div>
              </>
            )}

            <Stack sx={{ marginTop: "1rem", marginBottom: "1rem" }} spacing={2}>
              {admin.invalidcredentals === true ? (
                <>
                  <Alert sx={{ fontWeight: "bold" }} severity="error">
                    Please check your login credentials
                  </Alert>
                </>
              ) : (
                <></>
              )}
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default SignInAdmin;
