import { Socket } from "socket.io";


export default (socket: Socket) => {
  socket.on('call-user', data => {
    socket.to(data.to).emit('call-made', {
      offer: data.offer,
      socket: socket.id,
    });
  });

  socket.on('make-answer', data => {
    socket.to(data.to).emit('answer-made', {
      socket: socket.id,
      answer: data.answer,
    });
  });

  socket.on('candidate', data => {
    socket.to(data.to).emit('candidate', {
      socket: socket.id,
      candidate: data.candidate,
    });
  });
};
