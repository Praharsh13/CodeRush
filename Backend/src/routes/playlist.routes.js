import { Router } from "express";
import isAuthenticated from "../middleware/authentication.middleware.js";
import { addProblemToPlaylist, createPlaylist, deletePlaylist, getAllPlayListDetails, getplaylistDetails, removeProblemfromPlaylist } from "../controllers/playlist.controllers.js";


const playlistRouter=Router()


playlistRouter.route("/create-playlist").post(isAuthenticated,createPlaylist)
playlistRouter.route("/get-all-playlist").get(isAuthenticated,getAllPlayListDetails)
playlistRouter.route("/get-playlist-detail/:playlistId").get(isAuthenticated,getplaylistDetails)
playlistRouter.route("/add-problem/:playlistId").post(isAuthenticated,addProblemToPlaylist)
playlistRouter.route("/delete-playlist/:playlistId").delete(isAuthenticated,deletePlaylist)
playlistRouter.route("/delete-prob-playlist/:playlistId").delete(isAuthenticated,removeProblemfromPlaylist)



export default playlistRouter