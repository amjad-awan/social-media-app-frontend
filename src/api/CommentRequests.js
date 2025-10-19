
import { API } from "./API";

export const getCommentsOnPost = (postId) => API.get(`/comments/post/${postId}`);
export const addComment = (data) => API.post(`/comments/post`, data);
export const deleteComment = (commentId) => API.delete(`/comments/post/${commentId}`);
