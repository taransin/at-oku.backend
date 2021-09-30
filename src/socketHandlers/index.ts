import videoCallHandler from './videoCallHandler';
import roomHandler from './roomHandler';
import Users from '../models/Users';
import Rooms from '../models/Rooms';
import { Server, Socket } from "socket.io";


export default (io: Server) => {
  io.on('connection', (socket: Socket) => {
    const loginError = Users.login(socket);
    if (loginError) {
      return socket.emit('login-failed', loginError);
    }
    socket.on('disconnect', () => {
      Users.logout(socket);
      Rooms.leaveAllRooms(io, socket);
    });
    videoCallHandler(socket);
    roomHandler(io, socket);
  });
};
