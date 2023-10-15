import React, { useEffect } from 'react'
import { getMovies } from '../../api'
import Movie from '../../components/Movie/Movie'
import './Movies.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setMovies, setIsLoading } from '../../redux/slices/moviesSlice'
import Loading from '../../components/Loading/Loading'

const Movies = () => {
  const { movies, isLoading } = useSelector(state => state.movies)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setIsLoading(true))
    const getMoviesData = async () => {
      try {
        const { data } = await getMovies()
        dispatch(setMovies(data.movies))
        dispatch(setIsLoading(false))
      } catch(error){
        console.log(error)
      }
    }
    getMoviesData()
  }, [dispatch])

  return (
    <section className="movies_container">
      <h1 className='movies_title'>Movies</h1>
      {isLoading ? <Loading /> :
      (<div className='movies_wrapper'>
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>)
      }
    </section>
  )
}

export default Movies