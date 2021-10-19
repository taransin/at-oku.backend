import { Server, Socket } from 'socket.io'
import Users, { User } from './Users';

type Message = {
  message: string,
  sender: string,
  isSystem: boolean
}
type Room = {
  name: string,
  password: string,
  users: User[],
  messages: Message[]
}

const rooms: Room[] = [];

const create = (io: Server, userId: string, name: string, password = ''): { messages: Message[]; users: User[]; } => {
  rooms.push({ name, password, users: [], messages: [] });
  io.send('update-rooms-list', rooms.map(room => ({ name: room.name, hasPassword: !!room.password })));
  return join(io, userId, name, password);
};

const join = (io: Server, userId: string,  name: string, password = ''): { messages: Message[]; users: User[]; } => {
  const room = rooms.find(room => room.name === name);
  if (!room) {
    console.error('Rooms/join: trying to join an unknown room!!');
    throw new Error(`Room ${name} does not exist`)
  }
  if (room.password !== password) {
    console.warn('Rooms/join: trying to join room with a wrong password!!');
    throw new Error('Wrong password')
  }
  const user = Users.getUser(userId);
  if (!user) {
    console.warn('Rooms/join: a ghost user is trying to join room!!');
    throw new Error('Uhm... refresh the page')
  }
  addMessage(io, name, 'System', `${user.username} joined the room`, true);
  room.users.push(user);
  io.to(name).emit('user-room-user-list', { users: room.users });
  io.in(userId).socketsJoin(name)
  return { messages: room.messages.slice(-10), users: room.users }
};

const leave = (io: Server, userId: string, name: string): void => {
  const room = getRoom(name);
  if (!room) {
    console.warn('Rooms/leave: an user is lost in a room that does not exist');
    throw new Error(`The room ${name} does not exist anymore`);
  }
  const user = Users.getUser(userId);
  if (!user) {
    console.warn('Rooms/leave: a ghost user is trying to leave the room!!');
    throw new Error('Uhm... refresh the page');
  }
  room.users = room.users.filter(user => user.id !== userId);
  io.in(userId).socketsLeave(name);
  io.to(name).emit('user-room-user-list', { users: room.users });
  addMessage(io, name, 'System', `${user.username} joined the room`, true);
};

const leaveAllRooms = (io: Server, userId: string): void => {
  for (const room of rooms) {
    const user = room.users.find(user => user.id === userId);
    if (user) {
      leave(io, userId, room.name);
    }
  }
};

const getRoom = (name: string) => rooms.find(room => room.name === name);

const addMessage = (io: Server, roomName: string, sender: string, message: string, isSystem: boolean): void => {
  const room = getRoom(roomName);
  if (!room) {
    console.warn('Rooms/addMessage: Someone is interacting in a room that does not exist anymore')
    throw new Error(`Room ${roomName} does not exist anymore`)
  }
  const msg: Message = { sender, message, isSystem }
  room.messages.push(msg);
  io.to(roomName).emit('new-message', msg);
};

export default { create, join, leave, leaveAllRooms, addMessage };
