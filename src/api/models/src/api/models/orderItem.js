import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const OrdemItemSchema = new Schema({
    
    
    created: { type: Date, default: Date.now },
    course: { type: Schema.ObjectId, ref: 'Course', required: true },
    order: { type: Schema.ObjectId, ref: 'Order', required: true },
  }, 
  {collection:"OrdemItemList"});


// Virtual for this book instance URL.
OrdemItemSchema
.virtual('url')
.get(function () {
  return '/order/item/'+this._id;
});


var OrdemItem = mongoose.model('OrdemItem', OrdemItemSchema);

export default OrdemItem;
