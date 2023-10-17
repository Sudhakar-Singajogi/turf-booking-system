import React, { createContext, useContext, useState } from "react";
import { postCall } from "../APIServices";
import { useSelector } from "react-redux";

export const context = createContext();
const SportsToTurfContextProvider = ({ children }) => {
  const [turfId, setTurfId] = useState(0);
  const [turfAddMsg, setTurfAddMsg] = useState("");
  const [sportsByTurf, setSportsByTurf] = useState([]);
  const { admin } = useSelector((state) => state.venue);

  const getSportsByTurf = async (turfid) => {
    if (turfid < 1) {
      setTurfId(() => 0);
      setSportsByTurf([]);
      setTurfAddMsg("")
      return "";
    }
    setTurfId(() => turfid);
    const apiResp = await postCall("turf/sports", JSON.stringify({
      arena_id: admin.info.arena_id,
      turfid: turfid,
    }));

    setSportsByTurf([]);
    const response = await apiResp.json();
    console.log("status:", response);
    if (response.resultCode === 200) {
      if (response.resultTotal > 0) {
        setSportsByTurf(() => response.data);
      }
    }
  };

  const updateSportToTurf = async (selectedSports) => {
    let sprts = [];
    let obj = { arena_id: admin.info.arena_id, sports: [] };

    selectedSports.map((sport) => {
      return sprts.push({ sport: sport, turfid: turfId });
    });
    obj.sports = sprts;
    obj = JSON.stringify(obj);
    let apiResp = await postCall("turf/addsports", obj);
    // console.log("status:", await apiResp.json());
    apiResp = await apiResp.json();
    if (apiResp.resultCode === 200) {
        setTurfAddMsg("Sports added successfully")
    } else {
        setTurfAddMsg("Failed to add Sports")
    }
  };

  return (
    <context.Provider
      value={{ turfId, getSportsByTurf, sportsByTurf, updateSportToTurf, turfAddMsg, setTurfAddMsg }}
    >
      {children}
    </context.Provider>
  );
};
export default SportsToTurfContextProvider;

export const useSportsToTurfContext = () => useContext(context);
