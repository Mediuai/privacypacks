import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
    headers: {
        'Authorization': `jbBB0PH8DyLfQASbTdmR8hT3BznqvPGEbci5XhvD166bb92f`
    }
})

export default api;
