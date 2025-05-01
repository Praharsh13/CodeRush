import express from 'express'
import dotenv from 'dotenv'


dotenv.config()




const app = express()


//Making read the json object
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hello Guys ! Welcome to Coderush")
})

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
 * 10. npx prisma midrate dev 
 * 11. npx prisma db push
 */