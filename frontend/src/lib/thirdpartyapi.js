import axios from 'axios'

export const newsAPI = async() => {
  return axios.get('https://newsapi.org/v2/everything', {
    params: {
      apiKey: process.env.REACT_APP_NEWSAPIKEY,
      q: '+london "+property" +investing'
    }
  })
}