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
      // const resultInstala = await erpThird.instalar(dataInstall);
      
      const code = {
        systemType: data.system,
        cod: Math.random(), // resultInstala.codCLient
      };
      entityController.updateDocumentTreeCodes(entity.email, code);
      entity.codes.push(code);
      return {
        entity,
        // ...resultInstala,
        status: true,
        code: 200
      };
    } 
  } catch (err) {
    return { erro: err, status: false, code: 400 };
  }
};

export {
  create
};
