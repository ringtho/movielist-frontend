import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL
const OMDB_KEY = process.env.REACT_APP_OMDB_API_KEY
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

export const getUser = () => {
  const config = getAuthHeaders()
  const user = axios.get(`${API_URL}/user`, config)
  return user
} 

export const createMovie = (data) => {
  const config = getAuthHeaders()
  const movie = axios.post(`${API_URL}/movies`, data, config)
  return movie
} 

export const getMovies = ({ page, size }) => {
    const pageNo = page - 1 || 0
    const sizeNo = size || 0
    const config = getAuthHeaders()
    const movies = axios.get(`${API_URL}/movies?page=${pageNo}&&size=${sizeNo}`, config)
    return movies
} 

export const getAllMovies = () => {
  const config = getAuthHeaders()
  const movies = axios.get(
    `${API_URL}/movies/all`,
    config
  )
  return movies
} 

export const getMovie = (id) => {
  const config = getAuthHeaders()
  const movie = axios.get(`${API_URL}/movies/${id}`, config)
  return movie
}

export const updateMovie = (data) => {
  const config = getAuthHeaders()
  const movie = axios.put(`${API_URL}/movies/${data.id}`, data, config)
  return movie
}

export const favoriteMovie = (data) => {
  const config = getAuthHeaders()
  const movie = axios.patch(`${API_URL}/movies/${data.id}/favorite`, data, config)
  return movie
}

export const deleteMovie = (id) => {
  const config = getAuthHeaders()
  const movie = axios.delete(`${API_URL}/movies/${id}`, config)
  return movie
}

export const getOmdbMovie = ({ title, year }) => {
  const data = axios.get(
    `https://www.omdbapi.com/?apikey=${OMDB_KEY}&t=${title}&y=${year}`
  )
  return data
}
