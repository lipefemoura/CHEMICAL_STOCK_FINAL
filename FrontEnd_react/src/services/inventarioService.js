import { apiGet } from "./api.js";

const BASE_ENDPOINT = "/inventario";

export async function getInventarioReagentes() {
  return apiGet(`${BASE_ENDPOINT}/reagentes`);
}

export async function getInventarioEquipamentos() {
  return apiGet(`${BASE_ENDPOINT}/equipamentos`);
}

export async function getInventarioResiduos() {
  return apiGet(`${BASE_ENDPOINT}/residuos`);
}

export async function getInventarioFrascos() {
  return apiGet(`${BASE_ENDPOINT}/frascos`);
}
