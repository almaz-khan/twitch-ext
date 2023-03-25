import { useEffect, useState } from 'react';
import Characters from './components/Characters'
import { UserContext } from './components/User';

function App() {
  const [user, setUser] = useState<null | Twitch.ext.Authorized>(null);

  useEffect(() => {
    window.Twitch.ext.onAuthorized(function(user) {
      setUser(user);
    });
    
  }, [])

  return (
    <UserContext.Provider value={user}>
      <div className="container">
        <header className="flex-col">
          <h1>List of Characters</h1>
        <Characters />
        </header>
      </div>
    </UserContext.Provider>
  );
}

export default App
