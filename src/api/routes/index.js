import entityInstall from './entityRoute';
import systemRoute from './systemRoute';

const registerRouters = (app) => {
  app.get('/', (req, res) => res.json({ message: 'Welcome to management' }));
  app.use('/entity', entityInstall);
  app.use('/system', systemRoute);
};
export default registerRouters;
