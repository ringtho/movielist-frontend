import React, { useState } from 'react'
import './SortControls.scss'
import { useDispatch } from 'react-redux'
import { setMovies } from '../../redux/slices/moviesSlice'
import {
  movieTitleAscSort,
  movieTitleDescSort,
  movieYearAscSort,
  movieYearDescSort,
  ratingAscSort,
  ratingDescSort
} from '../utils/sort'
import PropTypes from 'prop-types'

const SortControls = ({ allMovies }) => {
  const dispatch = useDispatch()
  const [sortBy, setSortBy] = useState('title asc')

  const handleSort = () => {
    if (sortBy === 'title asc') {
      const sortedList = movieTitleAscSort(allMovies)
      dispatch(setMovies([...sortedList]))
    }
    if (sortBy === 'title desc') {
      const sortedList = movieTitleDescSort(allMovies)
      dispatch(setMovies([...sortedList]))
    }
    if (sortBy === 'date asc') {
      const sortedList = movieYearAscSort(allMovies)
      dispatch(setMovies([...sortedList]))
    }
    if (sortBy === 'date desc') {
      const sortedList = movieYearDescSort(allMovies)
      dispatch(setMovies([...sortedList]))
    }
    if (sortBy === 'rating desc') {
      const sortedList = ratingDescSort(allMovies)
      dispatch(setMovies([...sortedList]))
    }
    if (sortBy === 'rating asc') {
      const sortedList = ratingAscSort(allMovies)
      dispatch(setMovies([...sortedList]))
    }
  }

  return (
    <div className="sort_small">
      <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
        <optgroup>
          <option value="title asc">Title Ascending</option>
          <option value="title desc">Title Descending</option>
          <option value="rating desc">Rating (Highest - Lowest)</option>
          <option value="rating asc">Rating (Lowest - Highest)</option>
          <option value="date asc">Release Date Ascending</option>
          <option value="date desc">Release Date Descending</option>
        </optgroup>
      </select>
      <button onClick={handleSort}>Sort</button>
    </div>
  )
}

SortControls.propTypes = {
  allMovies: PropTypes.array
}

export default SortControls
