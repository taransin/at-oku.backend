import { Server } from "socket.io";
import { Request } from 'express'


interface CustomRequest extends Request {
  io: Server
}

export default CustomRequest;