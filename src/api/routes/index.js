import entityInstall from './entityRoute';
import express from 'express';

const registerRouters = app => {
  app.get('/', (req, res) => res.json({message: 'Welcome to boilerplate'}));
  
  app.use('/entity', entityInstall);

export default registerRouters;
