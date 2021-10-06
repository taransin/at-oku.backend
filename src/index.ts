import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from "socket.io";
import Turn from 'node-turn';
import socketHandler from './socketHandlers';
import errors from './middlewares/errors';
import routes from './routes';
const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});



app.use(cors());
app.use((req,res,next) => {
  req['io'] = io;
  next();
})
app.use(routes);
app.use(errors());

httpServer.listen(process.env.PORT || 4000, () => {
  console.log('Server started on port', process.env.PORT || 4000);
});

socketHandler(io);

const server = new Turn({
  // set options
  authMech: 'long-term',
  credentials: {
    username: "password"
  },
  debugLevel: 'ALL'
});
server.start();
