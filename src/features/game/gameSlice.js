import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "http://www.randomnumberapi.com/api/v1.0/random?min=1&max=100&count=1"

export const getWinningNumber = createAsyncThunk('game/getNumber', () => {
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error('error')
      }
      return res.json()
    })
    .catch((err) => console.log(err))
})

const initialState = {
  isLoading: true,
  error: false,
  highScore: null,
  overAllAvg: null,
  games: [],
  currentWinningNum: null,
  currentGameScore: 0,
  currentGuess: null,
  feedback: ''
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentGuess: (state, action) => {
      state.currentGuess = action.payload
    },
    clearCurrentGuess: (state) => {
      state.currentGuess = null;
    },
    increaseScore: (state) => {
      state.currentGameScore = state.currentGameScore + 1;
    },
    clearScore:(state)=> {
      state.currentGameScore = 0
    },
    increaseWins: (state) => {
      state.games.push({
        winningNumber: state.currentWinningNum,
        score: state.currentGameScore
      })
    },
    updateBestScore: (state) => {
      state.highScore = [...state.games].sort((a, b) => a.score - b.score)[0].score
    },
    updateOverallAvg: (state) => {
      const sum = state.games.reduce((total, game) => total + game.score, 0);
      state.overAllAvg = state.games.length > 0 ? sum / state.games.length : null;
    },
    updateFeedback: (state,action)=>{
      state.feedback = action.payload
    },
 },
 extraReducers: (builder) => {
  builder
    .addCase(getWinningNumber.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getWinningNumber.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentWinningNum = action.payload[0];
    })
    .addCase(getWinningNumber.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    })
}
})

export const { 
              setCurrentGuess,
              clearCurrentGuess, 
              increaseScore,
              clearScore,
              increaseWins,
              updateBestScore,
              updateOverallAvg,
              updateFeedback
            } =gameSlice.actions;
export default gameSlice.reducer