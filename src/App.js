import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Register } from "./pages";
import Layout from "./pages/Layout/Layout";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
