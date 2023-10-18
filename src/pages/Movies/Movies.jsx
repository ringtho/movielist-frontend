import React, { useEffect, useState } from 'react'
import { getAllMovies, getMovies } from '../../api'
import Movie from '../../components/Movie/Movie'
import './Movies.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setMovies, setIsLoading } from '../../redux/slices/moviesSlice'
import Loading from '../../components/Loading/Loading'
import Pagination from '@mui/material/Pagination'
import { useNavigate } from 'react-router-dom'
import SortControls from '../../components/SortControls/SortControls'

const Movies = () => {
  const { movies, isLoading } = useSelector(state => state.movies)
  const [pages, setPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")
  const [searchList, setSearchList] = useState([])
  const [allMovies, setAllMovies] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(setIsLoading(true))
    const getMoviesData = async () => {
      try {
        const { data } = await getMovies({ page: currentPage, size : 10 })
        dispatch(setMovies(data.movies))
        setPages(data.pages)
        dispatch(setIsLoading(false))
      } catch(error){
        console.log(error)
      }
    }
    getMoviesData()
  }, [dispatch, currentPage])

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await getAllMovies()
        setAllMovies(data.movies)
      } catch (error) {
        console.log(error)
      }
    }
    getMovies()
  },[])

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage)
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase())
  }

  const searchMovieByTitle = () => {
    if (search === '') {
      setSearchList([])
    }
    setSearchList([])
    let results = []
    const pattern = new RegExp(search, 'gi')
    for (const movie of allMovies) {
      const title = movie.title
      if (pattern.test(title)) {
        results.push(movie)
      }
    }
    setSearchList(results)
  }
  const movieList = search && searchList.length > 0 ? searchList : movies

  return (
    <section className="movies_container">
      <header className="movies_header">
        <h1 className="movies_title">Movies</h1>
        <div className="medium_sorts">
          <SortControls allMovies={allMovies} />
        </div>
        <button onClick={() => navigate('add')} className="add_btn">
          Add Movie
        </button>
      </header>
      <div className="sorts_small">
        <SortControls allMovies={allMovies} />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="movies_top">
          <div className="movies_wrapper">
            <div className="search_controls">
              <input
                className="search_input"
                placeholder="Search for movie by title"
                type="text"
                name="search"
                value={search}
                onChange={handleSearchChange}
                onKeyUp={searchMovieByTitle}
              />
            </div>
            <div className="movies">
              {movieList.map((movie) => (
                <Movie key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
          {pages > 1 && (
            <div className="pagination_controls">
              <Pagination
                count={pages}
                page={currentPage}
                color="secondary"
                onChange={handlePageChange}
              />
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Movies