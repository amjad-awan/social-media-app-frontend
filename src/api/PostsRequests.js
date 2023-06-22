import axios from "axios";

const API = axios.create({
  baseURL: "https://social-media-mern-stack-api-yp4c.vercel.app",
});

export const getTimelinePosts = (id) => API.get(`/post/timelineposts/${id}`);
export const likePost = (id, userId) =>
  API.put(`/post/${id}/like`, { userId: userId });
