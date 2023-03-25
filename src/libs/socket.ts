import { io, Socket } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_HOST;

export const socket = io(URL, {
  auth: (cb) => {
    window.Twitch.ext.onAuthorized(function (user) {
      cb({ token: user.token, userId: user.userId });
    });
  },
});
