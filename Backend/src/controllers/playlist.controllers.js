import validator from "validator";
import { db } from "../libs/db.js";
import ApiErrors from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";


/**
 * @desc Creating the playlist
 * @body take name and description as body
 * @route POST
 * @access User specified
 */

const createPlaylist= asyncHandler(async(req,res,next)=>{
    const {name, description}=req.body

    const userId= req.user.id


    const playlist= await db.playlist.create({
        data:{
            name,
            description,
            userId
        }
    })

    res.status(201).json(new ApiResponse(200,"Playlist created successfully",playlist))
})

/**
 * @description get all playlist detail of the user
 * @access user only
 * @route GET
 */

const getAllPlayListDetails=asyncHandler(async(req,res,next)=>{

    const allPlayList= await db.playlist.findMany({
        where:{
            userId:req.user.id
        },
        include:{
            problems:{
                include:{
                    problem:true
                }
            }
        }
    })

    res.status(200).json(new ApiResponse(200,"All playlist",allPlayList))
})






/**
 * @description get the detail of specific playlist
 * @params - String - playlistId id of the playlist
 * @access user specific
 * @route GET
 */

const getplaylistDetails= asyncHandler(async(req,res,next)=>{
    const {playlistId}= req.params
    const playlistDetail=await db.playlist.findUnique({
        where:{
            userId:req.user.id,
            id:playlistId
        },
        include:{
            problems:{
                include:{
                    problem:true
                }
            }
        }
    })

    res.status(200).json(new ApiResponse(200,"Playlist detail",playlistDetail))
})


/**
 * @description add problem to the playlist
 * @params playlistId - id of the playlist
 * @body problemids - ids of the problem
 * @route POST
 * @access User only
 */

const addProblemToPlaylist= asyncHandler(async(req,res,next)=>{
    const {playlistId}=req.params
    const {problemId}=req.body

    console.log(problemId)

    //check if array is empty or not
    if(!Array.isArray(problemId) || problemId.length==0){
        throw new ApiErrors(403,"There is no problem id")
    }

    if(!validator.isUUID(playlistId)){
        throw new ApiErrors(401, "playlist id is not good")
    }

    const problemAdded=await db.problemInPlaylist.createMany({
        data:problemId.map((problemId)=>({
            playlistId,
            problemId
        }))
    })

    res.status(201).json(new ApiResponse(201,"Problem Added",problemAdded))

})

/**
 * @description delete the playlist 
 * @params - srting - playlistId - id of the playlist
 * @route - DELETE
 * @access - user only
 */

const deletePlaylist= asyncHandler(async(req,res,next)=>{
    const {playlistId}= req.params

    const delPlaylist= await db.playlist.delete({
        where:{
            userId:req.user.id,
            id:playlistId
        }
    })

    res.status(201).json(new ApiResponse(201,"Playlist deleted successfully",delPlaylist))
})

/**
 * @description remove problem from the playlist
 * @params -string - playlistId - id of the playlist
 * @body - string - problemId - id of the problem
 * @access usser only
 * @route DELETE
 */
const removeProblemfromPlaylist= asyncHandler(async(req,res,next)=>{
    const {playlistId}=req.params
    const {problemId}=req.body

    const removeProblem= await db.problemInPlaylist.deleteMany({
        where:{
            playlistId,
            problemId
        }
    })

    res.status(200).json(new ApiResponse(200,"problem deleted successfully",removeProblem))
})

export {createPlaylist,
    getAllPlayListDetails,
    getplaylistDetails,
    addProblemToPlaylist,
    deletePlaylist,
    removeProblemfromPlaylist
}
