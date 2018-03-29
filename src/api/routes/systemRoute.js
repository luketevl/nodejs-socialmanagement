import express from 'express';
import asyncHandler from 'express-async-handler';

import {
  create,
} from './../controllers/systemController';

import { verifyToken } from './../utils/token';

const router = express.Router();


router.post('/', verifyToken, asyncHandler(async (req, res, next) => {
  const result = await create(req.entityId);
  res.status(result.code).send(result);
}));

export default router;
