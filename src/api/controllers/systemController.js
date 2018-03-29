import Entity from './../models/entity';
import erpThird from '../third/erp';
import * as erpApiThird from '../third/apiErp';
import * as entityController from './entityController';

const create = async (entity, data) => {
  try {
    if (entity) {
      const dataInstall = {
        ...data,
        ...entity,
      };
      const resultInstala = await erpThird.instalar(dataInstall);
      if(!resultInstala.url.includes('erro')){
        const code = {
          cod: resultInstala.codClient, // Math.random(), resultInstala.codCLient
          systemType: data.system,
        };
        entityController.updateDocumentTreeCodes(entity.email, code);
        entity.codes.push(code);
        return {
          entity,
          // ...resultInstala,
          status: true,
          code: 200
        };
      }else{
        return { erro: '', status: false, code: 500 };
      }
      
    } 
  } catch (err) {
    return { erro: err, status: false, code: 400 };
  }
};

const install = async (_id, data) => {
  const entity = await entityController._getUserById(_id);
  return create(entity.entity, data);
}

export {
  create,
  install
};
