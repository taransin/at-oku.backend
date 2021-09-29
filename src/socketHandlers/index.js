import videoCallHandler from './videoCallHandler';
import roomHandler from './roomHandler';
import Users from '../models/Users';
import Rooms from '../models/Rooms';

export default io => {
  io.on('connection', socket => {
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
