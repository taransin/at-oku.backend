import { Request, Response } from 'express';
import Users from '../models/Users';

const check = (req: Request, res: Response): void => {
  const user = Users.getByUsername(req.params.username);
  res.json({ used: !!user });
}

export default { check }