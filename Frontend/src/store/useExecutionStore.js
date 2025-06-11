import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import { toast } from "react-hot-toast";

export const useExecutionStore=create((set)=>({
    isExecuting:false,
    submission:null,

    executeCode:async (source_code, language_id, stdin,expected_outputs,problemId)=>{
        try{
            set({isExecuting:true})
            console.log("submission ", JSON.stringify({
                source_code,
                language_id,
                stdin,
                expected_outputs,
                problemId
            }))
            const res=await axiosInstance.post("/codeexecution/execution",
            {source_code,language_id,stdin,expected_outputs,problemId})
            console.log("data", res.data)
            set({submission:res.data.data})
            toast.success(res.data.submission)

        }catch(error){
            console.log("Error executing code", error)
            toast.error("Error in executing code")
        }
        finally{
            set({isExecuting:false})
        }
    }
}))