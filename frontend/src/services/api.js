// Example API functions (in src/services/api.js)
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // update your backend URL accordingly

// Categories
export const getCategories = () => axios.get(`${API_URL}/categories`);
export const createCategory = (data) => axios.post(`${API_URL}/categories`, data);
export const updateCategory = (id, data) => axios.put(`${API_URL}/categories/${id}`, data);
export const deleteCategory = (id) => axios.delete(`${API_URL}/categories/${id}`);

// StockRecords
export const getStockRecords = () => axios.get(`${API_URL}/stockrecords`);
export const createStockRecord = (data) => axios.post(`${API_URL}/stockrecords`, data);
export const updateStockRecord = (id, data) => axios.put(`${API_URL}/stockrecords/${id}`, data);
export const deleteStockRecord = (id) => axios.delete(`${API_URL}/stockrecords/${id}`);
