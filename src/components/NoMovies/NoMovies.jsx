import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NoMovies.scss'

const NoMovies = () => {
  const navigate = useNavigate()
  return (
    <section className="nomovies_container">
      <div className="nomovies_wrapper">
        <p className="nomovies_title">
          Oops you haven&apos;t added a movie to the database yet
        </p>
        <p className="nomovies_sub">Start now by pressing the button below</p>
        <button onClick={() => navigate('add')}>Add Movie</button>
      </div>
    </section>
  )
}

export default NoMovies
