import { API } from "./API";

export const getTimelinePosts = (id) => API.get(`/post/timelineposts/${id}`);
export const likePost = (id, userId) =>
  API.put(`/post/${id}/like`, { userId: userId });
