// src/utils/axios.ts
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosInstance

export const apiGet = (url: string, config = {}) =>
  axiosInstance.get(url, config)
export const apiPost = (url: string, data: any, config = {}) =>
  axiosInstance.post(url, data, config)
export const apiPut = (url: string, data: any, config = {}) =>
  axiosInstance.put(url, data, config)
export const apiDelete = (url: string, config = {}) =>
  axiosInstance.delete(url, config)
