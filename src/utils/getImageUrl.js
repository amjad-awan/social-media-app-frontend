// utils/getImageUrl.js

export const getImageUrl = (imageId) => {
  if (!imageId) return ""; // optional: fallback for missing images
  return `${process.env.REACT_APP_API_BASE_URL}/image/${imageId}`;
};
