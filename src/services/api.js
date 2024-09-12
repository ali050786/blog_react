// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

export const getPost = async (id) => {
  const response = await axios.get(`${API_URL}/posts/${id}`);
  return response.data;
};

export const createPost = async (postData, auth) => {
  const response = await axios.post(`${API_URL}/posts`, postData, { auth });
  return response.data;
};

export const updatePost = async (id, postData, auth) => {
  const response = await axios.put(`${API_URL}/posts/${id}`, postData, { auth });
  return response.data;
};

export const deletePost = async (id, auth) => {
  await axios.delete(`${API_URL}/posts/${id}`, { auth });
};

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, {}, { auth: { username, password } });
  return response.data;
};