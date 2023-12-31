import axios from "axios";

const API = axios.create({
  baseURL: "https://social-media-mern-stack-api-yp4c.vercel.app",
});

export const getUser = (userId) => API.get(`/user/${userId}`);
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const getAllUser = () => API.get(`/user`);

export const followUser = (id, data) => {
  console.log("followUser id", id);
  return API.put(`/user/${id}/follow`, data);
};
export const unfollowUser = (id, data) => {
  console.log("followUser id", id);
  return API.put(`/user/${id}/unfollow`, data);
};
