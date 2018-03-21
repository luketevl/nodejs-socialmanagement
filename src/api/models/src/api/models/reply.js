import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const ReplySchema = new Schema({
    
    
    content: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    entity: { type: Schema.ObjectId, ref: 'Entity', required: true },
    discussion: { type: Schema.ObjectId, ref: 'Discussion', required: true },
  }, 
  {collection:"ReplyList"});


// Virtual for this book instance URL.
ReplySchema
.virtual('url')
.get(function () {
  return '/replies/'+this._id;
});


var Reply = mongoose.model('Reply', ReplySchema);

export default Reply;
