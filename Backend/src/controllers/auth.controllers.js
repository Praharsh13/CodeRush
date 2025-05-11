import { db } from "../libs/db.js";
import ApiErrors from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import bcrypt from 'bcrypt'
import { UserRole } from "../generated/prisma/index.js";
import ApiResponse from "../utils/api-response.js";
import generateToken from "../utils/generate-token.js";

/**
 * @description - Register user
 * @body - email,username,password
 * @route - Post
 */

const register= asyncHandler(async (req,res,next)=>{

    const {email,username, password}=req.body

    //Check if user is exist in database or not
    const existingUser= await db.user.findUnique({
        where:{
            email
        }
    })

    if(existingUser){
        throw new ApiErrors(400,"User already exist")
    }

    const hashedPassword= await bcrypt.hash(password,10)
    const newUrl="https://placehold.co/600x400"

    const newUser= await db.user.create({
        data:{
            email,
            password:hashedPassword,
            username,
            role:UserRole.USER,
            avatar:{
                url:newUrl
            }
        }


    })

    res.status(201).json(new ApiResponse(201,`${newUser.username} registered successfully`,newUser))



})

/**
 * @description login user
 * @body - {email, password}
 * @route POST
 */

const login=asyncHandler(async(req,res,next)=>{
    const {email,password}= req.body

    //Check if user exist or not
    const user= await db.user.findUnique({
        where:{
            email
        }
    })

    if(!user){
        return next(new ApiErrors(401,"User not exist! Please Register"))
    }

    //Check if password is match or not
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return next(new ApiErrors(401,"Incorrect Password"))
    }

    generateToken(res,user,`${user.username} login successfully`,200)


})

/**
 * @description : Logout user
 * @route : POST
 */

const logout= asyncHandler(async(req,res,next)=>{
    res.status(200).clearCookie("token",
        {
            httpOnly:true,
            sameSite:"strict"
        }
    ).json(new ApiResponse(200,"User logout successfully"))
})

/**
 * @description Get the crrent user detail
 * @params  take from req.user
 * @route : GET
 */
const getUser = asyncHandler(async(req,res,next)=>{
    const user= req.user
    if(!user){
        throw new ApiErrors(404, "No user found ! Please login")
    }
    res.status(200).json(new ApiResponse(200,"User found successfully", user))

})

export {
    register,
    login,
    logout,
    getUser

}