// Function to sort movie by movie title in descending order

export const movieTitleDescSort = (allMovies) => {
   const sortedList = allMovies.sort((a, b) => {
     if (a.title.toLowerCase() > b.title.toLowerCase()) {
       return -1
     }
     if (a.title.toLowerCase() < b.title.toLowerCase()) {
       return 1
     }
     return 0
   })
   return sortedList
 }

// Function to sort movie by movie title in ascending order
export const movieTitleAscSort = (allMovies) => {
  const sortedList = allMovies.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1
    }
    return 0
  })
  return sortedList
}


// Function to sort movie by release Date in ascending order
export const movieYearAscSort = (allMovies) => {
  const sortedList = allMovies.sort((a, b) => {
    if (a.releaseDate < b.releaseDate) {
      return -1
    }
    if (a.releaseDate > b.releaseDate) {
      return 1
    }
    return 0
  })
  return sortedList
}

// Function to sort movie by release Date in descending order
export const movieYearDescSort = (allMovies) => {
  const sortedList = allMovies.sort((a, b) => {
    if (a.releaseDate > b.releaseDate) {
      return -1
    }
    if (a.releaseDate < b.releaseDate) {
      return 1
    }
    return 0
  })
  return sortedList
}