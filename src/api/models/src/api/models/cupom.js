import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const CupomSchema = new Schema({
    
    price: { type: Number, required: true },
    type: { type: String, required: true, enum: ['V', 'P'], default: 'V' },
    status: { type: String, required: true, enum: ['A', 'I'], default: 'A' },
    updated: { type: Date, default: Date.now },
    validTo: { type: Date },
    qtyMaxUse: { type: Number },
    name: { type: String, required: true },
    entity: { type: Schema.ObjectId, ref: 'Entity', required: true },
    course: { type: Schema.ObjectId, ref: 'Course', required: true },
  }, 
  {collection:"CupomList"});


// Virtual for this book instance URL.
CupomSchema
.virtual('url')
.get(function () {
  return '/Cupoms/'+this._id;
});


var Cupom = mongoose.model('Cupom', CupomSchema);

export default Cupom;
