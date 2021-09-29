let users = [];

const login = socket => {
  if (!socket.handshake.query.username) {
    console.warn('Someone is trying to connect without a username!!!');
    return;
  }
  const username = socket.handshake.query.username;

  const existingSocket = users.find(users => users.id === socket.id);

  const sameUsernameUser = users.find(users => users.username === username);

  if (sameUsernameUser) return { error: 'Username already used' };

  if (!existingSocket) {
    users.push({ id: socket.id, username: socket.handshake.query.username });

    socket.emit('update-user-list', {
      users: users.filter(existingSocket => existingSocket.id !== socket.id),
    });

    socket.broadcast.emit('update-user-list', {
      users: [{ id: socket.id, username: socket.handshake.query.username }],
    });
  }
};

const logout = socket => {
  users = users.filter(existingSocket => existingSocket.id !== socket.id);
  socket.broadcast.emit('remove-user', {
    socketId: socket.id,
  });
};

const getUser = id => users.find(user => user.id === id);
const getByUsername = un => users.find(user => user.username === un);

export default { login, logout, getUser, getByUsername };
