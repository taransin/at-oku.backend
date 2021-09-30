import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from "socket.io";
import socketHandler from './socketHandlers';
import controllers from './controllers';
const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN,
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(controllers);
httpServer.listen(process.env.PORT || 4000, () => {
  console.log('Server started on port', process.env.PORT || 4000);
});

socketHandler(io);
