
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
// import SignIn from './pages/SignIn'
import { AuthProvider } from './Context/AuthContext'
import Navbar from './components/navbar'
import EventInfo from './pages/EventInfo'
import Chat from './pages/Chat'
import Account from './pages/Account'
import { EventProvider } from './hooks/useEvent'
import { ModalProvider } from './hooks/useModal'
import Modal from './components/Modal/Modal'
import Bookings from './pages/Bookings'
function App() {
  return (
    <div className='bg-slate-950 min-h-screen w-screen'>
      <AuthProvider>
        <EventProvider>
          <ModalProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/admin" element={<Admin />}></Route>
                <Route path='/account' element={<Account />}></Route>
                <Route path="/event/:eventID" element={<EventInfo />}></Route>
                <Route path='/bookings' element={<Bookings />}></Route>
                <Route path="/chat" element={<Chat />} ></Route>
                <Route path="/*" element={<Home />} ></Route>
              </Routes>
            </Router>
            <Modal />
          </ModalProvider>
        </EventProvider>
      </AuthProvider>
    </div>
  )
}

export default App
