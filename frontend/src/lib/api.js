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

export const getOneProperty = async(propId) => {
  return await axios.get(`${baseUrl}/property/${propId}/`, withHeaders())
}


export const submitNewOrder = async(propId, orderDetails) => {
  return await axios.post(`${baseUrl}/orders/new/${propId}/`, orderDetails ,withHeaders())
}

export const reviseOrder = async(orderId, orderDetails) => {
  return await axios.put(`${baseUrl}/orders/edit/${orderId}/`, orderDetails ,withHeaders())
}

export const clearOrder = async(orderId) => {
  return await axios.delete(`${baseUrl}/orders/clear/${orderId}/`,withHeaders())
}

export const postComment = async(propId, commentDetails) => {
  return await axios.post(`${baseUrl}/comment/properties/${propId}/`, commentDetails ,withHeaders())
}

export const registerUser = async(userDetails) => {
  return await axios.post(`${baseUrl}/auth/register/`, userDetails)
}

export const updateUserDetails = async(userDetails) => {
  return await axios.put(`${baseUrl}/auth/profile/`, userDetails ,withHeaders())
}