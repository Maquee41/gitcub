import axios from 'axios'

const BASE_URL = 'https://api.github.com'

const token = import.meta.env.VITE_GH_TOKEN

export const baseClient = axios.create({
  baseURL: BASE_URL,
  headers: token ? { Authorization: `Bearer ${token}` } : {},
})
