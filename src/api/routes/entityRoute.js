import express from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import {
  logout,
  login,
  getSystems,
} from './../controllers/entityController';

import verifyToken from './../utils/token';

const router = express.Router();

router.get('/:id/systems', verifyToken, asyncHandler(async (req, res, next) => {
  const result = await getSystems(req.body.id);
  res.status(result.code).send(result);
}));

router.post('/login', asyncHandler(async (req, res, next) => {
  const result = await login(req.body);
  res.status(result.code).send(result);
}));

router.get('/logout', asyncHandler(async (req, res, next) => {
  const result = await logout();
  res.status(result.code).send(result);
}));

export default router;
