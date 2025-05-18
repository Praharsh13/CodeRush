import express from 'express'
import isAuthenticated from '../middleware/authentication.middleware.js'
import isAdmin from '../middleware/autharization.middleware.js'
import { createProblem, getAllProblems } from '../controllers/problem.controllers.js'

const problemRoutes=express.Router()


problemRoutes.route("/create-problem").post(isAuthenticated,isAdmin,createProblem)
problemRoutes.route("/get-all-problem").get(isAuthenticated,getAllProblems)




export default problemRoutes