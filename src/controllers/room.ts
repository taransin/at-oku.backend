import { Response } from 'express';
import Users from '../models/Users';
import CustomRequest from '../types/CustomRequest';
import Room from '../models/Rooms';

const create = (req: CustomRequest, res: Response): void => {
  const { userId, name, password = '' } = req.body;
  const roomInfo = Room.create(req.io, userId, name, password);
  res.json(roomInfo);
}

const join = (req: CustomRequest, res: Response): void => {
  const { userId, name, password = '' } = req.body;
  const roomInfo = Room.join(req.io, userId, name, password);
  res.json(roomInfo);
}

const leave = (req: CustomRequest, res: Response): void => {
  Room.leave(req.io, req.body.userId, req.body.name);
  res.json({ left: req.body.name });
}

const addMessage = (req: CustomRequest, res: Response): void => {
  const { userId, roomName, message } = req.body;
  const user = Users.getUser(userId);
  if (!user) {
    console.warn(`controllers/room/addMessage: a ghost user (${userId}) is speaking in a room (${roomName})!!`);
    throw new Error('Uhm... refresh the page')
  }
  Room.addMessage(req.io, roomName, user.username, message, false);
  res.json({ result: 'success' });
}

export default { create, join, leave, addMessage }