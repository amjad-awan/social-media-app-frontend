import { API } from "./API";

// Get all notifications for logged-in user
export const getNotifications = (userId) => API.get(`/notifications/${userId}`);

// Create notification (called when someone likes/comments)
export const createNotification = (data) => API.post(`/notifications`, data);

// Mark a notification as read
export const markNotificationRead = (notificationId) =>
  API.put(`/notifications/read/${notificationId}`);

// Delete notification
export const deleteNotification = (notificationId) =>
  API.delete(`/notifications/${notificationId}`);
