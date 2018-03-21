
import express from 'express';
import asyncHandler from 'express-async-handler';
import { get } from './../controllers/videoController';

const fs = require('fs');


const router = express.Router();


router.get('/:id', asyncHandler(async (req, res, next) => {
  const result = await get(req.params.id);


  const fileSize = result.video.size;
  const { range } = req.headers;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(result.path, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': result.contentType,
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': result.contentType,
    };
    res.writeHead(result.code, head);
    fs.createReadStream(result.path).pipe(res);
  }
}));


export default router;
