import fetch from 'node-fetch';
import { URL_INSTALL } from '../config/env';
import { objectToQuery } from '../utils/common';

const _generateSystemName = (system) =>{
  const now = new Date();
  return `${system}${now.getTime()}`
}
const instalar = data => {
  const dataInstall = {
    login: data.email.split('@')[0],
    senha: data.password || data._id,
    endereco_sistema: _generateSystemName('b'),
    telefone_empresa: data.phone || '99999999',
    nome_responsavel: data.name || data.email.split('@')[0],
    app_json: 1,
    email_empresa: data.email,
    tipo_plano: 'TRIAL',
  };
  let dataInstallArray = objectToQuery(dataInstall);

  return fetch(URL_INSTALL, {
    method: 'POST',
    body: dataInstallArray,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
  },
  }).then(res => res.json(), err => err)
}



export default {
  instalar
}

