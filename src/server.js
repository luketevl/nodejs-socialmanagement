import express from 'express';
import bodyParser from 'body-parser';
import registerRouters from './api/routes';
import morgan from 'morgan';
import db from './db';
import cors from 'cors';

// import { buildSchema } from 'graphql';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.json({ type: 'application/json'}));  
app.use(morgan((process.env.ENV == 'prod' ? 'tiny' : 'dev')));

registerRouters(app);

const port = process.env.PORT || 3004;
const server = app.listen(port, () => console.log(`server started on port ${port}`));

export {
  server,
  app,
};
