import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Import Yup
import { useLoaderContext } from "../../contexts/LoaderContextProvider";
import { useDispatch } from "react-redux"; 
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack"; 

const baseURL = process.env.REACT_APP_apibaseURL;

function SignUpAdmin() {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    arena_name: "",
    arena_location: "",
    manager_name: "",
    password: "",
  });
  const { isLoading, setLoader } = useLoaderContext();
  console.log("useLoaderContext: ", useLoaderContext());
  const [emailExistChecked, setEmailExistChecked] = useState("");
  const [arenaCreated, setArenaCreated] = useState(false);

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email format"
      ),

    arena_name: Yup.string().required("Arena name is required"),
    manager_name: Yup.string().required("Manager name is required"),
    arena_location: Yup.string().required("Arena location is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, "Password must be alphanumeric"),
  });

  const signUpAdmin = async (values, setFieldError, resetForm) => {
    await setLoader(true);
    try {
      const resp = await fetch(`${baseURL}venue/create`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const jsonData = await resp.json();
      //   setLoader(false);
      if (jsonData.hasOwnProperty("totalRows")) { 
        resetForm();
        setArenaCreated(true);
      } else {
        setFieldError(
          "email",
          "Unable to create a new arena, kinldy check with admin"
        );
      }
    } catch (error) {
      return false;
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const resp = await fetch(`${baseURL}venue/email-exists`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const jsonData = await resp.json();
      //   setLoader(false);
      return jsonData.hasOwnProperty("totalRows") ? true : false;
    } catch (error) {
      return false;
    }
  };

  return (
    // <Formik
    //   initialValues={signUpForm}
    //   validationSchema={validationSchema}
    //   onSubmit={(values) => signUpAdmin(values)}
    // >
    <>
      <Formik
        initialValues={signUpForm}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setFieldError, resetForm }) => {
          setEmailExistChecked((prev) => "");

          try {
            await validationSchema.validate(values);

            await setLoader(true);
            setTimeout(async () => {
              const isEmailExists = await checkEmailExists(values.email);
              console.log("isEmailExists: ", isEmailExists);
              if (!isEmailExists) {
                const resp = await signUpAdmin(values, setFieldError, resetForm);
                console.log(resp);
              } else {
                setFieldError("email", "Email already exists");
              }
              setEmailExistChecked("checked");
              await setLoader(false);
            }, 200);
          } catch (errors) {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, values }) => (
          <Form sx={{ position: "relative" }}>
            <Stack sx={{ marginBottom: "1rem" }} spacing={2}>
              {arenaCreated === true ? (
                <>
                  <Alert
                    onClose={() => {
                      setArenaCreated(false);
                    }}
                    sx={{ fontWeight: "bold" }}
                    severity="success"
                  >
                    Arena created successfully.
                  </Alert>
                </>
              ) : (
                <></>
              )}
            </Stack>

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
            <label htmlFor="arena_name">Arena Name</label>
            <Field type="text" id="arena_name" name="arena_name" />
            <ErrorMessage
              name="arena_name"
              component="div"
              className="validation-error"
            />
            <label htmlFor="arena_location">Arena Location</label>
            <Field type="text" id="arena_location" name="arena_location" />
            <ErrorMessage
              name="arena_location"
              component="div"
              className="validation-error"
            />
            <label htmlFor="manager_name">Manager Name</label>
            <Field type="text" id="manager_name" name="manager_name" />
            <ErrorMessage
              name="manager_name"
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
          </Form>
        )}
      </Formik>
    </>
  );
}

export default SignUpAdmin;
