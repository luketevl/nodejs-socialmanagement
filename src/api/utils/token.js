import jwt from 'jsonwebtoken';

import { SECRET_KEY } from './../config/env';

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ status: false, auth: false, message: 'No token provided.' });
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    req.entityId = decoded.id;
    next();
  });
};

export default verifyToken;
