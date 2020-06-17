import axios from 'axios'

export const newsAPI = async() => {
  return axios.get('http://newsapi.org/v2/everything', {
    params: {
      apiKey: '8d5372b361a2426b9c66828a1a539093',
      q: '+london "+property" +investing'
    }
  })
}