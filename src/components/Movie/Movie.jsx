import React, { useEffect, useState } from 'react'
import placeholderImg from '../../assets/placeholder2.jpeg'
import Rating from '@mui/material/Rating'
import './Movie.scss'
import { favoriteMovie, getOmdbMovie } from '../../api'
import { useNavigate } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Movie = ({ movie }) => {
  const [omdbPoster, setOmdbPoster] = useState("")
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
  }, [title, year])

  useEffect(() => {
    const updateFavoriteMovie = async () => {
      try {
        const data = { id, favorited: favorite }
        await favoriteMovie(data)
      } catch (error) {
        console.log(error)
      }
    }
    updateFavoriteMovie()
  }, [favorite, id])

  const API_URL = process.env.REACT_APP_API_URL
  const img = API_URL + `/${movie.thumbnail}`

  return (
    <section className="movie_container">
      <div className="movie_thumbnail" onClick={() => navigate(`${id}`)}>
        <img
          src={
            thumbnail
              ? img
              : omdbPoster
              ? omdbPoster
              : placeholderImg
          }
          alt={title}
        />
      </div>
      <div className="movie_details">
        <div className="movie_info">
          <div className="movie_year">
            <small>{year}</small>
            {favorite ? (
              <FavoriteIcon
                className="favorite_filled"
                sx={{
                  fontSize: '1rem',
                }}
                onClick={() => {
                  setFavorite(!favorite)
                }}
              />
            ) : (
              <FavoriteBorderIcon
                className="favorite_empty"
                sx={{
                  fontSize: '1rem',
                }}
                onClick={() => setFavorite(!favorite)}
              />
            )}
          </div>
          <p className="title" onClick={() => navigate(`${id}`)}>
            {title}
          </p>
          <Rating
            name="size-medium"
            defaultValue={rating}
            readOnly
            size="small"
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
