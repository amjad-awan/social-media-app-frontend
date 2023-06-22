import axios from "axios";

const API = axios.create({
  baseURL: "https://social-media-mern-stack-api-yp4c.vercel.app",
});
export const uploadImage = (data) => {
  console.log("data", data);
  return API.post("/upload", data);
};
export const uploadPost = (data) => API.post("/post", data);
