import { createSlice } from '@reduxjs/toolkit'

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movie: {
      title: '',
      genre: '',
      releaseDate: null,
      plot: '',
      rating: 1,
      notes: '',
      favorited: false,
      thumbnail: ''
    },
    movies: [],
    isLoading: false,
    omdbData: {}
  },
  reducers: {
    addMovie: (state, action) => {
      state.movie = action.payload
    },
    setMovies: (state, action) => {
      state.movies = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setOmdbData: (state, action) => {
      state.omdbData = action.payload
    }
  },
})

export const { addMovie, setMovies, setIsLoading, setOmdbPoster, setOmdbData } = moviesSlice.actions
export default moviesSlice.reducer
