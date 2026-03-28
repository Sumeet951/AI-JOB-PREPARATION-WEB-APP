import './App.css'
import {Route,Routes} from "react-router-dom"
import Login from './features/auth/pages/login'
import Register from './features/auth/pages/Register'
import Home from './features/interview/pages/Home'
import Interview from './features/interview/pages/interview'
import RequireAuth from './features/auth/components/RequireAuth'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      
      
      
      <Route element={<RequireAuth allowedRoles={["User","Admin"]}/>}>
      <Route path="/home" element={<Home/>}></Route>
      </Route>

      <Route path="/interview/:interviewId" element={<Interview/>}></Route>
    
    </Routes>
    </>
  )
}

export default App
