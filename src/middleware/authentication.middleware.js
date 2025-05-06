import jwt from 'jsonwebtoken'
import { db } from '../libs/db.js'
import ApiErrors from '../utils/api-error.js'


const isAuthenticated=async(req,res,next)=>{
    const {token}=req.cookies

    if(!token){
        throw new ApiErrors(401,"No token provided")
    }

    const decoded= jwt.verify(token,process.env.JWT_SECRET)
    if(!decoded){
        throw new ApiErrors(401,"Unauthorised token")
    }

    const user=await db.user.findUnique({
        where:{
            id:decoded.id
        },
        select:{
            id:true,
            avatar:true,
            email:true,
            username:true,
            role:true
        }
    })

    if(!user){
        throw new ApiErrors(404,"User not found")
    }

    req.user=user
    next()
}

export default isAuthenticated