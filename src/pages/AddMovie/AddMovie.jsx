import React, { useState } from 'react'
import './AddMovie.scss'
import { createMovie } from '../../api'

const AddMovie = () => {
  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    plot: "",
    releaseDate: "",
    rating: "",
    notes: ""
  })

  const handleChange = (e) => {
    setMovie({...movie, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <section className="addmovie_container">
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
          <input
            type="text"
            id="releaseDate"
            name="releaseDate"
            value={movie.releaseDate}
            onChange={handleChange}
            placeholder="eg 2023-04-19"
            required
          />
        </div>
        <div className="add_controls">
          <label className="rating">Rating</label>
          <input
            type="text"
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
        <button>Add</button>
      </form>
    </section>
  )
}

export default AddMovie
