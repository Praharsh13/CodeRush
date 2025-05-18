import { db } from "../libs/db.js";
import ApiErrors from "../utils/api-error.js";



const isAdmin=async(req,res,next)=>{
    const userId=req.user.id

    const user=await db.user.findUnique({
        where:{
            id:userId
        },
        select:{
            role:true
        }
    })

    if(!user || user.role !== "ADMIN"){
        throw new ApiErrors(403,"Access Denied")
    }

    next()

}

export default isAdmin