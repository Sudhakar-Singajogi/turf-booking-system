import * as Yup from "yup";

export const SignInAdminSchema = Yup.object().shape({
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

export const SignUpAdminSchema = Yup.object().shape({
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

export const addEditTurfValidationSchema = Yup.object().shape({
  turf_name: Yup.string().required("Turf name is required"),
  areana_size: Yup.string().required("Turf Size is required"),
  weekdays_cost: Yup.number()
    .required("Weekdays Cost is required")
    .positive("Weekdays Cost must be a positive number")
    .typeError("Weekdays Cost must be a number"),
  weekends_cost: Yup.number()
    .required("Weekends Cost name is required")
    .positive("WeekendsCost must be a positive number")
    .typeError("Weekends Cost must be a number"),
});
