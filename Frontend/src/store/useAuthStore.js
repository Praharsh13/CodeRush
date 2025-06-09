import {create} from "zustand"
import { axiosInstance } from "../libs/axios"
import toast from "react-hot-toast"


export const useAuthStore=create((set)=>({
    authUser:null,
    isSigninUp:false,
    isLoggingIn:false,
    isCheckingAuth:false,


    checkAuth: async ()=>{
        set({isCheckingAuth:true})
        try{
            const res=await axiosInstance.get("/auth/getuser");
            console.log("checkauth response",res.data)
            set({authUser:res.data.data})
        }
        catch(error){
            console.log("Error in checking auth", error)
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false})
        }

    },

    signup:async (data)=>{
        set({isSigninUp:true})
        try{
            const res=await axiosInstance.post("/auth/register",data)
            set({authUser:res.data.user})
            toast.success(res.data.message)
        }
        catch(error){
            console.log("Error in signing up",error)
            toast.error("Error signing up")
        }
        finally{
            set({isSigninUp:false})
        }


    },

    login:async (data)=>{
        set({isLoggingIn:true})
        try{
            const res= await axiosInstance.post("/auth/login",data)
            console.log(res)
            set({authUser:res.data.user})
            toast.success(res.data.message)
        }
        catch(error){
            console.log("Error in loging up",error.response?.data?.message)
            toast.error(`${error.response?.data?.message}`)
        }
        finally{
            set({isLoggingIn:false})
        }
    },

    logout:async ()=>{
        try{
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
            toast.success("Logout succesfully")
        }
        catch(error){
            console.log("Error loging out ", error)
            toast.error(`${error.response?.data?.message}`)
        }
    }
}))