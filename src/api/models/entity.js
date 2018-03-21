import mongoose from 'mongoose';
import validate from './../utils/validate';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

// create a schema
const entitySchema = new Schema({
    email: { 
      type: String, 
      required: true, 
      index: { unique: true },
      validate: {
        validator: v => validate.email(v),
        message: '{VALUE} is not a valid email!'
      },
      set: function(email) { 
        this._email = this.email;
        return email;
      }
     },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    active: { type: Number, min: 0, max: 1, default: 1 },
  }, 
  { collection:"EntityList" });


// Virtual for this author instance URL.
entitySchema
.virtual('url')
.get(function () {
  return '/entity/'+this._id
});

entitySchema.pre('save', function(next) {
  const entity = this;

  // Dont changce the email
  if(entity.isModified('email')){
    this.email = this._email || this.email;
  }

  // Password
  if(entity.isModified('password')){
    this.password = bcrypt.hashSync(entity.password , 10);
  }
  return next();
});


entitySchema.methods.comparePassword = function (attemptedPassword) {
  return bcrypt.compareSync(attemptedPassword, this.password);
};


const Entity = mongoose.model('Entity', entitySchema);

export default Entity;
