import { db } from "../libs/db.js";
import ApiErrors from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import bcrypt from 'bcrypt'
import { UserRole } from "../generated/prisma/index.js";
import ApiResponse from "../utils/api-response.js";
import generateToken from "../utils/generate-token.js";
import temporaryTokenGenration from "../utils/token-gen.js";
import { emailVerifivationMailContent, sendEmail } from "../utils/email.js";
import crypto from 'crypto'

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

    const {unhashedToken, hashedToken, expiryDate}=temporaryTokenGenration();
    const verificationUrl=`${process.env.BASE_URL}verifyemail/${unhashedToken}`

    const newUser= await db.user.create({
        data:{
            email,
            password:hashedPassword,
            username,
            role:UserRole.USER,
            avatar:{
                url:newUrl
            },
            emailVerificationToken:hashedToken,
            emailVerificationExpiry:expiryDate

        }


    })

    const mailOpions={
        email,
        subject:"Welcome to CodeRush !! Please verify your email",
        mailgenContext:emailVerifivationMailContent(username,verificationUrl)
    }

    sendEmail(mailOpions)

    res.status(201).json(new ApiResponse(201,`${newUser.username} registered successfully`,newUser))



})

/**
 * @description verify the email
 * @param - email verification token
 * @route - post
 */

const emailVerification= asyncHandler(async(req,res,next)=>{
    const {verificationtoken}= req.params
    const token=crypto.createHash("sha256").update(verificationtoken).digest("hex")

    const user= await db.user.findFirst({
        where:{

            emailVerificationToken:token

        }
    })

    if(!user){
        throw new ApiErrors(404, "Token is not valid or no user exist")
    }

    if(user.emailVerificationExpiry<Date.now()){
        throw new ApiErrors(400,"Token is expired. Please resend the verification mail")
    }

    await db.user.update({
        where:{
            id:user.id
        },
        data:{
           isEmailVerified:true,
           emailVerificationToken:null,
           emailVerificationExpiry:null

        }
    })

    res.status(200).json(new ApiResponse(200,"User email verified successfully",user))

    
})

/**
 * @description resend email verification email
 * @body email
 * @route post
 * 
 */
const resendVerificationEmail=asyncHandler(async(req,res,next)=>{
    const {email}=req.body
    if(!email){
        throw new ApiErrors(401,"Email is required")
    }

    const user =await db.user.findUnique({
        where:{
            email
        }
    })
   

    if(!user){
        throw new ApiErrors(404,"Email is not registered , Please register")
    }

    if(user.isEmailVerified){
        throw new ApiErrors(400, "Email is already verified")
    }

    const {unhashedToken, hashedToken, expiryDate}=temporaryTokenGenration();
    const verificationUrl=`${process.env.BASE_URL}/app/v1/auth/verifyemail/${unhashedToken}`

    await db.user.update({
        where:{
            id:user.id
        },
        data:{
            emailVerificationToken:hashedToken,
            emailVerificationExpiry:expiryDate
        }
    })
    
    const mailOpions={
        email,
        subject:"Welcome to CodeRush !! Please verify your email",
        mailgenContext:emailVerifivationMailContent(user.username,verificationUrl)
    }

    sendEmail(mailOpions)

    res.status(200).json(new ApiResponse(200,"Email resend successfully"))

       
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
    getUser,
    emailVerification,
    resendVerificationEmail

}