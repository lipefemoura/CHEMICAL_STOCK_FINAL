import { apiGet } from "./api.js";

const BASE_ENDPOINT = "/inventario";

// Buscar reagentes no inventário (paginado + ordenado)
export async function getInventarioReagentes(
  page = 0,
  size = 10,
  sort = "nome",
  direction = "asc",
) {
  return apiGet(
    `${BASE_ENDPOINT}/reagentes?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
  );
}

// Buscar equipamentos no inventário (paginado + ordenado)
export async function getInventarioEquipamentos(
  page = 0,
  size = 10,
  sort = "nome",
  direction = "asc",
) {
  return apiGet(
    `${BASE_ENDPOINT}/equipamentos?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
  );
}

// Buscar resíduos no inventário (paginado + ordenado)
export async function getInventarioResiduos(
  page = 0,
  size = 10,
  sort = "nome",
  direction = "asc",
) {
  return apiGet(
    `${BASE_ENDPOINT}/residuos?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
  );
}

// Buscar frascos no inventário (paginado + ordenado)
export async function getInventarioFrascos(
  page = 0,
  size = 10,
  sort = "nome",
  direction = "asc",
) {
  return apiGet(
    `${BASE_ENDPOINT}/frascos?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
  );
}

// Buscar resumo para KPI cards
export async function getInventarioResumo() {
  return apiGet("/inventario/resumo");
}
