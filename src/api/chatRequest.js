import { API } from "./API";

export const createChat = (data) => API.post("/chat/createChat", data);
export const getUserChats = (userId) => API.get(`/chat/${userId}`);
export const markAsRead = (chatId, userId) =>
  API.post("/chat/mark-read", { chatId, userId });

// Get messages of a chat
export const getChatMessages = (chatId) => API.get(`/message/${chatId}`);

// Send a message
export const sendMessage = (data) => API.post("/message/send", data);


