import React from "react";
import { useSelector, useDispatch } from "react-redux";

const baseURL = process.env.REACT_APP_apibaseURL;
function useManageTurfs() {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.venue);

  const getAllTurfsByArena = async (arena_id) => {
    try {
      const resp = await fetch(`${baseURL}turf/byareana`, {
        method: "POST",
        body: JSON.stringify({ arena_id: arena_id }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!resp.result === "OK") {
        // throw new Error("Failed to get response, contact admin");
        return {
          success: false,
          message: "Failed to get response, contact admin",
        };
      }
      const data = await resp.json();
      return {
        success: true,
        message: "Fetch all turfs successfully",
        data: data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to get response, contact admin",
      };
    }
  };

  const updateTurf = async (turf) => {
    try {
      const arena_id = admin.info.arena_id;
      const turfObj = { ...turf };

      turfObj.arena_id = arena_id;

      console.log(turfObj);

      const resp = await fetch(`${baseURL}turf/update`, {
        method: "POST",
        body: JSON.stringify(turfObj),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!resp.result === "OK") {
        return {
          success: false,
          message: "Failed to update turf, kindly contact admin",
        };
      }
      const response = await resp.json();
      console.log("turf detail is: ", response);
      if (response.message === "Query Success") {
        return {
          success: true,
          message: "Turf Updated successfully",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Failed to update turf, kindly contact admin",
      };
    }
  };

  const deleteTurf = async (turfId) => {
    try {
      const arena_id = admin.info.arena_id;
      const turfObj = { turfId: turfId, arena_id: arena_id };

      const resp = await fetch(`${baseURL}turf/delete`, {
        method: "POST",
        body: JSON.stringify(turfObj),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!resp.result === "OK") { 
        return {
          success: false,
          message: "Failed to delete turf, contact admin",
        };
      }
      const response = await resp.json();
      if (response.message === "Query Success") { 
        return {
          success: true,
          message: "Turf deleted successfully",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Failed to delete turf, contact admin",
      };
    }
  };
  return { updateTurf, getAllTurfsByArena, deleteTurf };
}

export default useManageTurfs;
