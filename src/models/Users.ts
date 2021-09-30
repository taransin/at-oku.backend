import { Socket } from 'socket.io';

export type User = {
  id: string,
  username: string
}

let users:User[] = [];

const login = (socket: Socket): { error: string; } | undefined => {
  if (!socket.handshake.query.username) {
    console.warn('User/login: someone is trying to connect without a username!!!');
    return;
  }
  const username = socket.handshake.query.username as string;

  const existingSocket = users.find(users => users.id === socket.id);

  const sameUsernameUser = users.find(users => users.username === username);

  if (sameUsernameUser) return { error: 'Username already used' };

  if (!existingSocket) {
    users.push({ id: socket.id, username });

    socket.emit('update-user-list', {
      users: users.filter(existingSocket => existingSocket.id !== socket.id),
    });

    socket.broadcast.emit('update-user-list', {
      users: [{ id: socket.id, username: socket.handshake.query.username }],
    });
  }
};

const logout = (socket: Socket): void => {
  users = users.filter(existingSocket => existingSocket.id !== socket.id);
  socket.broadcast.emit('remove-user', {
    socketId: socket.id,
  });
};

const getUser = (id: string): User | undefined => users.find(user => user.id === id);
const getByUsername = (username: string): User | undefined => users.find(user => user.username === username);

export default { login, logout, getUser, getByUsername };
