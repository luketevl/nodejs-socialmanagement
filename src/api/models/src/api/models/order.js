import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const OrderSchema = new Schema({
    
    
    created: { type: Date, default: Date.now },
    finished: { type: Date, default: Date.now },
    entity: { type: Schema.ObjectId, ref: 'Entity', required: true },
    codTransaction: { type: String },
    discount: { type: Number },
    status: { type: String, required: true, enum: ['O', 'A', 'C', 'N'], default: 'O' },
  }, 
  {collection:"OrderList"});


// Virtual for this book instance URL.
OrderSchema
.virtual('url')
.get(function () {
  return '/orders/'+this._id;
});


var Order = mongoose.model('Order', OrderSchema);

export default Order;
