import express from 'express';
import { UsernameControllers } from '../controllers';

const router = express.Router();

router.get('/check/:username', UsernameControllers.check);

export default router;
