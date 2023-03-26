import { useEffect, useState } from 'react';
import CharactersList from './components/CharactersList'
import { UserContext } from './components/User';

function App() {
  const [user, setUser] = useState<null | Twitch.ext.Authorized>(null);

  useEffect(() => {
    window.Twitch.ext.onAuthorized(function(user) {
      setUser(user);
    });
    
  }, [])

  return(
    <UserContext.Provider value={user}>
      <div className="container mx-auto">
        <header className="flex-col">
          <h2 className="p-2 text-lg">Select you favorite character</h2>
        <CharactersList />
        </header>
      </div>
    </UserContext.Provider>)
  ;
}

export default App
