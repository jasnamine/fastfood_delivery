// src/api/categoryApi.js
import { axiosWrapper } from "./axiosWrapper";

// Tạo category mới
export const createCategory = async (categoryData) => {
  try {
    const response = await axiosWrapper.post("/category/create", categoryData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response?.data || error.message
    );
    throw error;
  }
};
