import React, { createContext, useContext, useState } from "react";
import { postCall } from "../APIServices";
import { useSelector } from "react-redux";
import useCoupons from "../CustomHooks/useCoupons";

export const context = createContext();

const ManageCouponContextProvider = ({ children }) => {
  const [allCoupons, setAllCoupons] = useState([]);
  const [coupon, setCoupon] = useState({});
  const { GetAllCouponsByArena } = useCoupons();

  const getAllCoupons = () => {
    console.log("all coupons are: ", GetAllCouponsByArena());
    setAllCoupons([])
  };

  const getACoupon = () => {
    setCoupon();
  };

  return (
    <context.Provider value={{getAllCoupons:getAllCoupons}}>
      {children}
    </context.Provider>
  );
};

export default ManageCouponContextProvider;
export const useManageCouponContext = () => useContext(context);
