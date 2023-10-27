import React, { useState } from 'react'
import './SortControls.scss'
import { useDispatch } from 'react-redux'
import { setMovies } from '../../redux/slices/moviesSlice'
import { 
  movieTitleAscSort, 
  movieTitleDescSort, 
  movieYearAscSort, 
  movieYearDescSort 
} from '../utils/sort'

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
      } else {
          return
      }
  }

  return (
    <div className="sort_small">
      <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
        <optgroup>
          <option value="title asc">
            Title Ascending
          </option>
          <option value="title desc">Title Descending</option>
          <option value="date asc">Release Date Ascending</option>
          <option value="date desc">Release Date Descending</option>
        </optgroup>
      </select>
      <button onClick={handleSort}>Sort</button>
    </div>
  )
}

export default SortControls
