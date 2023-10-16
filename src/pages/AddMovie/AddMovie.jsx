import React, { useState } from 'react'
import './AddMovie.scss'
import { createMovie } from '../../api'
import Back from '../../components/Back/Back'
import { useNavigate } from 'react-router-dom'
import DatePickerItem from '../../components/DatePicker/DatePicker'

const AddMovie = () => {
  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    plot: "",
    releaseDate: "",
    rating: "",
    notes: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setMovie({...movie, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
        await createMovie(movie)
        setMovie({
          title: '',
          genre: '',
          plot: '',
          releaseDate: '',
          rating: '',
          notes: '',
        })
        setIsSubmitting(false)
        navigate('/')
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <section className="addmovie_container">
      <div className="addmovie">
        <Back />
        <form className="addmovie_wrapper" onSubmit={handleSubmit}>
          <h1>Add a new movie?</h1>
          <div className="add_controls">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={movie.title}
              onChange={handleChange}
              placeholder="eg Mr Smith and Mrs Smith"
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
            <DatePickerItem setMovie={setMovie} movie={movie} />
          </div>
          <div className="add_controls">
            <label className="rating">Rating</label>
            <input
              type="number"
              min={1}
              max={5}
              id="rating"
              name="rating"
              value={movie.rating}
              onChange={handleChange}
              placeholder="eg 4"
              required
            />
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
          <button disabled={isSubmitting} className='btn'>
            { isSubmitting ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default AddMovie
