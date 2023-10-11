import React, { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFormatDateYmd from "./useFormatDateYmd";
import { getATurf, getTuyfsByArena } from "../Redux/Slices/VenueSliceReducer";
import { postCall } from "../APIServices";

function useCaptain() {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.venue);

  const GetCaptainDetails = async (captain_contact) => {
    let resp = await postCall("captain/details", {
      captain_contact: captain_contact,
    });

    resp = await resp.json();
    if (resp.resultCode === 200) {
      if (resp.totalRows > 0) {
        console.log("coupons are:", resp.data);
        return [{ captainInfo: resp.data }];
      } else {
        return [];
      }
    }
    return [];
  };

  const createCaptain = async (captainObj) => {
    let resp = await postCall("captain/create", captainObj);
    resp = await resp.json();

    if (resp.data.length === 0 && resp.message === "Failed to create captain") {
      resp.resultCode = 501;
      return resp;
    }

    if (resp.resultCode === 200) {
      return resp.data;
    }
    return [];
  };

  return { GetCaptainDetails, createCaptain };
}

export default useCaptain;
