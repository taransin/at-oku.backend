import { Request, Response } from 'express';

type CustomController = (req:Request, res:Response) => void

export default CustomController;