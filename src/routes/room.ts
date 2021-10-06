import express from 'express';
import CustomController from '../types/CustomController';
import { RoomControllers } from '../controllers';

const router = express.Router();

router.post('/create', RoomControllers.create as CustomController)
router.post('/join', RoomControllers.join as CustomController);
router.post('/leave', RoomControllers.leave as CustomController);
router.post('/message', RoomControllers.addMessage as CustomController);

export default router;
