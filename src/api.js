import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL
const getHeaders = () => {
    return {
      headers: {
        'Content-Type': 'application/json',
    }}
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('movieToken')
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }
}

export const registerUser = (data) => {
    const config = getHeaders()
    const user = axios.post(`${API_URL}/auth/register`, data, config)
    return user
}

export const loginUser = (data) => {
    const config = getHeaders()
    const user = axios.post(`${API_URL}/auth/login`, data, config)
    return user
}

export const getMovies = () => {
    const config = getAuthHeaders()
    const users = axios.get(`${API_URL}/movies`, config)
    return users
} 