
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
// import SignIn from './pages/SignIn'
import { AuthProvider } from './Context/AuthContext'
import Navbar from './components/navbar'
import EventInfo from './pages/EventInfo'
import Chat from './pages/Chat'
import Account from './pages/Account'
function App() {
  // const {completeRegistration} = useAuth();
  return (
    <div className='bg-slate-950 min-h-screen w-screen'>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path='/account' element={<Account />}></Route>
            <Route path="/eventinfo/:eventID" element={<EventInfo />}></Route>
            <Route path="/chat" element={<Chat />} ></Route>

            <Route path="/*" element={<Home />} ></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
