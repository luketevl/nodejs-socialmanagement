import express from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import { 
  // save, 
  // update, 
  // remove, 
  // getAll, 
  // get, 
  logout,
  login ,
  getSystems
 } from './../controllers/entityController';
import verifyToken from './../utils/token';

const router = express.Router();

// req.params.id

router.post('/entity/:id/systems', verifyToken, asyncHandler(async (req, res, next) => {
  const result = await getSystems(req.body.id);
  res.status(result.code).send(result);
}));

router.post('/login', asyncHandler(async (req, res, next) => {
  const result = await login(req.body.email, req.body.password, req.body.provider || false);
  res.status(result.code).send(result);
}));

router.get('/logout', asyncHandler(async (req, res, next) => {
  const result = await logout();
  res.status(result.code).send(result);
}));


// router.get('/', asyncHandler(async (req, res, next) => {
//   const result = await getAll();
//   res.status(result.code).send(result);
// }));

// router.get('/:id', asyncHandler(async (req, res, next) => {
//   const result = await get(req.params.id);
//   res.status(result.code).send(result);
// }));

// router.get('/me/:id', verifyToken, asyncHandler(async (req, res, next) => {
//   const result = await get(req.entityId);
//   res.status(result.code).send(result);  
// }));

// router.post('/', asyncHandler(async (req, res, next) => {
//   const result = await save(req.body);
//   res.status(result.code).send(result);
// }));

// router.patch('/:id', asyncHandler(async (req, res, next) => {
//   const result = await update(req.params.id, req.body);
//   console.log(result);
//   res.status(result.code).send(result);
// }));

// router.delete('/:id', asyncHandler(async (req, res, next) => {
//   const result = await remove(req.params.id);
//   res.status(result.code).send(result);
// }));

// router.get('/avatar/:id', asyncHandler(async (req, res, next) => {
//   const result = await avatarGet(req.params.id);
//   result.avatar = `${req.protocol}://${req.hostname}${req.get('host')}/static/${result.avatar}`;
//     res.status(result.code).send(result);
// }));


export default router;
