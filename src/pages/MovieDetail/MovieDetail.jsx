import React, { useEffect, useState } from 'react'
import './MovieDetail.scss'
import { useNavigate, useParams } from 'react-router-dom'
import placeholderImg from '../../assets/placeholder2.jpeg'
import { getMovie, getOmdbMovie } from '../../api'
import { useDispatch } from 'react-redux'
import { addMovie } from '../../redux/slices/moviesSlice'
import DeleteMovie from '../DeleteMovie/DeleteMovie'

const MovieDetail = () => {
  const [movie, setMovie] = useState({})
  const [omdb, setOmdb] = useState({})
  const [isActive, setIsActive] = useState(false)
  const params = useParams()
  const id = params?.id
  const date = new Date(movie.releaseDate)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)
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
    const getMovieDetails = async () => {
        try {
            const { data } = await getMovie(id)
            const year = new Date(data.movie.releaseDate).getFullYear()
            const ombdData = await getOmdbMovie({title: data.movie.title, year })
            setMovie(data.movie)
            setOmdb(ombdData.data)
        } catch (error) {
            console.log(error)
        }
    }
    getMovieDetails()
  }, [id])

  return (
    <>
    <section className="moviedetail">
      <header>
        <h1>{movie.title}</h1>
      </header>
      <div className="detail_container">
        <div className="movie-details">
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
          <div className="movie-info">
            <h2 className="detail_title">{movie.title}</h2>
            <p>
              <span>Genre:</span> {omdb.Genre ? omdb.Genre : movie.genre}
            </p>
            <p>
              <span>Release Date:</span> {formattedDate}
            </p>
            <p>
              <span>Personal Rating:</span> {movie.rating}/5
            </p>
            {omdb.imdbRating && (
              <p>
                <span>IMDB Rating:</span> {omdb.imdbRating}/10
              </p>
            )}
            <p>
              <span>Plot:</span> {omdb.Plot ? omdb.Plot : movie.plot}
            </p>
            {omdb.Director && (
              <p>
                <span>Director:</span> {omdb.Director}
              </p>
            )}
            {omdb.Actors && (
              <p>
                <span>Cast:</span> {omdb.Actors}
              </p>
            )}
            {omdb.Runtime && (
              <p>
                <span>Runtime:</span> {omdb.Runtime}
              </p>
            )}
          </div>
        </div>
        {movie.notes && (
          <div className="overview">
            <h2 className="detail_title">Movie Overview</h2>
            <p>{movie.notes}</p>
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
      
    </section>
    { isActive && <DeleteMovie setIsActive={setIsActive} />}
    </>
  )
}

export default MovieDetail
