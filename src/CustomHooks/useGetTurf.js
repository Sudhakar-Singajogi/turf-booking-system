import React from "react";

function useGetTurf() {
  const getTurfName = (turfs, turfId) => {
    if (turfId > 0) {
      const turf = turfs.filter((i) => i.value === turfId);
      if (turf.length > 0) {
        return turf[0].label;
      }
    }
  };
  return { getTurfName };
}

export default useGetTurf;
