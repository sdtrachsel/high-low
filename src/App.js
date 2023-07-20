import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
        getWinningNumber, 
        setCurrentGuess,
        clearCurrentGuess, 
        increaseScore,
        clearScore,
        increaseWins,
        updateBestScore,
        updateOverallAvg,
        updateFeedback
       } 
        from "./features/game/gameSlice";

function App() {
  const dispatch = useDispatch();
  const { isLoading, 
          error, 
          highScore, 
          overAllAvg, 
          games,  
          currentWinningNum, 
          currentGameScore,
          currentGuess,
          feedback
         } = useSelector((state) => state.game)

  useEffect(() => {
    dispatch(getWinningNumber());
  }, []);

  const checkGuess = (event) => {
    event.preventDefault()
    dispatch(increaseScore())


    if(currentWinningNum === currentGuess){
      //update to announce winner div
      dispatch(updateFeedback('Winner!'))
      dispatch(increaseWins())
      dispatch(updateBestScore())
      dispatch(updateOverallAvg())
      dispatch(clearScore())
      setTimeout(() => {
        dispatch(updateFeedback(''));
        dispatch(getWinningNumber());
       
      }, 1000);

    } else if(currentGuess > currentWinningNum) {
      dispatch(updateFeedback('High'))
    } else if(currentGuess < currentWinningNum){
      dispatch(updateFeedback('Low'))
    }

    dispatch(clearCurrentGuess())         
  }

  return (
    <div className="App">
      <h1>Hi-Lo</h1>
      <p>Winning Number: {currentWinningNum}</p>
      <div>
        <p>Best Score: {highScore? highScore: null} </p>
        <p>Overall Average Guesses: {overAllAvg? overAllAvg: null}</p>
      </div>
      <div>
        <h2>Current Score: {currentGameScore}</h2>
        <form onSubmit={(event)=> checkGuess(event)}>
          <label htmlFor="guess">Guess: </label>
          <input type="number" 
                 id="guess" 
                 name="guess"
                 min={1} 
                 max={100} 
                 value={currentGuess || ''}
                 onChange={(event) => dispatch(setCurrentGuess(Number(event.target.value)))}/>
          <input type="submit" value="Submit" />
        </form>
        <p>{feedback}</p>
      </div>

    </div>
  );
}

export default App;