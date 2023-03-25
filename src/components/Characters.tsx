import { useContext, useEffect, useState } from "react";
import { UserContext } from "./User";

interface Char {
  name: string;
  img: string;
  id: string;
  votes: number;
}
const fetchListOfChars = async () => {
  console.log(import.meta.env);
  const response = await fetch( import.meta.env.VITE_HOST + 'characters/all-characters');
  const json = await response.json();
  return json;
};

const vote = async () => {
  const response = await fetch(`vote.json`);
  const json = await response.json();
  return json;
};

const Characters = () => {
  const user = useContext(UserContext);

  const [characters, setCharacters] = useState([]);

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
            <input id={char.name} name="char" type="radio" />
            <label htmlFor={char.name}>{char.name}</label>
          </li>
        ))}
      </ul>
      {user?.userId ? (
        <input
          type="submit"
          onSubmit={() => {
            vote();
          }}
          value="Vote"
        />
      ) : (
        <p>Login to vote for your favorite character</p>
      )}
    </>
  );
};

export default Characters;
