import express from 'express';
import http from 'http';
import cors from 'cors';
import socketIO from 'socket.io';
import path from 'path';
import socketHandler from './socketHandler'

const app = express();
const httpServer = http.createServer(app);
const frontendOrigin = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://at-oku.netlify.app'
const io = socketIO(httpServer, {
  cors: {
    origin: frontendOrigin,
    methods: ["GET", "POST"]
  }
});

app.use(cors())

httpServer.listen(process.env.PORT || 4000, () => {
  console.log('Server started on port', process.env.PORT || 4000);
})

// app.get('/', (req, res) => res.json({ ok: true }));
app.use(express.static(path.join(__dirname, "../public")));
socketHandler(io);