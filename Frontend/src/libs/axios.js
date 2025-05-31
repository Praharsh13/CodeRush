//We are creating the function for axios call with the server path
//creating a custom instance of Axios with specific configurations



import axios from 'axios'


export const axiosInstance= axios.create({
    baseURL:import.meta.env.MODE === "development" ? "http://localhost:8080/api/v1" : "http://localhost:8080/api/v1",
    withCredentials:true
})