import express from 'express'
import { getAllSubmission, getAllSubmissionForProblem, getSubmissionSpecificProblem } from '../controllers/submission.controllers.js'
import isAuthenticated from '../middleware/authentication.middleware.js'


const submissionRoute= express.Router()


submissionRoute.route("/get-all-submission").get(isAuthenticated,getAllSubmission)
submissionRoute.route("/get-all-problem-specific-submission/:problemId").get(isAuthenticated,getSubmissionSpecificProblem)
submissionRoute.route("/get-problem-specific-submission-count/:problemId").get(isAuthenticated,getAllSubmissionForProblem)



export default submissionRoute