import express from 'express'
import isAuthenticated from '../middleware/authentication.middleware.js'
import isAdmin from '../middleware/autharization.middleware.js'
import { 
    createProblem, 
    deleteProblem, 
    getAllProblems, 
    getProblemById, 
    updateProblem } 
    from '../controllers/problem.controllers.js'

const problemRoutes=express.Router()


problemRoutes.route("/create-problem").post(isAuthenticated,isAdmin,createProblem)
problemRoutes.route("/get-all-problem").get(isAuthenticated,getAllProblems)
problemRoutes.route("/get-problem-by-id/:id").get(isAuthenticated,getProblemById)
problemRoutes.route("/update-problem/:id").put(isAuthenticated,isAdmin,updateProblem)
problemRoutes.route("/delete-problem/:id").delete(isAuthenticated,isAdmin,deleteProblem)




export default problemRoutes