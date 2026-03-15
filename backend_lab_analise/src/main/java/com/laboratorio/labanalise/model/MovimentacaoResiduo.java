package com.laboratorio.labanalise.model;

import com.laboratorio.labanalise.model.enums.TipoMovimentacaoResiduo;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "movimentacao_residuo")
public class MovimentacaoResiduo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime dataMovimentacao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoMovimentacaoResiduo tipo;

    @Column(length = 255)
    private String motivo;

    @Column(length = 50)
    private String registradoPor;

    @ManyToOne
    @JoinColumn(name = "residuo_id", nullable = false)
    private Residuo residuo;

    public MovimentacaoResiduo() {}

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

    public Residuo getResidue() { return residuo; }
    public void setResidue(Residuo residuo) { this.residuo = residuo; }
}