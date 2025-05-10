import jwt from "jsonwebtoken"
import ApiResponse from "./api-response.js"

//Generating json web token
const generateToken=(res,user,message,statusCode)=>{

    const token=jwt.sign(
        {
            id:user.id
        },
        process.env.JWT_SECRET,
        {
           expiresIn:"7d"   
        }
    )

    //put token in the cookies
    res.status(200).cookie("token",token,
    {
        httpOnly:true,
        sameSite:"strict",
        maxAge:1000*60*60*24*7   //7 days
    }).json(new ApiResponse(statusCode,message,user))

}

export default generateToken