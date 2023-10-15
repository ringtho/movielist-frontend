import { createSlice } from '@reduxjs/toolkit'

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movie: {
      title: '',
      genre: '',
      releaseDate: '',
      plot: '',
      rating: '',
      notes: ''
    },
  },
  reducers: {
    addMovie: (state, action) => {
      state.movie = action.payload
    },
  },
})

export const { addMovie } = moviesSlice.actions
export default moviesSlice.reducer
