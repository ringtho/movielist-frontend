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
  const [sortBy, setSortBy] = useState('title')
  const [sortOrder, setSortOrder] = useState('asc')

  const handleSort = () => {
    if (sortBy === 'title' && sortOrder === 'asc') {
      const sortedList = movieTitleAscSort(allMovies)
      dispatch(setMovies([...sortedList]))
    }
    if (sortBy === 'title' && sortOrder === 'desc') {
      const sortedList = movieTitleDescSort(allMovies)
      dispatch(setMovies([...sortedList]))
    }
    if (sortBy === 'date' && sortOrder === 'asc') {
      const sortedList = movieYearAscSort(allMovies)
      dispatch(setMovies([...sortedList]))
    }
     if (sortBy === 'date' && sortOrder === 'desc') {
      const sortedList = movieYearDescSort(allMovies)
      dispatch(setMovies([...sortedList]))
     }
  }

  return (
    <section className="sort-controls">
      <label>Sort By:</label>
      <select
        className="select-box"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="title">Title</option>
        <option value="date">Date</option>
      </select>

      <label>Order:</label>
      <select
        className="select-box"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <button className="sort-button" onClick={() => handleSort()}>Sort</button>
    </section>
  )
}

export default SortControls
