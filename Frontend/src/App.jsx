import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'

const App = () => {
  const authUser=null
  return (
    <>
    <Routes>
      <Route path="/" 
      element={ authUser ? <Home/> : <Navigate to={"/login"}/>}
      />

      <Route path="/signup" 
      element={!authUser ? <Register/>:<Navigate to={"/"}/>}
      />

      <Route path="/login"
      element={!authUser ? <Login/>:<Navigate to={"/"}/>}
      />
    </Routes>
    </>
  )
}

export default App