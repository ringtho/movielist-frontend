import React, { useEffect, useState } from 'react'
import './MovieDetail.scss'
import { useNavigate, useParams } from 'react-router-dom'
import placeholderImg from '../../assets/placeholder2.jpeg'
import { getMovie, getOmdbMovie } from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import { addMovie, setIsLoading } from '../../redux/slices/moviesSlice'
import DeleteMovie from '../DeleteMovie/DeleteMovie'
import Loading from '../../components/Loading/Loading'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import NotFoundMovie from '../../components/NotFoundMovie/NotFoundMovie'
import Rating from '@mui/material/Rating'

const MovieDetail = () => {
  const [movie, setMovie] = useState({})
  const [omdb, setOmdb] = useState({})
  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState(null)
  const params = useParams()
  const id = params?.id
  const date = new Date(movie.releaseDate)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)
  const { isLoading } = useSelector(state => state.movies)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleEditCick = () => {
    dispatch(addMovie(movie))
    navigate('edit')
  }

  const handleDeleteCick = () => {
    dispatch(addMovie(movie))
    setIsActive(true)
  }

  useEffect(() => {
    setIsActive(false)
    dispatch(setIsLoading(true))
    const getMovieDetails = async () => {
        try {
            const { data } = await getMovie(id)
            const year = new Date(data.movie.releaseDate).getFullYear()
            const ombdData = await getOmdbMovie({title: data.movie.title, year })
            setMovie(data.movie)
            setOmdb(ombdData.data)
            dispatch(setIsLoading(false))
        } catch (error) {
            setError(error?.response?.status)
        }
    }
    getMovieDetails()
  }, [id, dispatch])

  return (
    <>
      {error === 404 ? <NotFoundMovie /> : isLoading ? (
        <div className='moviedetails_loading'>
          <Loading />
        </div>
      )  : (
        <section className="moviedetail">
          <div className="moviedetail_back">
            <div className="back_controls" onClick={() => navigate('/')}>
              <ArrowBackIosIcon className="back_icon" />
              Home
            </div>
          </div>
          <header>
            <h1>{movie.title}</h1>
          </header>
          <div className="detail_container">
            <div className="moviedetails">
              <div className="poster">
                <img
                  src={
                    omdb.Poster
                      ? omdb.Poster
                      : movie.thumbnail
                      ? movie.thumbnail
                      : placeholderImg
                  }
                  alt={movie.title}
                />
              </div>
            </div>
            <div className="moviedetail_con_wrapper">
              <div className="movieinfo">
                <h2 className="detail_title tile_title">{movie.title}</h2>
                <div className="detail_desc">
                  <p>
                    {omdb.Genre
                      ? omdb.Genre.split(',').join(' |')
                      : movie.genre}
                  </p>
                </div>
                {omdb.Runtime && (
                  <div className="detail_desc">
                    <span className="span">Runtime</span>
                    <p>{omdb.Runtime}</p>
                  </div>
                )}
                <div className="detail_desc">
                  <span>Release Date</span>
                  <p>{formattedDate}</p>
                </div>
                <div className="detail_desc">
                  <span>Personal Rating</span>
                  {/* <Rating
                    name="size-medium"
                    defaultValue={movie.rating}
                    readOnly
                    size="small"
                    precision={0.5}
                    sx={{
                      color: '#BB86Fc',
                    }}
                  /> */}
                  <p>{movie.rating}/5</p>
                </div>
                {omdb.imdbRating && (
                  <div className="detail_desc">
                    <span>IMDB Rating</span>
                    {/* <Rating
                      name="size-medium"
                      defaultValue={parseInt(omdb.imdbRating)}
                      readOnly
                      size="small"
                      precision={0.5}
                      sx={{
                        color: '#BB86Fc',
                      }} */}
                    <p>{omdb.imdbRating}/10</p>
                  </div>
                )}
                {omdb.Director && (
                  <div className="detail_desc">
                    <span>Director</span>
                    <p>{omdb.Director}</p>
                  </div>
                )}
                {omdb.Actors && (
                  <div className="detail_desc">
                    <span>Cast</span>
                    <p>{omdb.Actors}</p>
                  </div>
                )}
              </div>
              {(omdb.Plot || movie.plot) && (
                <div className="overview">
                  <h2 className="detail_title">Movie Overview</h2>
                  <p className="detail_desc_p">
                    {omdb.Plot ? omdb.Plot : movie.plot}
                  </p>
                </div>
              )}

              {movie.notes && (
                <div className="overview">
                  <h2 className="detail_title">Movie Notes</h2>
                  <p className="detail_desc_p">{movie.notes}</p>
                </div>
              )}
              <div className="btn_container">
                <button className="edit_btn" onClick={handleEditCick}>
                  Edit
                </button>
                <button className="delete_btn" onClick={handleDeleteCick}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
      {isActive && <DeleteMovie setIsActive={setIsActive} />}
    </>
  )
}

export default MovieDetail
