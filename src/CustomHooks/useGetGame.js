import React from "react";

function useGetGame() {
  const getGameName = (games, gameId) => {
    if (gameId > 0) {
      const sport = games.filter((i) => i.value === gameId);
      if (sport.length > 0) {
        return sport[0].label;
      } else {
        return "";
      }
    }
  };
  return {getGameName}
}

export default useGetGame
