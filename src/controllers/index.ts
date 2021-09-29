import express from 'express';
import UsernameControllers from './username';

const router = express.Router();

router.use('/username', UsernameControllers);

export default router;
