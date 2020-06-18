import axios from 'axios'

export const newsAPI = async() => {
  console.log(process.env.REACT_APP_NEWSAPIKEY)
  return axios.get('http://newsapi.org/v2/everything', {
    params: {
      apiKey: process.env.REACT_APP_NEWSAPIKEY,
      q: '+london "+property" +investing'
    }
  })
}