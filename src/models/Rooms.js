import Users from './Users';

let rooms = [];

const create = (io, socket, { name, password = '' }) => {
  rooms.push({ name, password, users: [], messages: [] });
  join(io, socket, name, password);
  io.broadcast(
    'update-rooms-list',
    rooms.map(room => ({ name: room.name, hasPassword: !!room.password })),
  );
};

const join = (io, socket, name, password = '') => {
  const room = rooms.find(room => room.name === name);
  if (!room) {
    console.error('trying to join an unknown room!!');
    return socket.emit('join-room-failed', { error: `Room ${name} does not exist` });
  }
  if (room.password !== password) {
    console.warn('trying to join room with a wrong password!!');
    return socket.emit('join-room-failed', { error: 'Wrong password' });
  }
  const user = Users.getUser(socket.id);
  addMessage(io, name, 'System', `${user.username} joined the room`);
  room.users.push(user);
  socket.emit('room-joined', { messages: room.messages.slice(-10), users: room.users });
  io.to(name).emit('user-room-user-list', { users: room.users });
  socket.join(name);
};

const leave = (io, socket, name) => {
  const room = getRoom(name);
  const user = Users.getUser(socket.id);
  room.users = room.users.filter(user => user.id !== socket.id);
  socket.leave(name);
  io.to(name).emit('user-room-user-list', { users: room.users });
  addMessage(io, name, 'System', `${user.username} joined the room`);
};

const leaveAllRooms = (io, socket) => {
  for (const room in rooms) {
    const user = room.users.find(user => user.id === socket.id);
    if (user) {
      leave(io, socket, room.name);
    }
  }
};

const getRoom = name => rooms.find(room => room.name === name);

const addMessage = (io, roomName, sender, message) => {
  const room = getRoom(roomName);
  room.message.push({ sender, message });
  io.to(roomName).emit('new-message', { sender, message });
};

export default { create, join, leave, leaveAllRooms, addMessage };
