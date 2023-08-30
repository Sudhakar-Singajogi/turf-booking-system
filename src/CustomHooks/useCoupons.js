import React, { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFormatDateYmd from "./useFormatDateYmd";
import { getATurf, getTuyfsByArena } from "../Redux/Slices/VenueSliceReducer";
import { postCall } from "../APIServices";

function useCoupons() {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.venue);

  const GetAllCouponsByArena = async () => {
    let resp = await postCall("coupons/byareana", {
      arena_id: admin.info.arena_id,
    });
    resp = await resp.json();
    if (resp.resultCode === 200) {
      if (resp.resultTotal > 0) {
        console.log('coupons are:', resp.data)
        return resp.data;
      } else {
        return [];
      }
    }
    return [];
  };

  const GetACoupon = async (id) => {
    let resp = await postCall("coupons/getcoupon", {
      arena_id: admin.info.arena_id,
      coupon_id:id,
    });
    resp = await resp.json();
    console.log('coupons are:', resp);
    if (resp.resultCode === 200) {
      if (resp.totalRows > 0) { 
        return resp.data;
      } else {
        return [];
      }
    }
    return [];
  };

  return { GetAllCouponsByArena, GetACoupon };
}

export default useCoupons;
