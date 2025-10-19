// utils/getImageUrl.js

export const getImageUrl = (imageId) => {
  if (!imageId) return ""; // optional: fallback for missing images
  return `${process.env.REACT_APP_API_BASE_URL}/image/${imageId}`;
};

export const handleShare = (data) => {
  const postUrl = `${window.location.origin}/post/${data._id}`; // your single post page (or feed link)

  if (navigator.share) {
    navigator
      .share({
        title: "Check this post",
        text: data.desc || "Have a look at this post!",
        url: postUrl,
      })
      .then(() => console.log("Post shared successfully"))
      .catch((err) => console.log("Share failed:", err));
  } else {
    // fallback for desktop
    navigator.clipboard.writeText(postUrl);
    alert("Post link copied to clipboard!");
  }
};

