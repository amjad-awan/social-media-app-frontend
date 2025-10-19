import { API } from "./API";

export const getTimelinePosts = (id) => API.get(`/post/timelineposts/${id}`);
export const likePost = (id, userId) =>
  API.put(`/post/${id}/like`, { userId: userId });
// export const deletePost = (postId) => API.delete(`/post/${postId}`);

export const deletePost = (id, userId) =>
  API.delete(`/post/${id}`, { data: { userId } });

