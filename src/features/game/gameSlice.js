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
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentGuess: (state, action) => {
      state.currentGuess = action.payload
    },
    evaluateTurn: (state) => {
      if(state.currentGuess !== state.currentWinningNum){
        state.currentGameScore = state.currentGameScore + 1;
        state.currentGuess = null;
      } else {
        state.currentGameScore = state.currentGameScore +1
        state.games.push({
          winningNumber: state.currentWinningNum,
          score: state.currentGameScore
        })
      }
    },

  },
  extraReducers: {
    [getWinningNumber.pending]: (state) => {
      state.isLoading = true;
    },
    [getWinningNumber.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentWinningNum = action.payload
    },
    [getWinningNumber.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    }
  }
})

export const { setCurrentGuess, evaluateTurn } =
  gameSlice.actions;
export default gameSlice.reducer