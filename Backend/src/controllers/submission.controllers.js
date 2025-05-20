import { db } from "../libs/db.js";
import ApiErrors from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import validator from 'validator'



/**
 * @description get all the submissions of the user
 * @route GET
 * @access User only
 */


const getAllSubmission= asyncHandler(async(req,res,next)=>{
    const user= req.user

    const submissions= await db.submission.findMany({
        where:{
            userId:user.id
        }
    })

    if(!submissions){
        throw new ApiErrors(404, "No submission found")
    }

    res.status(200).json(new ApiResponse(200,"Submissions are", submissions))


})

/**
 * @description get the submission of the specific problem - all the testcases
 * @params - String - problemId - id of the problem
 * @route - GET
 * @access - user only
 */

const getSubmissionSpecificProblem=asyncHandler(async(req,res,next)=>{
    const {problemId}= req.params
    const userId=req.user.id

    if(!validator.isUUID(problemId)){
        throw new ApiErrors(400, "Not a valid problem Id")
    }


    const submission=await db.submission.findMany({
        where:{
            problemId,
            userId
        }
    })

    if(!submission){
        throw new ApiErrors(400, "Unable to fetch submissions")
    }

    res.status(200).json(new ApiResponse(200,"Submissions are", submission))
})


/**
 * @description - get all count of submission of specific problem
 * @params - {String} - problemId - id of the problem
 * @route - GET
 * @access - user only
 */

const getAllSubmissionForProblem=asyncHandler(async(req,res,next)=>{
    const {problemId}= req.params

    if(!validator.isUUID(problemId)){
        throw new ApiErrors(400,"Not a valid problem")
    }

    const submissionCount= await db.submission.count({
        where:{
            problemId
        }
    })

    if(!submissionCount){
        throw new ApiErrors(400,"Not able to fetch submission count")
    }

    res.status(200).json(new ApiResponse(200,"Submission count is" , submissionCount))
})


export {getAllSubmission, getSubmissionSpecificProblem, getAllSubmissionForProblem}