import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'
import { errorMiddleware } from './middleware/error-handler.js'


//Routes Import
import authRoutes from './routes/auth.routes.js'
import problemRoutes from './routes/problem.routes.js'
import { codeExecutionRoutes } from './routes/executeCode.routes.js'
import submissionRoute from './routes/submission.route.js'


dotenv.config()




const app = express()


//Making read the json object
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("Hello Guys ! Welcome to Coderush")
})

//Cloudinary setup
cloudinary.v2.config({
    cloud_name:process.env.CLOUNDINARY_CLOUDNAME,
    api_key:process.env.CLOUNDINARY_API_KEY,
    api_secret:process.env.CLOUNDINARY_API_SECRET
})


//Auth Routes
app.use("/api/v1/auth", authRoutes)

app.use("/app/v1/problem", problemRoutes)

app.use("/app/v1/codeexecution", codeExecutionRoutes)

app.use("/app/v1/usersubmission", submissionRoute)

app.use(errorMiddleware)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})




/**
 * process to install prisma
 * 1. npm i prisma
 * 2. npm i @prisma/client
 * 3. npx prisma init - get all the configurations regarding prisma
 * 4. docker run --name my-postgres -e POSTGRES_USER=coderush -e POSTGRES_PASSWORD=mypassword -p 5432:5433 -d postgres installing posgres using dockers
 * 5. Make prisma client- in src folder make libs 
 * 6. Make model in schema.prisma
 * 7. npx prisma generate - we will get the ./src/generayed/prisma files
 * 8. Now in libs, make db file and "import {PrismaClient} from "../generated/prisma/index.js""
 * 9. All the confgs made in db
 * 10. npx prisma migrate dev 
 * 11. npx prisma db push
 */