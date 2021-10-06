import express from 'express';
import username from './username';
import room from './room';

const router = express.Router();

router.use('/v1/username', username);
router.use('/v1/room', room);

export default router;
