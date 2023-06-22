import axios from "axios";

const API = axios.create({
  baseURL: "https://social-media-mern-stack-api-yp4c.vercel.app",
});

export const logIn = (formData) => API.post("/auth/login", formData);

export const signUp = (formData) => API.post("/auth/register", formData);
