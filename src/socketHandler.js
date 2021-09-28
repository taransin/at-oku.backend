let activeSockets = [];

export default io => {
  io.on("connection", socket => {
    if (!socket.handshake.query.username) {
      console.warn('Someone is trying to connect without a username!!!');
      return;
    }
    const existingSocket = activeSockets.find(
      existingSocket => existingSocket.id === socket.id
    );

    if (!existingSocket) {
      activeSockets.push({id: socket.id, username: socket.handshake.query.username });

      socket.emit("update-user-list", {
        users: activeSockets
          .filter(existingSocket => existingSocket.id !== socket.id)
      });

      socket.broadcast.emit("update-user-list", {
        users: [{id: socket.id, username: socket.handshake.query.username }]
      });
    }
    socket.on("disconnect", () => {
      activeSockets = activeSockets.filter(
        existingSocket => existingSocket.id !== socket.id
      );
      socket.broadcast.emit("remove-user", {
        socketId: socket.id
      });
    });

    socket.on("call-user", data => {
      socket.to(data.to).emit("call-made", {
        offer: data.offer,
        socket: socket.id
      });
    });

    socket.on("make-answer", data => {
      socket.to(data.to).emit("answer-made", {
        socket: socket.id,
        answer: data.answer
      });
    });


    socket.on("candidate", data => {
      socket.to(data.to).emit("candidate", {
        socket: socket.id,
        candidate: data.candidate
      });
    });



  });


}