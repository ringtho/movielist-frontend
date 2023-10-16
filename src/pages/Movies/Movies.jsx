import React, { useEffect, useState } from 'react'
import { getAllMovies, getMovies } from '../../api'
import Movie from '../../components/Movie/Movie'
import './Movies.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setMovies, setIsLoading } from '../../redux/slices/moviesSlice'
import Loading from '../../components/Loading/Loading'
import Pagination from '@mui/material/Pagination'

const Movies = () => {
  const { movies, isLoading } = useSelector(state => state.movies)
  const [pages, setPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")
  const [searchList, setSearchList] = useState([])
  const [allMovies, setAllMovies] = useState([])
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(setIsLoading(true))
    const getMoviesData = async () => {
      try {
        const { data } = await getMovies({ page: currentPage, size : 5 })
        dispatch(setMovies(data.movies))
        setPages(data.pages)
        dispatch(setIsLoading(false))
      } catch(error){
        console.log(error)
      }
    }
    getMoviesData()
  }, [dispatch, currentPage])

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await getAllMovies()
        setAllMovies(data.movies)
      } catch (error) {
        console.log(error)
      }
    }
    getMovies()
  },[])

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage)
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase())
  }

  const searchMovieByTitle = () => {
    if (search === '') {
      setSearchList([])
    }
    setSearchList([])
    let results = []
    const pattern = new RegExp(search, 'gi')
    for (const movie of allMovies) {
      const title = movie.title
      if (pattern.test(title)) {
        results.push(movie)
      }
    }
    setSearchList(results)
  }

  const movieDescendingSort = () => {
    const sortedList = allMovies.sort((a,b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return -1
      }
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return 1
      }
      return 0
    })
    dispatch(setMovies([...sortedList]))
  }

  const movieAscendingSort = () => {
    const sortedList = allMovies.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1
      }
      return 0
    })
    dispatch(setMovies([...sortedList]))
  }

  const movieYearAscSort = () => {
    const sortedList = allMovies.sort((a, b) => {
      if (a.releaseDate < b.releaseDate) {
        return -1
      }
      if (a.releaseDate > b.releaseDate) {
        return 1
      }
      return 0
    })
    dispatch(setMovies([...sortedList]))
  }

  const movieYearDescSort = () => {
    const sortedList = allMovies.sort((a, b) => {
      if (a.releaseDate > b.releaseDate) {
        return -1
      }
      if (a.releaseDate < b.releaseDate) {
        return 1
      }
      return 0
    })
    dispatch(setMovies([...sortedList]))
  }

  const movieList = search && searchList.length > 0 ? searchList : movies
  console.log(movieList)

  return (
    <section className="movies_container">
      <h1 className="movies_title">Movies</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="movies_top">
          <div className="search_controls">
            <input
              className="search_input"
              placeholder="Search for movie by title"
              type="text"
              name="search"
              value={search}
              onChange={handleSearchChange}
              onKeyUp={searchMovieByTitle}
            />
          </div>
          <div className="sort_controls">
            <p>Sort By Title</p>
            <div onClick={() => movieAscendingSort()}>Up</div>
            <div onClick={() => movieDescendingSort()}>Down</div>
          </div>
          <div className="sort_controls">
            <p>Sort By Release Date</p>
            <div onClick={() => movieYearAscSort()}>Up</div>
            <div onClick={() => movieYearDescSort()}>Down</div>
          </div>
          <div className="movies_wrapper">
            {movieList.map((movie) => (
              <Movie key={movie.id} movie={movie} />
            ))}
          </div>
          {pages > 1 && (
            <div className="pagination_controls">
              <Pagination
                count={pages}
                page={currentPage}
                color="secondary"
                onChange={handlePageChange}
              />
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Movies