import axios from 'axios';
import { useAuthContext } from './Connection'

export function getAPI(token, logout) {
  const instance = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  });

  instance.interceptors.response.use(response => {
    return response;
  }, error =>  {
    if (!error.response) {
      return
    }

    if (error.response.status === 401) {
      logout()
    }
    if (process.env.NODE_ENV !== 'production') {
      console.error(`API error: ${error.request.responseURL}: ${error.response.status} | ${error.response.statusText}`)
    }
    return Promise.reject(error);
  })

  return instance
}

export const useSpotify = () => {
  const { logout, token } = useAuthContext()

  const api = getAPI(token, logout)
  
  // Get recommendations.
  const getRecommendations = async (params) => {
    const recommendations = await api.get('/recommendations', {
      params,
    })
    return recommendations.data
  }

  return {
    getRecommendations,
  }
}