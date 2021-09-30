import Rooms from '../models/Rooms';
import Users from '../models/Users';
import { Server, Socket } from "socket.io";


export default (io: Server, socket: Socket): void => {
  socket.on('create-room', ({ name, password }) => {
    Rooms.create(io, socket, { name, password });
  });

  socket.on('join-room', ({ name, password }) => {
    Rooms.join(io, socket, name, password);
  });

  socket.on('leave-room', ({ name }) => {
    Rooms.leave(io, socket, name);
  });

  socket.on('send-message', ({ message, roomName }) => {
    const user = Users.getUser(socket.id);
    if (!user) {
      console.warn('RoomHandler/send-message: user not found!');
      return
    }
    Rooms.addMessage(io, roomName, user.username, message);
  });
};
