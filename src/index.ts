import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from "socket.io";
import socketHandler from './socketHandlers';
import controllers from './controllers';

const app = express();
const httpServer = http.createServer(app);
const frontendOrigin = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://at-oku.netlify.app';

const io = new Server(httpServer, {
  cors: {
    origin: frontendOrigin,
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(controllers);
httpServer.listen(process.env.PORT || 4000, () => {
  console.log('Server started on port', process.env.PORT || 4000);
});

socketHandler(io);
