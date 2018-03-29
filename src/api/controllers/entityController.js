import Entity from './../models/entity';
import jwt from 'jsonwebtoken';
import erpThird from '../third/erp';
import * as erpApiThird from '../third/apiErp';
import * as tokenUtil from '../utils/token';
// import 
const _prepareProviderData = data => ({
  name: data.hasOwnProperty('password') && data.password ? 'email' : data.providerName,
  ref: data.hasOwnProperty('password') && data.password ? data.email : data.providerIdentifier,
});

const updateDocumentTreeCodes = (email, value) => {
  Entity.findOne({ email }, (err, entity) => {
    if (!err) {
      const existCode = entity.codes.some(code => code.cod == value.cod && code.systemType == value.systemType);
      console.log(existCode, value);
      if (!existCode) {
        entity.codes.push(value);
        entity.save();
      }
    }
  });
};
const updateDocumentTreeProviders = async (email, value) => {
  return Entity.findOne({ email }, (err, entity) => {
    if (!err) {
      const existProvider = entity.providers.some(code => code.name == value.name && code.ref == value.ref);
      if (!existProvider) {
        entity.providers.push(value);
        entity.save();
        return entity;
      }
    }
  });
};

const _checkRefSocial = (providers = [], provider) => {
  if(providers.some(item => item.name === provider.name && provider.name != 'email')){
    return providers.some(item => item.ref === provider.ref && item.name === provider.name && provider.name != 'email');
  }
  return true;
}

const save = async (data) => {
  try {
    const entity = await Entity.findOne({ email: data.email });
    if (entity) {
      if (data.hasOwnProperty('password') && data.password && entity.password) {

        const isMatch = entity.comparePassword(data.password);

        if (!entity || !isMatch){
          if (entity.providers.length) {
            const notExistEmail = entity.providers.every(code => code.name !== 'email' && code.systemType == data.systemType);
            if (notExistEmail) {
              return {
                auth: false, status: false, code: 403, message: 'Incorrect credentials for entity because account vinculed with social',
              };
            }
          }
          return { status: false, code: 404, message: 'Incorrect credentials for entity' };
        } 

        const token = tokenUtil.generateToken(entity._id);
        // if(entity.codes.length){

        // }
        return {
          auth: true, status: true, code: 202, message: 'Logged!', token, entity,
        };
      } else if (data.providers.length) {
        try {
          if(_checkRefSocial(entity.providers, data.providers[0])){
            const resultEntity = await updateDocumentTreeProviders(data.email, data.providers[0]);
            const token = tokenUtil.generateToken(entity._id);
            return {
              auth: true, status: true, code: 202, message: 'Logged with Social!', token, entity: resultEntity,
            };
          }else{
            return {
              auth: false, status: false, code: 403, message: 'Incorrect credentials for social',
            };  
          }
        } catch (err) {
          return {
            auth: false, erro: err, status: false, code: 403, message: 'Incorrect credentials for social',
          };
        }
      } else {
        return {
          auth: false, status: false, code: 403, message: 'Incorrect credentials for social',
        };
      }
    } else {
      const model = new Entity(data);
      try {
        const modelResult = await model.save();
        const dataInstall = {
          ...data,
          ...modelResult,
        };
        // const resultInstala = await erpThird.instalar(dataInstall);
        
        const code = {
          systemType: data.system,
          cod: Math.random(), // resultInstala.codCLient
        };

        updateDocumentTreeCodes(modelResult.email, code);
        modelResult.codes.push(code);
        return {
          modelResult,
          // ...resultInstala,
          status: true,
          code: 200,
          token: tokenUtil.generateToken(modelResult._id),
        };
      } catch (err) {
        return { erro: err, status: false, code: 400 };
      }
    }
  } catch (err) {
    return { erro: err, status: false, code: 400 };
  }
};


const _prepareData = (data) => {
  const dataToSave = {
    ...data,
  };
  dataToSave.providers = [_prepareProviderData(data)];

  delete dataToSave.providerName;
  delete dataToSave.providerIdentifier;
  return dataToSave;
};
const login = (data) => {
  const dataSave = _prepareData(data);
  return save(dataSave);
};

const getSystems = async (_id) => {
  try {
    const entity = await Entity.findById(_id);
    if (entity) {
      const systems = await erpApiThird.getSystems(entity.codes || []);
      return {
        status: true, code: 200, message: 'Success!', systems
      };
    }
    return { status: false, code: 404, message: 'Incorrect credentials for entity!' };
  } catch (err) {
    return {
 erro: err, status: false, code: 404, message: 'Incorrect credentials for entity!'
 };
  }
};

const userExist = async (email) => {
  try {
    const entity = await Entity.findOne({ email });
    if (entity) {
      return { status: true, code: 200, message: 'Entity exist' };
    }
    return { status: false, code: 404, message: 'Entity not exist' };
  } catch (err) {
    return {
 erro: err, status: false, code: 404, message: 'Entity not exist' 
};
  }
};
const logout = () => ({
  auth: false, entity: null, status: true, code: 200, message: 'Success!', token: null,
});

const token = () => ({
 status: true, code: 200, message: 'Valid!', token: null 
});
export {
  save,
  login,
  logout,
  getSystems,
  userExist,
  updateDocumentTreeCodes
};
