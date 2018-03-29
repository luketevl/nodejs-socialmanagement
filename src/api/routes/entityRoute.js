import express from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import {
  logout,
  login,
  getSystems,
  userExist
} from './../controllers/entityController';

import { verifyToken } from './../utils/token';

const router = express.Router();

router.get('/systems', verifyToken, asyncHandler(async (req, res, next) => {
  console.log(req.entityId);
  const result = await getSystems(req.entityId);
  res.status(result.code).send(result);
}));

router.get('/:email', asyncHandler(async (req, res, next) => {
  const result = await userExist(req.params.email);
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

router.post('/token', verifyToken, asyncHandler(async (req, res, next) => {
  res.status(200).send({ entity:{ id: req.entityId },token: req.headers['x-access-token'],  auth: true, message: 'Authenticated token is valid.' });
}));

export default router;
