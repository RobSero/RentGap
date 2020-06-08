import axios from 'axios'
import { getToken, getUserId } from './auth'


const baseUrl = '/api'

export const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

export const getProfile = async() => {
  return await axios.get(`${baseUrl}/auth/user/`, withHeaders())
}

export const getProperties = async() => {
  return await axios.get(`${baseUrl}/property/`, withHeaders())
}

export const getOrders = async() => {
  return await axios.get(`${baseUrl}/portfolio/`, withHeaders())
}

export const getWatchlist = async() => {
  return await axios.get(`${baseUrl}/portfolio/watchlist/`, withHeaders())
}

export const watchToggle = async(id) => {
  return await axios.put(`${baseUrl}/property/${id}/`, withHeaders())
}