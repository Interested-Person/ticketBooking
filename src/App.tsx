
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import SignIn from './pages/SignIn'
function App() {

  return (
    <>
      <Router>
        <Routes>

          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/*" element={<Home />} ></Route>



        </Routes>
      </Router>
    </>
  )
}

export default App
