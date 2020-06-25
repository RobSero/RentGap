import axios from 'axios'
import { getToken } from './auth'

//  BASE URL API SUFFIX

const baseUrl = '/api'

//  RETURNS HEADER WHICH CONTAINS USERS TOKEN 

export const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

// USER RELATED AJAX CALLS - PROFILE, WATCHLISTS, ORDERS ETC

export const getProfile = async() => {
  return await axios.get(`${baseUrl}/auth/user/`, withHeaders())
}

export const getLeaders = async() => {
  return await axios.get(`${baseUrl}/leaderboard`)
}

export const getWatchlist = async() => {
  return await axios.get(`${baseUrl}/portfolio/watchlist/`, withHeaders())
}

export const getOrders = async() => {
  return await axios.get(`${baseUrl}/portfolio/`, withHeaders())
}

export const registerUser = async(userDetails) => {
  return await axios.post(`${baseUrl}/auth/register/`, userDetails)
}

export const updateUserDetails = async(userDetails) => {
  return await axios.put(`${baseUrl}/auth/profile/`, userDetails ,withHeaders())
}


// PROPERTY AJAX CALLS - WATCHING, ORDERS, DETAILS

export const getProperties = async() => {
  return await axios.get(`${baseUrl}/property/`, withHeaders())
}

export const getFeaturedProperties = async() => {
  return await axios.get(`${baseUrl}/property/featured/`, withHeaders())
}

export const getOneProperty = async(propId) => {
  return await axios.get(`${baseUrl}/property/${propId}/`, withHeaders())
}

export const watchToggle = async(id) => {
  return await axios.put(`${baseUrl}/property/${id}/`,{} , withHeaders())
}


// ORDER HANDLING AJAX REQUESTS

export const submitNewOrder = async(propId, orderDetails) => {
  return await axios.post(`${baseUrl}/orders/new/${propId}/`, orderDetails ,withHeaders())
}

export const reviseOrder = async(orderId, orderDetails) => {
  return await axios.put(`${baseUrl}/orders/edit/${orderId}/`, orderDetails ,withHeaders())
}

export const clearOrder = async(orderId) => {
  return await axios.delete(`${baseUrl}/orders/clear/${orderId}/`,withHeaders())
}



// COMMENT HANDLING AJAX CALLS

export const postComment = async(propId, commentDetails) => {
  return await axios.post(`${baseUrl}/comment/properties/${propId}/`, commentDetails ,withHeaders())
}

export const deleteComment = async(commentId) => {
  return await axios.delete(`${baseUrl}/comment/${commentId}/` ,withHeaders())
}



// NEWS AND ARTICLES AJAX CALLS

export const getArticles = async() => {
  return await axios.get(`${baseUrl}/articles`)
}

export const getArticle = async(articleId) => {
  return await axios.get(`${baseUrl}/articles/${articleId}`)
}

export const getNews = async() => {
  return await axios.get(`${baseUrl}/news/articles`)
}