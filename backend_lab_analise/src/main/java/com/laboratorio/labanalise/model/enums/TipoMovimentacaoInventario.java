package com.laboratorio.labanalise.model.enums;

public enum TipoMovimentacaoInventario {
    ENTRADA,   // chegou compra, doação, transferência
    SAIDA,     // consumido num procedimento
    AJUSTE,    // contagem física revelou diferença
    DESCARTE   // item vencido ou danificado
}
