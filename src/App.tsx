
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import SignIn from './pages/SignIn'
import { AuthProvider } from './Context/AuthContext'
import Navbar from './components/navbar'
function App() {
// const {completeRegistration} = useAuth();
  return (
    <>
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>

          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/*" element={<Home />} ></Route>



        </Routes>
      </Router>
      </AuthProvider>
    </>
  )
}

export default App
