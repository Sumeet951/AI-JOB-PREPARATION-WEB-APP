import './App.css'
import {Route,Routes} from "react-router-dom"
import Login from './features/auth/pages/login'
import Register from './features/auth/pages/Register'

function App() {

  return (
    <>
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Routes>
    </>
  )
}

export default App
