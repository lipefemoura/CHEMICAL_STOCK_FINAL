package com.laboratorio.labanalise.DTO;

import com.laboratorio.labanalise.model.enums.TipoMovimentacaoResiduo;
import java.time.LocalDateTime;

public class MovimentacaoResiduoDTO {

    private Long id;
    private LocalDateTime dataMovimentacao;
    private TipoMovimentacaoResiduo tipo;
    private String motivo;
    private String registradoPor;
    private Long residuoId;
    private String residuoNome;

    public MovimentacaoResiduoDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getDataMovimentacao() { return dataMovimentacao; }
    public void setDataMovimentacao(LocalDateTime dataMovimentacao) { this.dataMovimentacao = dataMovimentacao; }

    public TipoMovimentacaoResiduo getTipo() { return tipo; }
    public void setTipo(TipoMovimentacaoResiduo tipo) { this.tipo = tipo; }

    public String getMotivo() { return motivo; }
    public void setMotivo(String motivo) { this.motivo = motivo; }

    public String getRegistradoPor() { return registradoPor; }
    public void setRegistradoPor(String registradoPor) { this.registradoPor = registradoPor; }

    public Long getResiduoId() { return residuoId; }
    public void setResiduoId(Long residuoId) { this.residuoId = residuoId; }

    public String getResiduoNome() { return residuoNome; }
    public void setResiduoNome(String residuoNome) { this.residuoNome = residuoNome; }
}