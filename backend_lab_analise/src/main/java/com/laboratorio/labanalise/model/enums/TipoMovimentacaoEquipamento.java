package com.laboratorio.labanalise.model.enums;

public enum TipoMovimentacaoEquipamento {
    CADASTRO,           // equipamento registrado no sistema
    ENTRADA_MANUTENCAO, // enviado para manutenção
    SAIDA_MANUTENCAO,   // retornou da manutenção
    DESATIVACAO,        // equipamento desativado
    REATIVACAO          // equipamento reativado
}