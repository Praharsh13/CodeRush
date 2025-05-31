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
            set({authUser:res.data})
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
            set({authUser:res.data.user})
            toast.success(res.data.message)
        }
        catch(error){
            console.log("Error in loging up",error)
            toast.error("Error in loging up")
        }
        finally{
            set({isLoggingIn:false})
        }
    },

    logout:async ()=>{
        try{
            await axiosInstance("/auth/logout")
            set({authUser:null})
            toast.success("Logout succesfully")
        }
        catch(error){
            console.log("Error loging in ", error)
            toast.error("Error in logging out")
        }
    }
}))