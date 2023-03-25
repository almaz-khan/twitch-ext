import { useContext, useEffect, useState } from "react";
import { UserContext } from "./User";
import { socket } from "../libs/socket";

interface Char {
  name: string;
  img: string;
  id: string;
  votes: number;
}
const fetchListOfChars = async () => {
  const response = await fetch( import.meta.env.VITE_HOST + 'characters/all-characters');
  const json = await response.json();
  return json;
};

const Characters = () => {
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
      })
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
      const json = await fetchListOfChars();

      setCharacters(json);
    }
    startFetchingListOfChars();
  }, []);

  return (
    <>
      <ul className="list-none">
        {characters.map((char: Char) => (
          <li key={char.id}>
            <input id={char.id} name="char" type="radio" onInput={() => {
              setSelectedCharacter(char);
            }}/>
            <label htmlFor={char.id}>
              <img src={char.img} alt={char.name} />
              <span>{char.name}</span> :
              <span>{char.votes}</span>
            </label>
          </li>
        ))}
      </ul>
      {/* <button
          type="submit"
          disabled={!selectedCharacter}
          onClick={() => {
            selectedCharacter &&
            socket.emit('vote', selectedCharacter.id);
          }}
        >Vote</button> */}
      {user?.userId ? (
         <button
          type="submit"
          disabled={!selectedCharacter}
          onClick={() => {
            selectedCharacter &&
            socket.emit('vote', selectedCharacter.id);
          }}
        >Vote</button>
      ) : (
        <p>Login to vote for your favorite character</p>
      )}
    </>
  );
};

export default Characters;
