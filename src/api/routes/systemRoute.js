import express from 'express';
import asyncHandler from 'express-async-handler';

import {
  install,
} from './../controllers/systemController';

import { verifyToken } from './../utils/token';

const router = express.Router();


router.post('/', verifyToken, asyncHandler(async (req, res, next) => {
  const result = await install(req.entityId, req.body);
  res.status(result.code).send(result);
}));

export default router;
