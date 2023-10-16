import React, { useState } from 'react'
import './SortControls.scss'
import { useDispatch } from 'react-redux'
import { setMovies } from '../../redux/slices/moviesSlice'

const SortControls = ({ allMovies }) => {
  const dispatch = useDispatch()
  const [sortBy, setSortBy] = useState('title')
  const [sortOrder, setSortOrder] = useState('asc')

  const handleSort = () => {
    if (sortBy === 'title' && sortOrder === 'asc') {
        movieTitleAscSort()
    }
    if (sortBy === 'title' && sortOrder === 'desc') {
      movieTitleDescSort()
    }
    if (sortBy === 'date' && sortOrder === 'asc') {
      movieYearAscSort()
    }
     if (sortBy === 'date' && sortOrder === 'desc') {
       movieYearDescSort()
     }
  }

  const movieTitleDescSort = () => {
    const sortedList = allMovies.sort((a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return -1
      }
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return 1
      }
      return 0
    })
    dispatch(setMovies([...sortedList]))
  }

  const movieTitleAscSort = () => {
    const sortedList = allMovies.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1
      }
      return 0
    })
    dispatch(setMovies([...sortedList]))
  }

  const movieYearAscSort = () => {
    const sortedList = allMovies.sort((a, b) => {
      if (a.releaseDate < b.releaseDate) {
        return -1
      }
      if (a.releaseDate > b.releaseDate) {
        return 1
      }
      return 0
    })
    dispatch(setMovies([...sortedList]))
  }

  const movieYearDescSort = () => {
    const sortedList = allMovies.sort((a, b) => {
      if (a.releaseDate > b.releaseDate) {
        return -1
      }
      if (a.releaseDate < b.releaseDate) {
        return 1
      }
      return 0
    })
    dispatch(setMovies([...sortedList]))
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
