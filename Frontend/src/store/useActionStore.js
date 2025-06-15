import {create} from "zustand"
import { axiosInstance } from "../libs/axios"
import { toast } from "react-hot-toast"


export const useActionsstore=create((set)=>({
    isDeletingProblem:false,
    onDeleteProblems:async(id)=>{
        try{
            set({isDeletingProblem:true})
            const res = await axiosInstance.delete(`/problem/delete-problem/${id}`)
            toast.success(res.data.message)
        }catch(error){
            console.log("Error deleting problem", error);
            toast.error("Error deleting problem");
        }finally{
            set({isDeletingProblem:false})
        }
    }
}))

