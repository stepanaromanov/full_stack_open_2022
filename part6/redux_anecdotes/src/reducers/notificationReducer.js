import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload;
    }
  }
})

export const createNotifMessage = (message, time) => {
    let expire = null
    return async (dispatch) => {
      dispatch(setMessage(message))
      if (expire) {
        clearTimeout(expire)
      }
      expire = setTimeout(() => dispatch(setMessage(null)), time * 1000)
    }
}

export const { setMessage } = notificationSlice.actions
export default notificationSlice.reducer




