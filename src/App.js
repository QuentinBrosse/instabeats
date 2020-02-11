import React from 'react';

import { AuthContext, AuthContextProvider, ConnectionVue } from './Connection'
import Feed from './Feed'

const bootstrap = ({ isLoggedIn, login, token, profile }) => {
  if (isLoggedIn()) {
    return (
      <div className="root">
        <div className="header">
          User: {profile.display_name}
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
