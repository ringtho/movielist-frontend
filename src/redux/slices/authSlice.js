import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        registerInfo: {
            name: "",
            email: "",
            password: ""
        }
    },
    reducers: {
        setRegister: (state, action) => {
            state.registerInfo = action.payload
        }
    }
})

export const { setRegister } = authSlice.actions
export default authSlice.reducer
