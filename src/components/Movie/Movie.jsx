import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating'
import './Movie.scss'
import { favoriteMovie, getOmdbMovie } from '../../api'
import { useNavigate } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import placeholderImg from '../../assets/placeholder2.jpeg'
import PropTypes from 'prop-types'

const Movie = ({ movie, setIsFavoriteChange }) => {
  const [omdbPoster, setOmdbPoster] = useState('')
  const { title, releaseDate, rating, thumbnail, id, favorited } = movie
  const year = new Date(releaseDate).getFullYear()
  const navigate = useNavigate()
  const [favorite, setFavorite] = useState(favorited)

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
  }, [title, year, favorite])

  const updateFavoriteMovie = async (value) => {
    setIsFavoriteChange(null)
    try {
      const data = { id, favorited: value }
      await favoriteMovie(data)
      setFavorite(value)
      setIsFavoriteChange(value)
    } catch (error) {
      console.log(error)
    }
  }

  const API_URL = process.env.REACT_APP_API_URL
  const img = API_URL + `/${movie.thumbnail}`

  return (
    <section className="movie_container">
      <div className="movie_thumbnail" onClick={() => navigate(`${id}`)}>
        <img
          src={thumbnail ? img : omdbPoster || placeholderImg}
          alt={title}
        />
      </div>
      <div className="movie_details">
        <div className="movie_info">
          <div className="movie_year">
            <small>{year}</small>
            {favorite
              ? (
              <FavoriteIcon
                className="favorite_filled"
                sx={{
                  fontSize: '1rem'
                }}
                onClick={() => updateFavoriteMovie(false)}
              />
                )
              : (
              <FavoriteBorderIcon
                className="favorite_empty"
                sx={{
                  fontSize: '1rem'
                }}
                onClick={() => updateFavoriteMovie(true)}
              />
                )
            }
          </div>
          <p className="title" onClick={() => navigate(`${id}`)}>
            {title}
          </p>
          <Rating
            name="size-medium"
            defaultValue={rating}
            value={rating}
            readOnly
            size="small"
            precision={0.5}
            sx={{
              color: '#BB86Fc'
            }}
          />
        </div>
      </div>
    </section>
  )
}

Movie.propTypes = {
  movie: PropTypes.object,
  setIsFavoriteChange: PropTypes.func
}

export default Movie
