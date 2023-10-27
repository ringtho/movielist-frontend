import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL
const OMDB_KEY = process.env.REACT_APP_OMDB_API_KEY

/**
 * Returns the Header without the authorization
 */
const getHeaders = () => {
  return {
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

/**
 * Returns the Header with the Bearer authorization token
 * It's used for requests using only application/json
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('movieToken')
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
}

/**
 * Returns the Header with the Bearer authorization token.
 * It's used for requests using multipart/ form-data
 */
const getHeadersFormData = () => {
  const token = localStorage.getItem('movieToken')
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  }
}

/**
 * API call to register a new user
 */
export const registerUser = (data) => {
  const config = getHeaders()
  const user = axios.post(`${API_URL}/auth/register`, data, config)
  return user
}

/**
 * API call to login a new user
 */
export const loginUser = (data) => {
  const config = getHeaders()
  const user = axios.post(`${API_URL}/auth/login`, data, config)
  return user
}

/**
 * API call to retrieve the authenticated users details
 */
export const getUser = () => {
  const config = getAuthHeaders()
  const user = axios.get(`${API_URL}/user`, config)
  return user
}

/**
 * API call to update the authenticated users password
 */
export const updatePassword = (data) => {
  const config = getAuthHeaders()
  const user = axios.patch(`${API_URL}/user/update-password`, data, config)
  return user
}

/**
 * API call to update the authenticated users name and profile image
 */
export const updateUserDetails = (data) => {
  const config = getHeadersFormData()
  const user = axios.patch(`${API_URL}/user/update`, data, config)
  return user
}

/**
 * API call to create a new movie
 */
export const createMovie = (data) => {
  const config = getHeadersFormData()
  const movie = axios.post(`${API_URL}/movies`, data, config)
  return movie
}

/**
 * API call to get all movies created by the authenticated user with
 * pagination (in sizes of 10 movies by default)
 * The size can be updated from the frontend
 */
export const getMovies = ({ page, size }) => {
  const pageNo = page - 1 || 0
  const sizeNo = size || 0
  const config = getAuthHeaders()
  const movies = axios.get(`${API_URL}/movies?page=${pageNo}&&size=${sizeNo}`, config)
  return movies
}

/**
 * API call to get all movies created by the authenticated user
 */
export const getAllMovies = () => {
  const config = getAuthHeaders()
  const movies = axios.get(
    `${API_URL}/movies/all`,
    config
  )
  return movies
}

/**
 * API call to retrieve a single movie by id
 */
export const getMovie = (id) => {
  const config = getAuthHeaders()
  const movie = axios.get(`${API_URL}/movies/${id}`, config)
  return movie
}

/**
 * API call to update all details of a movie
 */
export const updateMovie = ({ formData, id }) => {
  const config = getHeadersFormData()
  const movie = axios.put(`${API_URL}/movies/${id}`, formData, config)
  return movie
}

/**
 * API call to update the favorite status of a movie
 */
export const favoriteMovie = (data) => {
  const config = getAuthHeaders()
  const movie = axios.patch(`${API_URL}/movies/${data.id}/favorite`, data, config)
  return movie
}

/**
 * API call to delete a movie
 */
export const deleteMovie = (id) => {
  const config = getAuthHeaders()
  const movie = axios.delete(`${API_URL}/movies/${id}`, config)
  return movie
}

/**
 * API call to delete a thumbnail picture of a movie
 */
export const deleteThumbnail = (id) => {
  const config = getAuthHeaders()
  const movie = axios.delete(`${API_URL}/movies/${id}/image`, config)
  return movie
}

/**
 * API call to get OMDB details about a movie if it exists in the
 * movie database
 */
export const getOmdbMovie = ({ title, year }) => {
  const data = axios.get(
    `https://www.omdbapi.com/?apikey=${OMDB_KEY}&t=${title}&y=${year}`
  )
  return data
}
