import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const AnswerSchema = new Schema({
    
    type: { type: String, required: true, enum: ['C', 'I'], default: 'I' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    questionItem: { type: Schema.ObjectId, ref: 'QuestionItem', required: true },
  }, 
  {collection:"AnswerList"});


// Virtual for this book instance URL.
AnswerSchema
.virtual('url')
.get(function () {
  return '/lesson/item/question/answer/'+this._id;
});


var Answer = mongoose.model('Answer', AnswerSchema);

export default Answer;
