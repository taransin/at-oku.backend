import videoCallHandler from './videoCallHandler';
import roomHandler from './roomHandler';
import Users from '../models/Users';
import Rooms from '../models/Rooms';

export default io => {
  io.on('connection', socket => {
    Users.login(socket);
    socket.on('disconnect', () => {
      Users.logout(socket);
      Rooms.leaveAllRooms(io, socket);
    });
    videoCallHandler(socket);
    roomHandler(io, socket);
  });
};
