import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  Login,
  Register,
  Layout,
  Movies,
  MovieDetail,
  AddMovie,
  EditMovie,
  Profile,
  NotFound
} from './pages'
import { ProtectedRoute, NotFoundMovie } from './components'

function App () {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Movies />
                </ProtectedRoute>
              }
            />
            <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
            }/>
            <Route path="/add" element={
                <ProtectedRoute>
                  <AddMovie />
                </ProtectedRoute>
            }/>
            <Route path="/:id" element={
                <ProtectedRoute>
                  <MovieDetail />
                </ProtectedRoute>
            }/>
            <Route path="/:id/edit" element={
                <ProtectedRoute>
                  <EditMovie />
                </ProtectedRoute>
            }/>
            <Route path="*" element={
                <ProtectedRoute>
                  <NotFoundMovie />
                </ProtectedRoute>
            }/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
