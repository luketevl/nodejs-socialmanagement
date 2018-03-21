import Entity from './../models/entity';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './../config/env';

const getAll = () => {
  return Entity.find()
    .then(entities => ({ status: true, code: 200, entities } ))
    .catch(err => ({ code: 400, status: false, error: "Something went wrong" } ));

};
const get = (id) => {
  return Entity.findOne({_id: id}, { password: 0 })
    .then(result => ({ status: true, code: 200, result } ))
    .catch(err => ({ code: 400, status: false, error: "Something went wrong" } ));
};

const save = (data) => {
  const model = new Entity(data);

  return model.save()
    .then(result => (
      {
        result, 
        status: true, 
        code: 200, 
        token: jwt.sign({ id: result._id }, SECRET_KEY, {
          expiresIn: 86400 // expires in 24 hours
        }),
      }
    ))
    .catch(err => ( { erro: err, result: false, code: 400 } ));
};


const update = (id, data = {}) => {
  return Entity.findOne({_id :id})
    .then(foundObject => {
      if(!foundObject) return { code: 404, status: false, error: "Entity not found", err };
      if(data.password == undefined || data.password== ''){
        delete data.password;
      }
      foundObject = Object.assign(foundObject, data);
      return foundObject.save()
              .then(updated => ( { status: true, code: 200, message: "Status updated successfully", updated} ))
              .catch(err => ( { code: 400, status: false, error: "Status not updated", err } ));
    });
};

const remove = id => {
  return Entity.remove({_id: id})
    .then(entities => ( { status: true, code: 200, message: "Entity deleted successfully!!" } ))
    .catch(err => ( { code: 400, status: false, error: "Deleting entity is not successfull" } ));
};


const login = (email, password) => {
  return Entity.findOne({ email })
    .then(entity => {
     const isMatch =  entity.comparePassword(password);
    if(!entity || !isMatch) return { status: false, code: 404, message: "Incorrect credentials for entity" };

    const token = jwt.sign({ id: entity._id }, SECRET_KEY, {
      expiresIn: 86400 // expires in 24 hours
    });
    return { status: true, code: 202, message: "Logged!", token, result };
      
    })
    .catch(err => {
      return { status: false, code: 403, message: "Incorrect credentials for entity", err };
    });
};

const logout = () => ({ status: true, code: 200, message: "Success!", token: null });

const avatarUpdate = (id, avatar = {}) => {
  return Entity.findOne({_id :id})
    .then(foundObject => {
      if(!foundObject) return { code: 404, status: false, error: "Entity not found", err };

      foundObject.avatar = `avatars/${avatar.filename}`;
      return foundObject.save()
        .then(updated => ( { status: true, code: 200, message: "Status updated successfully", updated} ))
        .catch(err => ( { code: 400, status: false, error: "Status not updated", err } ));
    });
};

const avatarGet = (id) => {
  return Entity.findById({ _id: id })
    .then(searched => ( { avatar: searched.avatar, status: searched.avatar != undefined, code: 200, message: "Successfully" } ))
    .catch(err => ( { code: 400, status: false, error: "Status not updated", err } ));
};

export {
  save,
  update,
  remove,
  getAll,
  get,
  login,
  logout,
  avatarUpdate,
  avatarGet
};
