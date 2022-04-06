import axios from "axios";

export const diagnostApi = axios.create({
    baseURL: 'http://localhost:5000/api/',
  });