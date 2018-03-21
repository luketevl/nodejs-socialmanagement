import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const RatingSchema = new Schema({
    
    rate: { type: Number, required: true, min: 0, max: 5 },
    type: { type: String, required: true, enum: ['C', 'R'] },
    observation: String,
    created: { type: Date, default: Date.now },
    entity: { type: Schema.ObjectId, ref: 'Entity', required: true },
    course: { type: Schema.ObjectId, ref: 'Course' },
    reply: { type: Schema.ObjectId, ref: 'Reply' },
  }, 
  {collection:"RatingList"});


// Virtual for this book instance URL.
RatingSchema
.virtual('url')
.get(function () {
  return '/ratings/'+this._id;
});


var Rating = mongoose.model('Rating', RatingSchema);

export default Rating;
