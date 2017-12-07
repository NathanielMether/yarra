import axios from 'axios'
import { saveToken, getValidToken } from './token'

const api = axios.create({
  baseURL: 'http://localhost:7000'
})

export function setToken(token) {
  saveToken(token)

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } 
  else {
    delete api.defaults.headers.common['Authorization']
  }
}

// Validates token and if it's invalid remove it from local storage
setToken(getValidToken())

export default api