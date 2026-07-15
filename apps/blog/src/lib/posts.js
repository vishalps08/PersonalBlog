import api from "./api";

export const listPosts = (params) => api.get("/posts", { params });
export const getPostBySlug = (slug) => api.get(`/posts/${slug}`);
export const trackPostView = (slug) => api.post(`/posts/${slug}/view`);

export const CATEGORIES = [
  "Journal",
  "Technology",
  "Recommendations",
  "Places",
  "Life",
];
