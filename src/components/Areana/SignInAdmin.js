import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLoaderContext } from "../../contexts/LoaderContextProvider";
import * as Yup from "yup"; // Import Yup
import { useDispatch, useSelector } from "react-redux";
import { doAdminLogin } from "../../Redux/Slices/VenueSliceReducer";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { SignInAdminSchema } from "../../validationSchema";

function SignInAdmin() {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
  });
  const { isLoading, setLoader } = useLoaderContext();
  const { admin } = useSelector((state) => state.venue);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (admin.invalidcredentals === false) {
      navigate("/admin/dashboard");
    } 
  }, [admin.invalidcredentals, navigate]); 

  return (
    <>
      <Formik
        initialValues={signUpForm}
        validationSchema={SignInAdminSchema}
        onSubmit={async (
          values,
          { setSubmitting, setFieldError, resetForm }
        ) => {
          try {
            await setLoader(true);
            await SignInAdminSchema.validate(values); 

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
            <button type="submit">Login</button>
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
