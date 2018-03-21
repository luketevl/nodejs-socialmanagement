import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const QuestionItemSchema = new Schema({
    
    
    title: { type: String, required: true },
    lessonItem: { type: Schema.ObjectId, ref: 'LessonItem', required: true },
  }, 
  {collection:"QuestionItemList"});


// Virtual for this book instance URL.
QuestionItemSchema
.virtual('url')
.get(function () {
  return '/lesson/item/question'+this._id;
});


var QuestionItem = mongoose.model('QuestionItem', QuestionItemSchema);

export default QuestionItem;
