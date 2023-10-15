import React, { useEffect, useState } from 'react'
import placeholderImg from '../../assets/placeholder2.jpeg'
import Rating from '@mui/material/Rating'
import './Movie.scss'
import { getOmdbMovie } from '../../api'
import { useNavigate } from 'react-router-dom'

const Movie = ({ movie }) => {
  const [omdbPoster, setOmdbPoster] = useState("")
  const { title, releaseDate, rating, thumbnail, id } = movie
  const year = new Date(releaseDate).getFullYear()
  const navigate = useNavigate()

  useEffect(() => {
    
    const getExternalData = async () => {
      try {
        const { data } = await getOmdbMovie({ title, year })
        setOmdbPoster(data.Poster)
      } catch (error) {
        console.log(error)
      }
    }
    getExternalData()
  }, [title, year])

  return (
    <section className="movie_container" onClick={() => navigate(`${id}`)}>
      <div className="movie_thumbnail">
        <img
          src={omdbPoster ? omdbPoster : thumbnail ? thumbnail : placeholderImg}
          alt={title}
        />
      </div>
      <div className="movie_details">
        <div className="movie_info">
          <small>{year}</small>
          <p className="title">{title}</p>
          <Rating
            name="size-medium"
            defaultValue={rating}
            max={5}
            readOnly
            precision={0.5}
            sx={{
              color: '#BB86Fc',
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Movie
