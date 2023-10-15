import React, { useEffect, useState } from 'react'
import { getMovies } from '../../api'
import Movie from '../../components/Movie/Movie'
import './Movies.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setMovies, setIsLoading } from '../../redux/slices/moviesSlice'
import Loading from '../../components/Loading/Loading'

const Movies = () => {
  const { movies, isLoading } = useSelector(state => state.movies)
  const [pages, setPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(setIsLoading(true))
    const getMoviesData = async () => {
      try {
        const { data } = await getMovies(currentPage)
        dispatch(setMovies(data.movies))
        setPages(data.pages)
        dispatch(setIsLoading(false))
      } catch(error){
        console.log(error)
      }
    }
    getMoviesData()
  }, [dispatch, currentPage])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <section className="movies_container">
      <h1 className="movies_title">Movies</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="movies_wrapper">
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {pages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Movies