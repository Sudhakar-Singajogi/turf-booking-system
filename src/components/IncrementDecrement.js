import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import SILFieldSetComp from "./CustomComp/SILFieldSetComp";
import { changeHrs } from "../Redux/Slices/BokingSliceReducer";
import { useDispatch, useSelector  } from "react-redux";
import { validateBookingForm } from "../Redux/Slices/BookingFormValidatorReducer";

const DurationComp = ({ onDecrement, onIncrement }) => {
  const dispatch = useDispatch();
  const {data} = useSelector(state=>state.booking)
  const errors = useSelector((state) => state.validateForm.errors); 
  const hours = data.hrs;

  // console.log(onIncrement)
  const [hrs, setHrs] = useState(0);

  const  setHours = (type) => {
    
    if(type === 'inc') { 
      setHrs((prevHrs) => prevHrs + 1);
      dispatch(changeHrs(hrs+1))
      let ers = {
        ...errors,
        hrs_error:''
      }
      dispatch(validateBookingForm(ers));


    } else {
      if(hrs > 0) {
        setHrs((prevHrs) => prevHrs - 1);
        dispatch(changeHrs(hrs-1))
        let ers = {
          ...errors,
          hrs_error:''
        }
        dispatch(validateBookingForm(ers));
      }
    }

  }
  
  
  return (
    <>
      <div className="incDec duration-comp">
        <RemoveCircleIcon
        style={{color:"#003f84e0"}}
          className="dec"
          onClick={(e) => { setHours('dec') }}
        />
        <span>{hours} {hours <= 1 ? "Hr" :"Hrs" }</span>
        <AddCircleIcon
        style={{color:"#003f84e0"}}
          className="inc"
          onClick={(e) => { setHours('inc') }}
        />
      </div>
    </>
  );
};

const IncrementDecrement = ({ onDecrement, onIncrement }) => {
  const [duration, setDuration] = useState(2);


  const handleIncrement = () => {
    setDuration((prevDuration) => prevDuration + 1);
    console.log('hk')
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
