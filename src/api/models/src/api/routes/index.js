import entityInstall from './entityRoute';
import videoRoute from './videoRoute';
import express from 'express';

const registerRouters = app => {
  app.get('/', (req, res) => res.json({message: 'Welcome to boilerplate'}));
  
  app.use('/entity', entityInstall);

  app.use('/video', videoRoute);
};
export default registerRouters;
