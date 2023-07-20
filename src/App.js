import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWinningNumber, setCurrentGuess, evaluateTurn } from "./features/game/gameSlice";

function App() {
  const dispatch = useDispatch();
  const { highScore, overAllAvg, games, currentGameScore, isLoading, error, currentWinningNum } = useSelector((state) => state.game)

  useEffect(() => {
    dispatch(getWinningNumber());
  }, []);

  const checkGuess = (event) => {
    event.preventDefault()
    dispatch(evaluateTurn())
    console.log('check')
  }

  return (
    <div className="App">
      <h1>Hi-Lo</h1>
      <p>Winning Number: {currentWinningNum}</p>
      <div>
        <p>High Score: {highScore} </p>
        <p>Overall Avg: {overAllAvg}</p>
        <p>Number of Games: {games.length}</p>
      </div>
      <div>
        <h2>Current Score: {currentGameScore}</h2>
        <form onSubmit={(event)=> checkGuess(event)}>
          <label htmlFor="guess">Guess: </label>
          <input type="number" id="guess" name="guess" min={1} max={100} onChange={(event) => dispatch(setCurrentGuess(event.target.value))}/>
          <input type="submit" value="Submit" />
        </form>
        <p>Answer Feedback</p>
      </div>

    </div>
  );
}

export default App;
