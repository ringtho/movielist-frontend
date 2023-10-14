import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Register } from "./pages";
import Layout from "./pages/Layout/Layout";
import Movies from "./pages/Movies/Movies";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Movies />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
