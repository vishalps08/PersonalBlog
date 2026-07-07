import api from "./api";

export const getAdminPosts = (params) => api.get("/posts/admin/all", { params });
export const getAdminPost = (id) => api.get(`/posts/admin/${id}`);
export const createPost = (data) => api.post("/posts", data);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("image", file);
  return api.post("/media/upload", formData);
};

export const CATEGORIES = ["Journal", "Technology", "Recommendations", "Places", "Life"];