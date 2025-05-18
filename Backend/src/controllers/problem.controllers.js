import { db } from "../libs/db.js";

import { asyncHandler } from "../utils/async-handler.js";
import ApiErrors from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import { getJudge0LanguageId, pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

/**
 * @description : Create problem 
 * @params : All data get from Problem model
 * @route : POST
 * @route access Private - Admin only
 */
const createProblem=asyncHandler(async(req,res,next)=>{

    // 1. Get all the data from body 
    const {
        title,
        description,
        difficulty,
        tags,
        example,
        constraints,
        hints,
        editorial,
        testcases,
        codeSnippets,
        referenceSolution
    } = req.body

    console.log(req.body)

    // 2. Check if user role is Admin
    const user= req.user
    console.log(user)

    if(!user || user.role !=="ADMIN"){
        throw new ApiErrors(403, "Access Denied")
    }

    // 3. In reference solution we have key value JSON data { js: solution, java: solution}
    // we need to map it to language id so Judge0 endpoint can understand

    for(const [language,solutionCode] of Object.entries(referenceSolution)){
        // Get each key value in array format
        const languageId=getJudge0LanguageId(language)   // get the id of language

        if(!languageId){
            throw new ApiErrors(400, `Language ${language} is not supported`)
        }


        

        // 4. For each solution , we also need to add test cases and create a code submission 
        const submissions= testcases.map(({input, output})=>({
            source_code:solutionCode,
            language_id:languageId,
            stdin:input,
            expected_output:output
        }))

       console.log(submissions)

       // console.log("submission code " ,submissions)
        
        const submissionResults = await submitBatch(submissions)
       

        const tokens= submissionResults.map((res)=>res.token)
        console.log(  "data is", tokens) 
        const results=await pollBatchResults(tokens)

        for(let i=0;i<results.length;i++){
            const result=results[i]
           console.log("Result-------",result)
        

        if(result.status.id !==3){
            throw new ApiErrors(400, `Testcase ${i+1} failed for ${language}`)

        }
    }


    }

    const newProblem= await db.problem.create({
        data:{
            title,
            description,
            difficulty,
            tags,
            example,
            constraints,
            hints,
            editorial,
            testcases,
            codeSnippets,
            referenceSolution,
            userId:req.user.id

        }
    })

    res.status(201).json(new ApiResponse(201,"Problem created successful",newProblem))

    if(!newProblem){
        throw new ApiErrors(500,"Error in creating problem")
    }

})

/**
 * @desc Get all the problems
 * @Route GET
 * @access Public
 */
const getAllProblems= asyncHandler(async (req,res,next)=>{
    const problems= await db.problem.findMany()
    if(!problems){
        throw new ApiErrors(404,"No Problems Found")
    }

    res.status(200).json(new ApiResponse(200, "All problems", problems)
    )
})

/**
 * @desc Get a problem based on the id
 * @params - String - Id of the problem
 * @route GET
 * @Access Public
 */
const getProblemById=asyncHandler(async(req,res,next)=>{

    const {id} = req.params

    const problem =await db.problem.findUnique({
        where:{
            id
        }
    })

    if(!problem){
        throw new ApiErrors(404, "Problem not found!")
    }

    res.status(200).json(new ApiResponse(200, "Problem is found", problem))

})

/**
 * @desc Update the given problem
 * @params - String - Id of the problem
 * @body - all problem body
 * @route PUT
 * @access Public
 */

const updateProblem= asyncHandler(async(req,res,next)=>{
    const {
        title,
        description,
        difficulty,
        tags,
        example,
        constraints,
        testcases,
        codeSnippets,
        referenceSolution,
        hints,
        editorial
    } = req.body

    const {id}=req.params 
    const user=req.user
    if(!user || !user.role=='ADMIN'){
        throw new ApiErrors(404,"User not found")
    }

    const problem= await db.problem.findUnique({
        where:{
            id
        }
    })
    console.log("user id is", user.id)
    console.log("problem id ", problem.userId)

    if(user.id!==problem.userId){
        throw new ApiErrors(401,"Not authorized to change")
    }

    

    for(const [language,solutionCode] of Object.entries(referenceSolution)){
        const languageId=getJudge0LanguageId(language)

        if(!languageId){
            throw new ApiErrors(404,`Language ${language} is not supported`)
        }

        const submission=testcases.map(({input,output})=>({
            source_code:solutionCode,
            language_id:languageId,
            stdin:input,
            expected_output:output
        }))

        const submissionResults=await submitBatch(submission)

        const tokens = submissionResults.map((res)=>res.token)

        const results = await pollBatchResults(tokens)

        for(let i=0;i<results.length;i++){
            const result=results[i]

            console.log("Results----", result)

            if(result.status.id!==3){
                throw new ApiErrors(400, `Testcase ${i+1} failed for language ${language}`)
            }
        }

        
    }

    const updatedProblem=await db.problem.update({
        where :{
            id
        },
        data: {

            title,
            description,
            difficulty,
            tags,
            example,
            constraints,
            hints,
            editorial,
            testcases,
            codeSnippets,
            referenceSolution,
            userId:req.user.id

        }
    })

    res.status(201).json(new ApiResponse(201,"Problem Updated succesfully",updatedProblem))
})

/**
 * @desc Delete specific problem
 * @params - string - id of the problem
 * @route - Delete
 * @access - Private - Only Admin
 */
const deleteProblem= asyncHandler(async(req,res,next)=>{
    const {id}= req.params

    const user=req.user

    if(!user || !user.role=='ADMIN'){
        throw new ApiErrors(403, "Not authorized")
    }

    const problem=await db.problem.findUnique({
        where:{id}
    })

    if(!problem){
        throw new ApiErrors(404,"Problem not found")
    }

    const deleteProblem=await db.problem.delete({
        where:{id}
    })

    res.status(201).json(new ApiResponse(201,"Problem deleted successfully",deleteProblem))
})




export { 
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem
}