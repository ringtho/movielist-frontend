import { createSlice } from '@reduxjs/toolkit'

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movie: {
      title: '',
      genre: '',
      releaseDate: '',
      plot: '',
      rating: 0,
      notes: '',
      favorited: false
    },
    movies: [],
    isLoading: false
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
    }
  },
})

export const { addMovie, setMovies, setIsLoading } = moviesSlice.actions
export default moviesSlice.reducer
