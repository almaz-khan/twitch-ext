import { useContext } from "react";
import { UserContext } from "./User";

export interface Char {
  name: string;
  img: string;
  id: string;
  votes: number;
  isMyVote: boolean;
}

export const Character = ({
  char,
  setSelectedCharacter,
}: {
  char: Char;
  setSelectedCharacter: (char: Char) => void;
}) => {
  const user = useContext(UserContext);

  return (
    <li key={char.id} className="py-1">
      <label className="flex relative w-full" htmlFor={char.id}>
        {user?.userId ? (
          <input
            className="absolute bottom-0 left-0"
            id={char.id}
            checked={char.isMyVote}
            name="char"
            type="radio"
            onInput={() => {
              setSelectedCharacter(char);
            }}
          />
        ) : null}
        <img className="h-10" src={char.img} alt={char.name} />
        <div className="flex-column text-sm h-10 px-2">
          <div className="flex-grow">{char.name}</div>
          <div className="flex-grow">{char.votes}</div>
        </div>
      </label>
    </li>
  );
};
