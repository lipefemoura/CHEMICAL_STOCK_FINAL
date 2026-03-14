import { apiGet } from "./api.js";

const BASE_ENDPOINT = "/inventario";

export async function getInventarioReagentes(page = 0, size = 10) {
  return apiGet(`${BASE_ENDPOINT}/reagentes?page=${page}&size=${size}`);
}

export async function getInventarioEquipamentos(page = 0, size = 10) {
  return apiGet(`${BASE_ENDPOINT}/equipamentos?page=${page}&size=${size}`);
}

export async function getInventarioResiduos(page = 0, size = 10) {
  return apiGet(`${BASE_ENDPOINT}/residuos?page=${page}&size=${size}`);
}

export async function getInventarioFrascos(page = 0, size = 10) {
  return apiGet(`${BASE_ENDPOINT}/frascos?page=${page}&size=${size}`);
}
