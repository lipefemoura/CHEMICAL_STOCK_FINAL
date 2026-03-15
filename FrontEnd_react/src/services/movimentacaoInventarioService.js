import { apiGet, apiPost } from "./api.js";


// MOVIMENTAÇÕES DE EQUIPAMENTO


// Listar todas as movimentações de equipamentos
export async function getMovimentacoesEquipamentos() {
  return apiGet("/equipamentos/movimentacoes");
}

// Listar movimentações de um equipamento específico
export async function getMovimentacoesEquipamento(equipamentoId) {
  return apiGet(`/equipamentos/movimentacoes/${equipamentoId}`);
}

// Registrar nova movimentação de equipamento
export async function registrarMovimentacaoEquipamento(dto) {
  return apiPost("/equipamentos/movimentacoes", dto);
}


// MOVIMENTAÇÕES DE RESÍDUO

// Listar todas as movimentações de resíduos
export async function getMovimentacoesResiduos() {
  return apiGet("/residuos/movimentacoes");
}

// Listar movimentações de um resíduo específico
export async function getMovimentacoesResiduo(residuoId) {
  return apiGet(`/residuos/movimentacoes/${residuoId}`);
}

// Registrar nova movimentação de resíduo
export async function registrarMovimentacaoResiduo(dto) {
  return apiPost("/residuos/movimentacoes", dto);
}



// Listar todas as movimentações de reagentes
export async function getMovimentacoesReagentes() {
  return apiGet("/movimentacoes");
}

// Listar movimentações de um reagente específico
export async function getMovimentacoesReagente(reagenteId) {
  return apiGet(`/movimentacoes/reagente/${reagenteId}`);
}
