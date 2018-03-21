import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const CourseSchema = new Schema({
    
    name: { type: String, required: true },
    description: { type: String, required: true },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    thumbail: { type: String, required: true },
    status: { type: String, required: true, enum: ['A', 'D', 'C'], default: 'D' },
    entity: { type: Schema.ObjectId, ref: 'Entity', required: true },
  }, 
  {collection: "CourseList"});


// Virtual for this book instance URL.
CourseSchema
.virtual('url')
.get(function () {
  return '/courses/'+this._id;
});


var Course = mongoose.model('Course', CourseSchema);

export default Course;
