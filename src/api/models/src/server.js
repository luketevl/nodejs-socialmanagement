import express from 'express';
import bodyParser from 'body-parser';
import registerRouters from './api/routes';
import morgan from 'morgan';
import db from './db';
import cors from 'cors';
import path from 'path';

// import { buildSchema } from 'graphql';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true, limit : '50mb', parameterLimit: 1000000}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json', limit : '50mb'}));  
app.use(morgan((process.env.ENV == 'prod' ? 'tiny' : 'dev')));

app.use('/static', express.static(path.join(__dirname + '/uploads')));

registerRouters(app);

const port = process.env.PORT || 3004;
const server = app.listen(port, () => console.log(`server started on port ${port}`));

export {
  server,
  app,
};
