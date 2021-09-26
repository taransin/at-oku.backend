let activeSockets = [];

export default io => {
  io.on("connection", socket => {
    const existingSocket = activeSockets.find(
      existingSocket => existingSocket === socket.id
    );

    if (!existingSocket) {
      activeSockets.push(socket.id);

      socket.emit("update-user-list", {
        users: activeSockets.filter(
          existingSocket => existingSocket !== socket.id
        )
      });

      socket.broadcast.emit("update-user-list", {
        users: [socket.id]
      });
    }

    socket.on("disconnect", () => {
      activeSockets = activeSockets.filter(
        existingSocket => existingSocket !== socket.id
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