import fetch from 'node-fetch';
import { URL_API_GESTAO, API_KEY_GESTAO } from '../config/env';
import { objectToQuery } from '../utils/common';

const CLIENTS = 'clientes/';
const URL_CLIENTS = `${URL_API_GESTAO}${CLIENTS}`;
const headers = {
  headers: {
    'X-Api-Version': '2.0',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    apikey: API_KEY_GESTAO,
  },
};
export const getSystems = async (codes = []) => {
  const resultCode = codes.map(code => code.cod);
  const filter = {
    ativo: 1,
    codigo: resultCode.join(','),
    fields: 'razao_social,cpf,cnpj,extras'
  };
  return fetch(`${URL_CLIENTS}?${objectToQuery(filter)}`, {
    ...headers,
  }).then(res => res.json(), err => err);
};
