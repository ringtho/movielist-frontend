import React from 'react'
import './FavoriteMovie.scss'
import { useDispatch, useSelector } from 'react-redux'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { addMovie } from '../../redux/slices/moviesSlice'

const FavoriteMovie = () => {
  const dispatch = useDispatch()
  const { movie } = useSelector((state) => state.movies)
  return (
    <div className="rating_results">
      {movie.favorited
        ? (
        <FavoriteIcon
          className="favorite_filled"
          sx={{
            fontSize: '1.25rem'
          }}
          onClick={() => {
            dispatch(addMovie({ ...movie, favorited: !movie.favorited }))
          }}
        />
          )
        : (
        <FavoriteBorderIcon
          className="favorite_empty"
          sx={{
            fontSize: '1.25rem'
          }}
          onClick={() => {
            dispatch(addMovie({ ...movie, favorited: !movie.favorited }))
          }}
        />
          )
      }
      <small className={movie.favorited ? 'gold' : 'other'}>
        {movie.favorited ? 'favorite' : 'Not favorite'}
      </small>
    </div>
  )
}

export default FavoriteMovie
