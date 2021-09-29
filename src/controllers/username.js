import express from 'express';
import Users from '../models/Users';
const router = express.Router();

router.get('/check/:username', (req, res) => {
  const user = Users.getByUsername(req.params.username);
  res.json({ used: !!user });
});

export default router;
