import axios from "axios";

const baseURL = import.meta.env.PROD 
    ? "https://thinkboard-backend.onrender.com/api"  
    : "http://localhost:5001/api";

const api = axios.create({
    baseURL,
});

export default api;