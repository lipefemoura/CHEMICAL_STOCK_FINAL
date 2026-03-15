package com.laboratorio.labanalise.DTO;

import com.laboratorio.labanalise.model.enums.TipoMovimentacaoEquipamento;
import java.time.LocalDateTime;

public class MovimentacaoEquipamentoDTO {

    private Long id;
    private LocalDateTime dataMovimentacao;
    private TipoMovimentacaoEquipamento tipo;
    private String motivo;
    private String registradoPor;
    private Long equipamentoId;
    private String equipamentoNome;

    public MovimentacaoEquipamentoDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getDataMovimentacao() { return dataMovimentacao; }
    public void setDataMovimentacao(LocalDateTime dataMovimentacao) { this.dataMovimentacao = dataMovimentacao; }

    public TipoMovimentacaoEquipamento getTipo() { return tipo; }
    public void setTipo(TipoMovimentacaoEquipamento tipo) { this.tipo = tipo; }

    public String getMotivo() { return motivo; }
    public void setMotivo(String motivo) { this.motivo = motivo; }

    public String getRegistradoPor() { return registradoPor; }
    public void setRegistradoPor(String registradoPor) { this.registradoPor = registradoPor; }

    public Long getEquipamentoId() { return equipamentoId; }
    public void setEquipamentoId(Long equipamentoId) { this.equipamentoId = equipamentoId; }

    public String getEquipamentoNome() { return equipamentoNome; }
    public void setEquipamentoNome(String equipamentoNome) { this.equipamentoNome = equipamentoNome; }
}