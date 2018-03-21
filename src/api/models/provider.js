import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const ProviderSchema = new Schema({
    
    ref: { type: String, required: true },
    name: { type: String, required: true },
    created: { type: Date, default: Date.now },
    entity: { type: Schema.ObjectId, ref: 'Entity', required: true },
  }, 
  {collection:"ProviderList"});


// Virtual for this book instance URL.
CupomSchema
.virtual('url')
.get(function () {
  return '/Provider/'+this._id;
});


const Provider = mongoose.model('Provider', ProviderSchema);

export default Provider;
