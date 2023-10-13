import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL
console.log(API_URL)
const getHeaders = () => {
    return {
      headers: {
        'Content-Type': 'application/json',
    }}
}

export const registerUser = (data) => {
    const config = getHeaders()
    const user = axios.post(`${API_URL}/auth/register`, data, config)
    return user
}