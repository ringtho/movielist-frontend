import React from 'react'
import placeholderImg from '../../assets/placeholder.jpeg'
import Rating from '@mui/material/Rating'
import './Movie.scss'

const Movie = ({ movie }) => {
  const { title, releaseDate, rating, thumbnail } = movie
  const year = new Date(releaseDate).getFullYear()
  return (
    <section className="movie_container">
      <div className="movie_thumbnail">
        <img src={thumbnail ? thumbnail : placeholderImg} alt={title} />
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
