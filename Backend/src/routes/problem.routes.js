import express from 'express'
import isAuthenticated from '../middleware/authentication.middleware'
import isAdmin from '../middleware/autharization.middleware'
import { createProblem } from '../controllers/problem.controllers.js'

const problemRoutes=express.Router()


problemRoutes.route("/create-problem").post(isAuthenticated,isAdmin,createProblem)




export default problemRoutes