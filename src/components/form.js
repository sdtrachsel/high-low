import React from "react";
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
        from "../features/game/gameSlice";

export const Form = () => {
  const dispatch = useDispatch();
  const {  
          currentWinningNum, 
          currentGameScore,
          currentGuess,
          feedback
         } = useSelector((state) => state.game)


  const checkGuess = (event) => {
    event.preventDefault()
    dispatch(increaseScore())

    if(currentWinningNum === currentGuess){
      dispatch(updateFeedback('Winner!'))
      dispatch(increaseWins())
      dispatch(updateBestScore())
      dispatch(updateOverallAvg())
      dispatch(clearScore())
      setTimeout(() => {
        dispatch(updateFeedback(''));
        dispatch(getWinningNumber());
       
      }, 3000);

    } else {
      dispatch(updateFeedback(currentGuess > currentWinningNum ? 'Hi' : 'Lo'));
      setTimeout(() => {
        dispatch(updateFeedback(''));      
      }, 1500);
    }

    dispatch(clearCurrentGuess())         
  }

  return (
      <div className="form-container">
        <h2>Score: {currentGameScore}</h2>
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
        <p className="feedback">{feedback}</p>
      </div>
  );
}