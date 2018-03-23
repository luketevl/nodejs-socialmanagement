import entityInstall from './entityRoute';

const registerRouters = (app) => {
  app.get('/', (req, res) => res.json({ message: 'Welcome to management' }));
  app.use('/entity', entityInstall);
};
export default registerRouters;
