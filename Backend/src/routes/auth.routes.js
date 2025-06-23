import express from 'express';

import { 
    emailVerification,
    getUser,
    login, 
    logout, 
    register, 
    resendVerificationEmail}
    from "../controllers/auth.controllers.js";
import isAuthenticated from '../middleware/authentication.middleware.js';


const authRoutes = express.Router();





//Register route
authRoutes.route("/register").post(register)
authRoutes.route("/login").post(login)
authRoutes.route("/logout").post(isAuthenticated,logout)
authRoutes.route("/getuser").get(isAuthenticated,getUser)
authRoutes.route("/verifyemail/:verificationtoken").post(emailVerification)
authRoutes.route("/resendverificationmail").post(resendVerificationEmail)



export default authRoutes