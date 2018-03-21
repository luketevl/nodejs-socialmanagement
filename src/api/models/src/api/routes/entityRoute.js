import express from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import multer from 'multer';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/uploads/avatars/')
  },
  filename: function (req, file, cb) {
    const format = file. mimetype.split('/')[1];
    cb(null, `${file.fieldname}-${Date.now()}.${format}`);
  }
})


const avatarsPath = multer({ storage });

import { save, update, remove, getAll, get, login, avatarUpdate, avatarGet } from './../controllers/entityController';
import verifyToken from './../utils/token';

const router = express.Router();


router.get('/', asyncHandler(async (req, res, next) => {
  const result = await getAll();
  res.status(result.code).send(result);
}));

router.get('/:id', asyncHandler(async (req, res, next) => {
  const result = await get(req.params.id);
  res.status(result.code).send(result);
}));

router.get('/me/:id', verifyToken, asyncHandler(async (req, res, next) => {
  const result = await get(req.entityId);
  res.status(result.code).send(result);  
}));


router.post('/login', asyncHandler(async (req, res, next) => {
  const result = await login(req.body.email, req.body.password);
  res.status(result.code).send(result);
}));

router.get('/logout', asyncHandler(async (req, res, next) => {
  const result = await logout();
  res.status(result.code).send(result);
}));

router.post('/', asyncHandler(async (req, res, next) => {
  const result = await save(req.body);
  res.status(result.code).send(result);
}));

router.patch('/:id', asyncHandler(async (req, res, next) => {
  const result = await update(req.params.id, req.body);
  console.log(result);
  res.status(result.code).send(result);
}));

router.delete('/:id', asyncHandler(async (req, res, next) => {
  const result = await remove(req.params.id);
  res.status(result.code).send(result);
}));

router.post('/avatar/:id', avatarsPath.single('avatar'), asyncHandler(async (req, res, next) => {
  const result = await avatarUpdate(req.params.id, req.file);
  res.status(result.code).send(result);
}));

router.get('/avatar/:id', asyncHandler(async (req, res, next) => {
  const result = await avatarGet(req.params.id);
  result.avatar = `${req.protocol}://${req.hostname}${req.get('host')}/static/${result.avatar}`;
    res.status(result.code).send(result);
}));


export default router;
