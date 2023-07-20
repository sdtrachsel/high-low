import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dashboard } from "./components/dashboard";
import { Form } from "./components/form";
import { getWinningNumber } from "./features/game/gameSlice";

function App() {
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getWinningNumber());
  }, []);

  return (
    <div className="app">
      <h1 className="title">Hi-Lo</h1>
      <Form />
      <Dashboard />
    </div>
  );
}

export default App;