import axios from "axios";

export const diagnostApi = axios.create({
    baseURL: 'http://188.68.222.107/api/',
    headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`}
  });