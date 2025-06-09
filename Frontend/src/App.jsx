import React, { useEffect } from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import {Toaster} from "react-hot-toast"
import { useAuthStore } from './store/useAuthStore'
import {Loader} from "lucide-react"
import Layout from './layout/Layout'
import AdminRoute from './Components/AdminRoute'
import AddProblem from './Pages/AddProblem'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])
   console.log(`Auth user us ${authUser}`)
  if(isCheckingAuth && !authUser){
    return(
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }
  return (
    <>
      <Toaster/>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index 
      element={ authUser ? <Home/> : <Navigate to={"/login"}/>}
      />
      </Route>

      <Route path="/signup" 
      element={!authUser ? <Register/>:<Navigate to={"/"}/>}
      />

      <Route path="/login"
      element={!authUser ? <Login/>:<Navigate to={"/"}/>}
      />
      <Route element={<AdminRoute />}>
  <Route
    path="/add-problem"
    element={authUser ? <AddProblem /> : <Navigate to="/" />}
  />
</Route>
    </Routes>
    </>
   
  )
}

export default App