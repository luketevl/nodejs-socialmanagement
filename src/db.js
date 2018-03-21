import mongoose from 'mongoose';
import * as envConfig from './api/config/env';

mongoose.connect(envConfig.DB_URL);
const db = mongoose.connection;

db
  .on('error', () => console.error( 'Fail to connect Database'))
  .once('open', () => console.info( 'Database connect'));

export default db;
