import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const LessonSchema = new Schema({
    
    
    name: { type: String, required: true },
    description: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    status: { type: String, required: true, enum: ['A', 'D', 'C'], default: 'D' },
    course: { type: Schema.ObjectId, ref: 'Course', required: true },
  }, 
  {collection:"LessonList"});


// Virtual for this book instance URL.
LessonSchema
.virtual('url')
.get(function () {
  return '/lessons/'+this._id;
});


var Lesson = mongoose.model('Lesson', LessonSchema);

export default Lesson;
