import React, { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFormatDateYmd from "./useFormatDateYmd";
import { getATurf, getTuyfsByArena } from "../Redux/Slices/VenueSliceReducer";

function useVenue() {
  const dispatch = useDispatch();
  const{admin} = useSelector((state) => state.venue);
 
  const GetAllTurfsByArena = useCallback((arenaId) => {
    dispatch(getTuyfsByArena(arenaId));
  }, [dispatch]);

  const getSelectedTurf = async(id) => {
    
    return admin.selectedTurf
  }
  const getTurfErrorMsgs = () => {
    const errmsgs =  {
      "insert": admin.insertTurfMsg,
      "update": admin.updateTurfMsg,
      "delete": admin.deleteTurfMsg
    } 
    return errmsgs
  }

  return { GetAllTurfsByArena, getSelectedTurf, getTurfErrorMsgs };
}

export default useVenue;
