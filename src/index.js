import express from 'express';
import http from 'http';
import cors from 'cors';
import socketIO from 'socket.io';
import socketHandler from './socketHandler'

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors())

httpServer.listen(process.env.PORT || 4000, () => {
  console.log('Server started on port', process.env.PORT || 4000);
})

app.get('/', (req, res) => res.json({ ok: true }));

socketHandler(io);
