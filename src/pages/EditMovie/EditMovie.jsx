import React, { useState, useEffect } from 'react'
import './EditMovie.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addMovie, setIsLoading } from '../../redux/slices/moviesSlice'
import { deleteThumbnail, getMovie, updateMovie, getOmdbMovie } from '../../api'
import { useNavigate, useParams } from 'react-router-dom'
import Back from '../../components/Back/Back'
import DatePickerItem from '../../components/DatePicker/DatePicker'
import dayjs from 'dayjs'
import Rating from '@mui/material/Rating'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import placeholderImg from '../../assets/placeholder2.jpeg'
import DeleteIcon from '@mui/icons-material/Delete'
import Loading from '../../components/Loading/Loading'

const EditMovie = () => {
  const { movie, isLoading } = useSelector(state => state.movies)
  const [file, setFile] = useState("")
  const [omdbPoster, setOmdbPoster] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isImageDeleted, setIsImageDeleted] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id }= useParams()

  const handleChange = (e) => {
    dispatch(addMovie({...movie, [e.target.name]: e.target.value}))
  }

  const handleImageChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData()
    formData.append('image', file)
    formData.append('id', movie.id)
    formData.append('title', movie.title)
    formData.append('plot', movie.plot)
    formData.append('genre', movie.genre)
    formData.append('releaseDate', movie.releaseDate)
    formData.append('rating', movie.rating)
    formData.append('notes', movie.notes)
    formData.append('favorited', movie.favorited)
    formData.append('thumbnail', movie.thumbnail)
    try {
        await updateMovie({ formData, id: movie.id })
        setIsSubmitting(false)
        navigate(`/${movie.id}`)
    } catch (error) {
        console.log(error)
    }
  }

  const API_URL = process.env.REACT_APP_API_URL
  const img = API_URL + `/${movie.thumbnail}`

  const handleRemove = async () => {
    try {
      await deleteThumbnail(movie.id)
      setIsImageDeleted(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dispatch(setIsLoading(true))
    const getMovieDetails = async () => {
      try {
        const { data } = await getMovie(id)
        const year = new Date(data.movie.releaseDate).getFullYear()
        const ombdData = await getOmdbMovie({ title: data.movie.title, year })
        dispatch(addMovie(data.movie))
        setOmdbPoster(ombdData.data.Poster)
        dispatch(setIsLoading(false))
      } catch (error) {
        console.log(error)
      } 
    }
    getMovieDetails()
  }, [id, dispatch, isImageDeleted])

  return (
    <>
      {isLoading ? (
      <div className="moviedetails_loading">
        <Loading />
      </div>) :
      <section className="addmovie_container">
        <div className="addmovie">
          <Back />
          <form
            className="addmovie_wrapper"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <h1>Edit</h1>
            <div className="add_controls">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={movie.title}
                onChange={handleChange}
                placeholder="eg Mr Smith"
                required
              />
            </div>
            <div className="add_controls">
              <label htmlFor="genre">Genre</label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={movie.genre}
                onChange={handleChange}
                placeholder="eg Action"
                required
              />
            </div>
            <div className="add_controls">
              <label htmlFor="plot">Plot</label>
              <textarea
                type="text"
                id="plot"
                name="plot"
                value={movie.plot}
                onChange={handleChange}
                placeholder="eg A secret service agent revenges the death of his wife"
                required
              />
            </div>
            <div className="add_controls">
              <label htmlFor="releaseDate">Release Date</label>

              <DatePickerItem value={dayjs(movie.releaseDate)} />
            </div>
            <div className="add_controls">
              <label className="rating">Rating</label>
              <div className="rating_results">
                <Rating
                  name="size-medium"
                  sx={{
                    color: '#BB86Fc',
                    width: '32px',
                    height: '32px',
                  }}
                  size="large"
                  value={movie.rating}
                  onChange={(event, newValue) =>
                    dispatch(addMovie({ ...movie, rating: newValue }))
                  }
                  precision={0.5}
                />
                <p>{movie.rating}</p>
              </div>
            </div>
            <div className="add_controls">
              <label className="rating">Favorite</label>
              <div className="rating_results">
                {movie.favorited ? (
                  <FavoriteIcon
                    className="favorite_filled"
                    sx={{
                      fontSize: '1.25rem',
                    }}
                    onClick={() => {
                      dispatch(
                        addMovie({ ...movie, favorited: !movie.favorited })
                      )
                    }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    className="favorite_empty"
                    sx={{
                      fontSize: '1.25rem',
                    }}
                    onClick={() => {
                      dispatch(
                        addMovie({ ...movie, favorited: !movie.favorited })
                      )
                    }}
                  />
                )}
                <small className={movie.favorited ? 'gold' : 'other'}>
                  {movie.favorited ? 'favorite' : 'Not favorite'}
                </small>
              </div>
            </div>
            <div className="add_controls">
              <label id="thumbnail">Update Thumbnail</label>
              <div className="thumbnail_cont">
                <div className="thumbnail_img">
                  <img
                    src={
                      movie.thumbnail
                        ? img
                        : omdbPoster
                        ? omdbPoster
                        : placeholderImg
                    }
                    alt={movie.title}
                  />
                  {movie.thumbnail && (
                    <div onClick={handleRemove} className="remove_thumbnail">
                      <DeleteIcon fontSize="small" />
                      <p className="remove_text">Remove thumbnail</p>
                    </div>
                  )}
                </div>
                <div className="thumbnail_upload">
                  <label id="thumbnail">Update Thumbnail</label>
                  <input
                    id="thumbnail"
                    name="thumbnail"
                    type="file"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
            <div className="add_controls">
              <label id="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={movie.notes}
                onChange={handleChange}
              />
            </div>
            <button disabled={isSubmitting} className="btn">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </section>}
    </>
  )
}

export default EditMovie
