import axios from "axios";

// const API = axios.create({
//   baseURL: "https://social-media-mern-stack-api-yp4c.vercel.app",
// });
export const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
