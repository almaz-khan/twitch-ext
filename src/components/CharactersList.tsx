import { useContext, useEffect, useState } from 'react';
import { UserContext } from './User';
import { socket } from '../libs/socket';
import { Char, Character } from './Character';

const fetchListOfChars = async (user: null | Twitch.ext.Authorized) => {
  const response = await fetch(
    import.meta.env.VITE_HOST + 'characters/all-characters',
    {
      method: 'GET',
      headers: {
        token: user ? user.token : '',
        'user-id': user ? user.userId : '',
      },
    },
  );
  const json = await response.json();
  return json;
};

const CharactersList = () => {
  useEffect(() => {
    function onVoteEvent(char: Char) {
      setCharacters((prev: Char[]) => {
        const newChars = prev.map((c: Char) => {
          if (c.id === char.id) {
            return char;
          }
          return c;
        });
        return newChars;
      });
    }

    socket.on('vote', onVoteEvent);

    return () => {
      socket.off('vote', onVoteEvent);
    };
  }, []);

  const user = useContext(UserContext);

  const [characters, setCharacters] = useState<Char[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Char | null>(null);

  useEffect(() => {
    async function startFetchingListOfChars() {
      const json = await fetchListOfChars(user);

      setCharacters(json);
    }
    startFetchingListOfChars();
  }, []);

  const isAuthorized = user?.userId?.[0] === 'U';

  return (
    <div className="px-2">
      <ul className="list-none">
        {characters.map((char: Char) => (
          <Character char={char} setSelectedCharacter={setSelectedCharacter} />
        ))}
      </ul>
      {isAuthorized ? (
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          type="submit"
          disabled={!selectedCharacter}
          onClick={() => {
            selectedCharacter && socket.emit('vote', selectedCharacter.id);
          }}
        >
          Vote
        </button>
      ) : (
        <p>Login to vote for your favorite character</p>
      )}
    </div>
  );
};

export default CharactersList;
