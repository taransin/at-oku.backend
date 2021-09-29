let users = [];

const login = socket => {
  if (!socket.handshake.query.username) {
    console.warn('Someone is trying to connect without a username!!!');
    return;
  }

  const existingSocket = users.find(existingSocket => existingSocket.id === socket.id);

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

export default { login, logout, getUser };
