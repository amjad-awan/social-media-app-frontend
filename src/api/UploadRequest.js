import { API } from "./API";

export const uploadImage = (data) => {
  return API.post("/upload", data);
};
export const uploadPost = (data) => API.post("/post", data);
