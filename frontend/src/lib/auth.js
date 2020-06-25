
export const setToken = token => {
  window.localStorage.setItem('token', token)
}

export const getToken = () => {
  return window.localStorage.getItem('token')
}

export const logout = () => {
  localStorage.removeItem('token')
}


// GET TOKEN FROM LOCALSTORAGE AND DETERMINE IF VALID - IF VALID, WILL RETURN MIDDLE SECTION OF TOKEN
export const getPayload = () => {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3)  return false 
  return JSON.parse(window.atob(parts[1]))
}

// IF VALID TOKEN IS FOUND, WILL RETURN USER ID
export const getUserId = () => {
  return getPayload().sub
}


// WILL DETERMINE IF USER IS VALIDATED - CHECKS IF TOKEN EXISTS, IF IT DOES, CHECKS IF THE DATE IS WITHIN THE TOKEN EXPIRY DATE
export const isAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000)
  return now < payload.exp
}

