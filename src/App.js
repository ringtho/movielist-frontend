import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Register } from "./pages";
import Layout from "./pages/Layout/Layout";
import Movies from "./pages/Movies/Movies";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import AddMovie from "./pages/AddMovie/AddMovie";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Movies />} />
            <Route path="/add" element={<AddMovie />} />
            <Route path="/:id" element={<MovieDetail />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
