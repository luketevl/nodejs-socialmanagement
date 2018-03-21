import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// create a schema
const FavoriteSchema = new Schema({
    
    
    created: { type: Date, default: Date.now },
    course: { type: Schema.ObjectId, ref: 'Course', required: true },
    entity: { type: Schema.ObjectId, ref: 'Entity', required: true },
  }, 
  {collection:"FavoriteList"});


// Virtual for this book instance URL.
FavoriteSchema
.virtual('url')
.get(function () {
  return '/favorites/'+this._id;
});


var Favorite = mongoose.model('Favorite', FavoriteSchema);

export default Favorite;
