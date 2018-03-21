import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const ForumSchema = new Schema({
    
    
    title: { type: String, required: true },
    description: { type: String, required: true },
    created: { type: Date, default: Date.now },
    status: { type: String, required: true, enum: ['A', 'D', 'C'], default: 'D' },
    entity: { type: Schema.ObjectId, ref: 'Entity', required: true },
  }, 
  {collection:"ForumList"});


// Virtual for this book instance URL.
ForumSchema
.virtual('url')
.get(function () {
  return '/forums/'+this._id;
});


var Forum = mongoose.model('Forum', ForumSchema);

export default Forum;
