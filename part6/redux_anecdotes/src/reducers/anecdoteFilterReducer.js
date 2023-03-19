import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const anecdoteFilterSlice = createSlice({
  name: 'anecdoteFilter',
  initialState,
  reducers: {
    setFilter(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { setFilter } = anecdoteFilterSlice.actions
export default anecdoteFilterSlice.reducer