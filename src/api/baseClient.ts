import axios from 'axios'

const BASE_URL = 'https://api.github.com'

export const baseClient = axios.create({
  baseURL: BASE_URL,
})
