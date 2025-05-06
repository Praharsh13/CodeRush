import express from 'express';

import { login, logout, register } from "../controllers/auth.controllers.js";
import isAuthenticated from '../middleware/authentication.middleware.js';


const authRoutes = express.Router();





//Register route
authRoutes.route("/register").post(register)
authRoutes.route("/login").post(login)
authRoutes.route("/logout").post(isAuthenticated,logout)




export default authRoutes