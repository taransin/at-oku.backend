import Rooms from '../models/Rooms';
import Users from '../models/Users';

export default (io, socket) => {
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
    Rooms.addMessage(io, roomName, user.name, message);
  });
};
