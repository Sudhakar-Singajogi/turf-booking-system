import React, { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFormatDateYmd from "./useFormatDateYmd";
import { getTuyfsByArena } from "../Redux/Slices/VenueSliceReducer";

function useVenue() {
  const dispatch = useDispatch();
  const{admin} = useSelector((state) => state.venue);
 
  const GetAllTurfsByArena = useCallback((arenaId) => {
    dispatch(getTuyfsByArena(arenaId));
  }, [dispatch]);

  const getSelectedTurf = () => {
    return admin.selectedTurf
  }

  return { GetAllTurfsByArena, getSelectedTurf };
}

export default useVenue;
