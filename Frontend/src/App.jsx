import './App.css'
import {Route,Routes} from "react-router-dom"
import Login from './features/auth/pages/login'
import Register from './features/auth/pages/Register'
import Home from './features/interview/pages/Home'
import Interview from './features/interview/pages/interview'

function App() {

  return (
    <>
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/interview/:interviewId" element={<Interview/>}></Route>
    </Routes>
    </>
  )
}

export default App
