import React, { useEffect, useState } from 'react'
import { getMovies } from '../../api'
import Movie from '../../components/Movie/Movie'
import './Movies.scss'

const Movies = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const getMoviesData = async () => {
      try {
        const { data } = await getMovies()
        console.log(data.movies)
        setMovies(data.movies)
      } catch(error){
        console.log(error)
      }
    }
    getMoviesData()
  }, [])

  return (
    <section className="movies_container">
      <h1>Movies</h1>
      <div className='movies_wrapper'>
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default Movies