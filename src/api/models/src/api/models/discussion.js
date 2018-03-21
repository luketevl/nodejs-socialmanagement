import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const DiscussionSchema = new Schema({
    
    
    title: { type: String, required: true },
    content: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    status: { type: String, required: true, enum: ['A', 'D', 'C'], default: 'D' },
    entity: { type: Schema.ObjectId, ref: 'Entity', required: true },
    lessonItem: { type: Schema.ObjectId, ref: 'LessonItem', required: true },
  }, 
  {collection:"DiscussionList"});


// Virtual for this book instance URL.
DiscussionSchema
.virtual('url')
.get(function () {
  return '/discussions/'+this._id;
});


var Discussion = mongoose.model('Discussion', DiscussionSchema);

export default Discussion;
