import React, { createContext, useEffect, useState, useContext } from 'react';
import { getAPI } from './Spotify';

// Authantication implements the "implicit grant flow" from Spotify.
// https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow
// TODO: Add a state ceck.

const authorizeBaseURL = 'https://accounts.spotify.com/authorize'
// https://developer.spotify.com/dashboard/applications/d0f389704ccf4895befd9611b756f9a7
const clientID = 'd0f389704ccf4895befd9611b756f9a7' 
const redirectURI = 'http://localhost:3000'
const scope = [
  'user-read-currently-playing',
  'user-read-playback-state'
];

const initialSession = {
  token: null,
  profile: null,
}

export const AuthContext = createContext(initialSession) 

export const AuthContextProvider = function ({children}) {
  const [state, setState] = useState(initialSession)

  const logout = () => {
    window.localStorage.removeItem('session')
    setState(initialSession)
  }

  const login = async token => {
    window.localStorage.setItem('session', JSON.stringify({token}))

    // Get user profile.
    const profile = await getAPI(token, logout)('/me')
    setState({...state, token, profile: profile.data})
  }

  const isLoggedIn = () => state.token !== null

  if (!isLoggedIn()) {
    // Try to get the token from local storage.
    const rawSession = window.localStorage.getItem('session')
    if (rawSession) {
      // TODO: Check expiration date.
      const s = JSON.parse(rawSession)
      login(s.token)
    }
  }
  
  return (
    <AuthContext.Provider value={{...state, login, logout, isLoggedIn}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}

// Get auth data from URL hash.
function getHash() {
  const hash = window.location.hash || ""
  window.location.hash = '' // Get rid of hash

  return hash.substring(1)
  .split("&")
  .reduce((initial, item) => {
    if (item) {
      const parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }

    return initial;
  }, {});
}

export function ConnectionVue({login}) {
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    const hash = getHash()
    if (hash.access_token) {
      login(hash.access_token)
      return
    }

    if (hash.error) {
      setAuthError(hash.error)
    }
  }, [login])

  return (
    <div>
      {authError && <p>Error: {authError}</p>}

      <a href={`${authorizeBaseURL}?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&scope=${scope.join('%20')}`}>
        Connect with Spotify
      </a>
    </div>
  )
}
