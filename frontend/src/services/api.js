import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getUsers = () => axios.get(`${BASE_URL}/users`);
export const getScore = (id) => axios.get(`${BASE_URL}/score/${id}`);
export const filterUsers = (category) =>
  axios.get(`${BASE_URL}/filter?category=${category}`);