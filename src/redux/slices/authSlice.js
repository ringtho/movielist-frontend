import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    registerInfo: {
      name: '',
      email: '',
      password: '',
    },
    loginInfo: {
      email: '',
      password: '',
    },
  },
  reducers: {
    setRegister: (state, action) => {
      state.registerInfo = action.payload
    },
    setLogin: (state, action) => {
      state.loginInfo = action.payload
    },
  },
})

export const { setRegister, setLogin } = authSlice.actions
export default authSlice.reducer
