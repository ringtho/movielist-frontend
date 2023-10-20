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
    reload: false
  },
  reducers: {
    setRegister: (state, action) => {
      state.registerInfo = action.payload
    },
    setLogin: (state, action) => {
      state.loginInfo = action.payload
    },
    setReload: (state, action) => {
      state.reload = action.payload
    }
  },
})

export const { setRegister, setLogin, setReload } = authSlice.actions
export default authSlice.reducer
