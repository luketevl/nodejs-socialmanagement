import Entity from './../models/entity';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './../config/env';


const fs = require('fs');
const videoPath = './uploads/videos/video.mp4';

const get = (id) => {

  const stat = fs.statSync(videoPath);
  return {path: videoPath, contentType: 'video/mp4', video: stat, status: true, code: 200, message: "Success" };
};


export {
  get
};

