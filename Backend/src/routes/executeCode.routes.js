import express from 'express'
import isAuthenticated from '../middleware/authentication.middleware.js'
import { executeCode } from '../controllers/executeCode.controllers.js'

const codeExecutionRoutes= express.Router()


codeExecutionRoutes.route("/execution").post(isAuthenticated,executeCode)

export {codeExecutionRoutes}