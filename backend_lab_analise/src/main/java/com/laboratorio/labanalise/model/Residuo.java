package com.laboratorio.labanalise.model;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.laboratorio.labanalise.model.enums.StatusResiduo;

@Entity
@Table(name = "RESIDUO")
@EntityListeners(AuditingEntityListener.class)
public class Residuo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String tipo;

    @Column(nullable = false)
    private double quantidade;

    @Column(nullable = false)
    private String unidadeMedida;

    @Column(nullable = false)
    private String estadoFisico;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusResiduo status;

    private LocalDate dataGeracao;
    private LocalDate dataDescarte;

    @Column(length = 500)
    private String observacao;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    // =========================
    // AUDITORIA
    // =========================
    @CreatedBy
    @Column(length = 50, updatable = false)
    private String cadastradoPor;

    @LastModifiedBy
    @Column(length = 50)
    private String atualizadoPor;

    @CreatedDate
    @Column(updatable = false)
    private Instant criadoEm;

    @LastModifiedDate
    private Instant atualizadoEm;

    // =========================
    // CONSTRUTORES
    // =========================
    public Residuo() {}

    public Residuo(String nome, String tipo, double quantidade,
                   String unidadeMedida, String estadoFisico,
                   LocalDate dataGeracao) {
        this.nome = nome;
        this.tipo = tipo;
        this.quantidade = quantidade;
        this.unidadeMedida = unidadeMedida;
        this.estadoFisico = estadoFisico;
        this.dataGeracao = dataGeracao;
        this.status = StatusResiduo.EM_ESTOQUE;
    }

    // =========================
    // GETTERS E SETTERS
    // =========================
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public double getQuantidade() { return quantidade; }
    public void setQuantidade(double quantidade) { this.quantidade = quantidade; }

    public String getUnidadeMedida() { return unidadeMedida; }
    public void setUnidadeMedida(String unidadeMedida) { this.unidadeMedida = unidadeMedida; }

    public String getEstadoFisico() { return estadoFisico; }
    public void setEstadoFisico(String estadoFisico) { this.estadoFisico = estadoFisico; }

    public StatusResiduo getStatus() { return status; }
    public void setStatus(StatusResiduo status) { this.status = status; }

    public LocalDate getDataGeracao() { return dataGeracao; }
    public void setDataGeracao(LocalDate dataGeracao) { this.dataGeracao = dataGeracao; }

    public LocalDate getDataDescarte() { return dataDescarte; }
    public void setDataDescarte(LocalDate dataDescarte) { this.dataDescarte = dataDescarte; }

    public String getObservacao() { return observacao; }
    public void setObservacao(String observacao) { this.observacao = observacao; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public String getCadastradoPor() { return cadastradoPor; }
    public void setCadastradoPor(String cadastradoPor) { this.cadastradoPor = cadastradoPor; }

    public String getAtualizadoPor() { return atualizadoPor; }
    public void setAtualizadoPor(String atualizadoPor) { this.atualizadoPor = atualizadoPor; }

    public Instant getCriadoEm() { return criadoEm; }
    public void setCriadoEm(Instant criadoEm) { this.criadoEm = criadoEm; }

    public Instant getAtualizadoEm() { return atualizadoEm; }
    public void setAtualizadoEm(Instant atualizadoEm) { this.atualizadoEm = atualizadoEm; }
}