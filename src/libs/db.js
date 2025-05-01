import {PrismaClient} from "../generated/prisma/index.js"

//Db set up for prisma from documentation


const globalForPrisma=globalThis;

export const db = globalForPrisma.prisma || new PrismaClient();

if(process.env.Node_ENV !== "production") globalForPrisma.prisma = db