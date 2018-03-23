import Entity from './../models/entity';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './../config/env';
import erpThird from '../third/erp';

const _prepareProviderData = data =>{
  return {
    name: data.hasOwnProperty('password') && data.password ? 'email' : data.providerName,
    ref: data.hasOwnProperty('password') && data.password ? data.email : data.providerIdentifier,
  }
}

const updateDocumentTreeCodes = (email, value) => {
  Entity.findOne({ email }, (err, entity) => {
    if(err){
    }
    const existCode = entity.codes.some(code => code.cod == value.cod && code.systemType == value.systemType)
    console.log(existCode, value);
    if(!existCode){
      entity.codes.push(value);
      entity.save();
    }
  })
}
const updateDocumentTreeProviders = async (email, value) => {
  
  Entity.findOne({ email }, (err, entity) => {
    if(err){
    }
    const existProvider = entity.providers.some(code => code.name == value.name && code.ref == value.ref)
    console.log(existProvider);
    if(!existProvider){
      entity.providers.push(value);
      entity.save();
      return entity;
    }
  })
}
const save = async (data) => {
  try {
    const entity = await Entity.findOne({ email: data.email });
    if(entity){
      
      if(data.hasOwnProperty('password') && data.password){
        
        const isMatch =  entity.comparePassword(data.password);

        if(!entity || !isMatch) return { status: false, code: 404, message: "Incorrect credentials for entity" };
    
        const token = _generateToken(entity._id);
        // if(entity.codes.length){

        // }
        return { status: true, code: 202, message: "Logged!", token, entity };

      }else if(data.providers.length){
        try{
          const token = _generateToken(entity._id);
          const resultEntity = await updateDocumentTreeProviders(data.email, data.providers[0]);
          return { status: true, code: 202, message: "Logged with Social!", token, entity };
          
        }catch(err){
          return { erro: err, status: false, code: 403, message: "Incorrect credentials for social" };
        }
      }else{
        return { status: false, code: 403, message: "Incorrect credentials for social" };
      }
    }else{ 
      const model = new Entity(data);
      try{
        const modelResult = await model.save();
        const dataInstall = {
                ...data,
                ...modelResult
              }
              // const resultInstala = await erpThird.instalar(dataInstall);
              const code = {
                name: 'email',
                systemType: data.system,
                cod: Math.random(), // resultInstala.codCLient
              }

              updateDocumentTreeCodes(modelResult.email, code);
              modelResult.codes.push(code);
        return {
                modelResult,
                // ...resultInstala, 
                status: true, 
                code: 200, 
                token: jwt.sign({ id: modelResult._id }, SECRET_KEY, {
                  expiresIn: 86400 // expires in 24 hours
                }),
              }
      }
      catch(err){
        return  { erro: err, result: false, code: 400 }
      }
    }

  } catch (err) {
      return  { erro: err, result: false, code: 400 }
  }
  
};


const _generateToken = _id => {
  return jwt.sign({ id: _id }, SECRET_KEY, {
    expiresIn: 86400
  });
}

const _prepareData = data => {
  const dataToSave = {
    ...data,
  };
  if(data.providerName && data.providerIdentifier){
    dataToSave.providers =[
      {
        name: data.providerName,
        ref: data.providerIdentifier
      }
    ];
  }

  delete dataToSave.providerName;
  delete dataToSave.providerIdentifier;
  return dataToSave;
}
const login = (data) => {
  const dataSave = _prepareData(data);
  return save(dataSave);

};

const getSystems = (codes) => {

}
const logout = () => ({ status: true, code: 200, message: "Success!", token: null });


export {
  save,
  login,
  logout,
  getSystems,
};
