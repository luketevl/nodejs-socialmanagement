import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const LessonItemSchema = new Schema({
    
    
    type: { type: String, required: true, enum: ['Q', 'H', 'C'], default: 'C' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    status: { type: String, required: true, enum: ['A', 'D', 'C'], default: 'D' },
    lesson: { type: Schema.ObjectId, ref: 'Lesson', required: true },
  }, 
  {collection:"LessonItemList"});


// Virtual for this book instance URL.
LessonItemSchema
.virtual('url')
.get(function () {
  return '/lesson/item/'+this._id;
});


var LessonItem = mongoose.model('LessonItem', LessonItemSchema);

export default LessonItem;
