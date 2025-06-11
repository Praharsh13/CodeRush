import {create} from 'zustand'

import {toast} from 'react-hot-toast'
import { axiosInstance } from '../libs/axios'



export const useProblemStore = create((set)=>({
    problems:[],
    problem:null,
    solvedProblems:[],
    isProblemsLoading:false,
    isProblemLoading:false,


    getAllProblems:async ()=>{
        try{
            set({isProblemsLoading:true})

            const res=await axiosInstance.get("/problem/get-all-problem")
          //console.log("res data", res.data)

            set({problems:res.data.data})
           
        }catch(error){
            console.log("Error in getting the problems", error)
            toast.error("Errors in getting data")
        }finally{
            set({isProblemsLoading:false})
        }
    },

    getProblemById: async (id)=>{
        try{
            set({isProblemLoading:true})

            const res = await axiosInstance(`/problem/get-problem-by-id/${id}`)

            set({problem:res.data.data})
        }catch(error){
           console.log("Error in getting problem",error)
           toast.error("Error in loading problem")
        }finally{
            set({isProblemLoading:false})
        }  
    },

    getSolvedProblemByUser:async ()=>{
        try{
            const res=await axiosInstance.get("/problem/problem-solved-by-user")
            set({
                solvedProblems:res.data.data
            })
        }catch(error){
            console.log("Error in getting solved problem",error)
            toast.error("Error in getting solved problem")
        }
    }
}))