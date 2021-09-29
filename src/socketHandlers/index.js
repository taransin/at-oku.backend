import videoCallHandler from './videoCallHandler';
import Users from '../models/Users';

export default io => {
  io.on('connection', socket => {
    Users.login(socket);
    socket.on('disconnect', () => Users.logout(socket));
    videoCallHandler(socket);
  });
};
