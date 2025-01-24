import axios from "axios";  //This imports the Axios library, which is used to perform HTTP requests.

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",  // Sets the base URL for all requests
    withCredentials: true,   // sending cookoie in every singal request
}); 