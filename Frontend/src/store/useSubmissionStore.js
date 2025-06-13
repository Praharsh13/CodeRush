import {create} from "zustand"
import { axiosInstance } from "../libs/axios"
import toast from "react-hot-toast"

export const useSubmissionStore=create((set)=>({
    isLoading:false,
    submissions:[],
    submission:null,
    submissionCount:null,

    getAllSubmissions:async ()=>{
        try{
            set({isLoading:true})
            const res=await axiosInstance.get("/usersubmission/get-all-submission") 
            set({submissions:res.data.data})
        }catch(error){
            console.log("Problem with getting submissions", error.message)
            toast.error("Error in getting submission")
        }
        finally{
            set({isLoading:false})
        }
    },

    getSubmissionForProblem:async (problemId)=>{
        try{
            const res= await axiosInstance.get(`/usersubmission/get-all-problem-specific-submission/${problemId}`)
            set({submission:res.data.data})
            console.log("useStore submission", res.data.data)
        }catch(error){
            console.log("Problem with getting submission for problem", error)
            toast.error("Error in getting submission for problem")
        }
    },

    getSubmissionCountForProblem: async (problemId)=>{
        try{
            const res= await axiosInstance.get(`/usersubmission/get-problem-specific-submission-count/${problemId}`)
            set({submissionCount:res.data.data})
        }catch(error){
            console.log("Problem with getting submissions count", error.message)
            toast.error("Error in getting submissions count")
        }
    }


}))