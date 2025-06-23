import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { Loader } from 'lucide-react'

const VerifyEmailPage = () => {
    const {id} = useParams()
    const {isVerifying,verifymail}=useAuthStore()
    const navigate=useNavigate()

    const handleClick=()=>{
      navigate("/login")
    }

    useEffect(()=>(
        verifymail(id)
    ),[id,verifymail])

    if(isVerifying){
        return(
          <div className="flex items-center justify-center h-screen">
              <Loader className="size-10 animate-spin"/>
          </div>
        )
      }
    
  return (
   <>
   <h1>Email verify successfully</h1>
   <button onClick={handleClick}>Go to Login</button>
   </>
  )
}

export default VerifyEmailPage