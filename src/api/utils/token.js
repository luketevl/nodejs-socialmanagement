import jwt from 'jsonwebtoken';

import { SECRET_KEY } from './../config/env';

export const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ status: false, auth: false, message: 'No token provided.' });
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).send({ status: false, auth: false, message: 'Failed to authenticate token.' });
    req.entityId = decoded.id;
    next();
  });
};

export const generateToken = _id => {
  return jwt.sign({ id: _id }, SECRET_KEY, {
    expiresIn: 86400
  });
}