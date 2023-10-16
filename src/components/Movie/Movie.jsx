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

  // const handleFavorite = async () => {
  //   const data = { id, favorited: favorite}
  //   try {
  //     const res = await favoriteMovie(data)
  //     console.log(res)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <section className="movie_container">
      <div className="movie_thumbnail">
        <img
          src={omdbPoster ? omdbPoster : thumbnail ? thumbnail : placeholderImg}
          alt={title}
        />
      </div>
      <div className="movie_details">
        <div className="movie_info">
          <small>{year}</small>
          <p className="title" onClick={() => navigate(`${id}`)}>
            {title}
          </p>
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
          {favorite ? (
            <FavoriteIcon
              className="favorite_filled"
              onClick={() => {
                setFavorite(!favorite)
              }}
            />
          ) : (
            <FavoriteBorderIcon
              className="favorite_empty"
              onClick={() => setFavorite(!favorite)}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default Movie
