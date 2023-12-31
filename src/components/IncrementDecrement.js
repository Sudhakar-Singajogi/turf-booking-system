import React, {  useState } from "react";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import SILFieldSetComp from "./CustomComp/SILFieldSetComp";
import { calculateBookingCost, changeHrs } from "../Redux/Slices/BokingSliceReducer";
import { useDispatch, useSelector } from "react-redux";
import { validateBookingForm } from "../Redux/Slices/BookingFormValidatorReducer";

const DurationComp = ({ onDecrement, onIncrement }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.booking);
  const errors = useSelector((state) => state.validateForm.errors);
  const hours = data.hrs;

  // console.log(onIncrement)
  const [hrs, setHrs] = useState(1);

  const setHours = (type) => {
    if (data.timeslot !== "") {
      if (hours >= 3 & type === "inc") {
        let ers = {
          ...errors,
          hrs_error: "Not allowed to book for more than 3 hours",
        };
        dispatch(validateBookingForm(ers));
      } else {
        if (type === "inc") {
          console.log("hours are:", hrs);
          setHrs((prevHrs) => (prevHrs <= 3 ? prevHrs + 1 : prevHrs));
          dispatch(changeHrs(hrs + 1));
          let ers = {
            ...errors,
            hrs_error: "",
          };
          dispatch(validateBookingForm(ers));
        } else {
          if (hrs > 1) {
            setHrs((prevHrs) => prevHrs - 1);
            dispatch(changeHrs(hrs - 1));
            let ers = {
              ...errors,
              hrs_error: "",
            };
            dispatch(validateBookingForm(ers));
          }
        }
      }
      dispatch(calculateBookingCost())
    } else {
      let ers = {
        ...errors,
        hrs_error: "Please select a time slot",
      };
      dispatch(validateBookingForm(ers));
    }
  };

  return (
    <>
      <div className="incDec duration-comp">
        <RemoveCircleIcon
          style={{ color: (`${hours === 1 ? "#999" : "#003f84e0"}`) }} 
          onClick={(e) => {
            setHours("dec");
          }}
        />
        <span className="booked-hours">
          {hours} {hours <= 1 ? "Hr" : "Hrs"}
        </span>
        <AddCircleIcon
          style={{ color: "#003f84e0" }}
          className="inc"
          onClick={(e) => {
            setHours("inc");
          }}
        />
      </div>
    </>
  );
};

const IncrementDecrement = ({ onDecrement, onIncrement }) => {
  const [duration, setDuration] = useState(2);

  const handleIncrement = () => {
    setDuration((prevDuration) => prevDuration + 1);
    console.log("hk");
  };

  const handleDecrement = () => {
    if (duration > 1) {
      setDuration((prevDuration) => prevDuration - 1);
    }
  };

  return (
    <SILFieldSetComp
      insideComp={
        <DurationComp
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      }
      endAdornment={<TimelapseIcon />}
    />
  );
};

export default IncrementDecrement;
