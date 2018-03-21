import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const ConfigSchema = new Schema({
    
    tax: { type: Number, required: true },
  }, 
  {collection:"ConfigList"});


// Virtual for this author instance URL.
ConfigSchema
.virtual('url')
.get(function () {
  return '/config/'+this._id
});


var Config = mongoose.model('Config', ConfigSchema);

export default Config;
