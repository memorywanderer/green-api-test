import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL ?? "https://api.green-api.com";

const baseUrl = apiUrl.replace(/\/$/, "");

console.log("BASE URL", baseUrl);

export const apiClient = axios.create({
    baseURL: baseUrl,
});
