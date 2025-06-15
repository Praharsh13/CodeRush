import {create} from "zustand"
import { axiosInstance } from "../libs/axios"
import { toast } from "react-hot-toast"

export const usePlaylistStore=create((set,get)=>({
    playlists:[],
    currentPlaylists:null,
    isLoading:false,
    error:null,


    createPlaylist:async (playlistData)=>{
        try{
            set({isLoading:true})
            const res=await axiosInstance.post("/playlist/create-playlist",playlistData)
            set((state)=>({
                playlists:[...state.playlists,res.data.data]
            }))

            toast.success("Playlist created successfully")
            return res.data.data
        }catch(error){
            console.error("Error in creating playlist",error)
            toast.error(error.res?.data?.error || "Failed to create playlist")
            throw error
        }finally{
            set({isLoading:false})
        }
    },

    getAllPlaylists:async ()=>{
        try{
            set({isLoading:true})
            const res= await axiosInstance.get("/playlist/get-all-playlist/")
            set({playlists:res.data.data})
        }catch(error){
            console.error("Error fetching playlist details",error)
            toast.error("Failed to fetch playlist detail")
        }finally{
            set({isLoading:false})
        }
    },

    getPlaylistDetails:async (playlistId)=>{
        try{
            set({isLoading:true})
            const res=await axiosInstance.get(`/playlist/get-playlist-detail/${playlistId}`)
            set({currentPlaylists:res.data.data})
        }catch(error){
            console.error("Error fetching playlist detail",error)
            toast.error("Failed to fetch playlist detail")
        }
        finally{
            set({isLoading:false})
        }
    },

    addProblemToPlaylist:async (playlistId,problemId)=>{
        try{
            set({isLoading:true})
            const res=await axiosInstance.post(`/playlist/add-problem/${playlistId}`,{ problemId})
            toast.success("Problem added to playlist")

            if(get().currentPlaylists?.id===playlistId){
                await get().getPlaylistDetails(playlistId)
            }
        }catch(error){

            console.error("Error adding problem to playlist",error)
            toast.error("Error adding problem to playlist")

        }finally{
            set({isLoading:false})
        }
    },

    removeProblemFromPlaylist:async (playlistId,problemId)=>{
        try{
            set({isLoading:true})
            const res= await axiosInstance.post(`/playlist/delete-prob-playlist/${playlistId}`,{problemId})
            toast.success("Problem removed from playlist")

            if(get().currentPlaylists?.id===playlistId){
                await get().getPlaylistDetails(playlistId)
            }
        }catch (error) {
            console.error("Error removing problem from playlist:", error);
            toast.error("Failed to remove problem from playlist");
          } finally {
            set({ isLoading: false });
          }
    },

    deletePlaylist: async (playlistId) => {
        try {
          set({ isLoading: true });
          await axiosInstance.delete(`/playlist/delete-playlist/${playlistId}`);
    
          set((state) => ({
            playlists: state.playlists.filter((p) => p.id !== playlistId),
          }));
    
          toast.success("Playlist deleted successfully");
        } catch (error) {
          console.error("Error deleting playlist:", error);
          toast.error("Failed to delete playlist");
        } finally {
          set({ isLoading: false });
        }
      },
}))