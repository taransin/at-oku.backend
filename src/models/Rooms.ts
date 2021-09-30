import { Server, Socket } from 'socket.io'
import Users, { User } from './Users';

type Message = {
  message: string,
  sender: string,

}
type Room = {
  name: string,
  password: string,
  users: User[],
  messages: Message[]
}

const rooms: Room[] = [];
type createRoomDTO = {
  name: string,
  password: string,
}
const create = (io: Server, socket: Socket, { name, password = '' }: createRoomDTO): void => {
  rooms.push({ name, password, users: [], messages: [] });
  join(io, socket, name, password);
  io.send(
    'update-rooms-list',
    rooms.map(room => ({ name: room.name, hasPassword: !!room.password })),
  );
};

const join = (io: Server, socket: Socket, name: string, password = ''): void => {
  const room = rooms.find(room => room.name === name);
  if (!room) {
    console.error('trying to join an unknown room!!');
    socket.emit('join-room-failed', { error: `Room ${name} does not exist` });
    return
  }
  if (room.password !== password) {
    console.warn('Rooms/join: trying to join room with a wrong password!!');
    socket.emit('join-room-failed', { error: 'Wrong password' });
    return
  }
  const user = Users.getUser(socket.id);
  if (!user) {
    console.warn('Rooms/join: a ghost user is trying to join room!!');
    socket.emit('join-room-failed', { error: 'Uhm... refresh the page' });
    return
  }
  addMessage(io, name, 'System', `${user.username} joined the room`);
  room.users.push(user);
  socket.emit('room-joined', { messages: room.messages.slice(-10), users: room.users });
  io.to(name).emit('user-room-user-list', { users: room.users });
  socket.join(name);
};

const leave = (io: Server, socket: Socket, name: string): void => {
  const room = getRoom(name);
  if (!room) {
    console.warn('Rooms/leave: an user is lost in a room that does not exist');
    socket.emit('leave-room-failed', { error: `The room ${name} does not exist anymore` });
    return;
  }
  const user = Users.getUser(socket.id);
  if (!user) {
    console.warn('Rooms/leave: a ghost user is trying to leave the room!!');
    socket.emit('leave-room-failed', { error: 'Uhm... refresh the page' });
    return
  }
  room.users = room.users.filter(user => user.id !== socket.id);
  socket.leave(name);
  io.to(name).emit('user-room-user-list', { users: room.users });
  addMessage(io, name, 'System', `${user.username} joined the room`);
};

const leaveAllRooms = (io: Server, socket: Socket): void => {
  for (const room of rooms) {
    const user = room.users.find(user => user.id === socket.id);
    if (user) {
      leave(io, socket, room.name);
    }
  }
};

const getRoom = (name: string) => rooms.find(room => room.name === name);

const addMessage = (io: Server, roomName: string, sender: string, message: string): void => {
  const room = getRoom(roomName);
  if (!room) {
    console.warn('Rooms/addMessage: Someone is interacting in a room that does not exist anymore')
    return;
  }
  room.messages.push({ sender, message });
  io.to(roomName).emit('new-message', { sender, message });
};

export default { create, join, leave, leaveAllRooms, addMessage };
