import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import SILFieldSetComp from "./CustomComp/SILFieldSetComp";

const DurationComp = ({ duration, onDecrement, onIncrement }) => {
  const [hrs, setHrs] = useState(0);

  const  setHours = (type) => {
    
    if(type === 'inc') {
      setHrs((prevHrs) => prevHrs + 1);
    } else {
      if(hrs > 0) {
        setHrs((prevHrs) => prevHrs - 1);
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
        <span>{hrs} {hrs <= 1 ? "Hr" :"Hrs" }</span>
        <AddCircleIcon
        style={{color:"#003f84e0"}}
          className="inc"
          onClick={(e) => { setHours('inc') }}
        />
      </div>
    </>
  );
};

const IncrementDecrement = () => {
  const [duration, setDuration] = useState(2);

  const handleIncrement = () => {
    setDuration((prevDuration) => prevDuration + 1);
  };

  const handleDecrement = () => {
    if (duration > 1) {
      setDuration((prevDuration) => prevDuration - 1);
    }
  }; 

  return (
    <form>
      <SILFieldSetComp
        insideComp={
          <DurationComp
            duration={duration}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        }
        endAdornment={<TimelapseIcon />}
      />
    </form>
  );
};

export default IncrementDecrement;
