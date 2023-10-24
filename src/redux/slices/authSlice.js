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
    reload: false,
    user: {
      name: '',
      email: '',
      profileImg: ''
    }
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
    },
    setUser: (state, action) => {
      state.user = action.payload
    }
  },
})

export const { 
  setRegister, 
  setLogin, 
  setReload, 
  setUser 
} = authSlice.actions
export default authSlice.reducer
