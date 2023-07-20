import React from "react";
import { useSelector } from "react-redux";

export const Dashboard = () => {
  const { highScore,
    overAllAvg,
  } = useSelector((state) => state.game)

  return (
    <div className="dashboard">
      <p>Best Score: {highScore ? highScore : null} </p>
      <p>Overall Average Guesses: {overAllAvg ? overAllAvg : null}</p>
    </div>
  );
};