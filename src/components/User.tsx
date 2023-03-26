import { createContext } from 'react';

export const UserContext = createContext<null | Twitch.ext.Authorized>(null);
