import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const VideoSchema = new Schema({
    
    
    path: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    type: { type: String, required: true, enum: ['S', 'P'], default: 'S' },
    lesson: { type: Schema.ObjectId, ref: 'Lesson', required: true },
  }, 
  {collection:"VideoList"});


// Virtual for this book instance URL.
VideoSchema
.virtual('url')
.get(function () {
  return '/videos/'+this._id;
});


var Video = mongoose.model('Video', VideoSchema);

export default Video;
