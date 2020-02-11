import React from 'react';

import { AuthContext, AuthContextProvider, ConnectionVue } from './Connection'
import Feed from './Feed'

const bootstrap = ({ isLoggedIn, login, token, profile }) => {
  if (isLoggedIn()) {
    return (
      <div className="root">
        <div className="header">
          <div className="header-left">
            <a href={profile.external_urls.spotify} target="_blank">
              <img className="user_img" src={profile.images[0].url}></img>
            </a>
            <span className="user_img-sub">{profile.id}</span>
          </div>
          <div className="header-central">  
            <span className="instabeat">Instabeat</span>
            <span className="instabeat-sub">Music browser</span>
          </div>
          <div className="header-right">
            <img src="help-24px.svg"></img>
          </div>
        </div>

        <Feed />
      </div>
    )
  }
  
  return <ConnectionVue login={login} />
}

function App() {
  return (
    <AuthContextProvider>
      <AuthContext.Consumer>
        {bootstrap}
      </AuthContext.Consumer>
    </AuthContextProvider>
  );
}

export default App;
