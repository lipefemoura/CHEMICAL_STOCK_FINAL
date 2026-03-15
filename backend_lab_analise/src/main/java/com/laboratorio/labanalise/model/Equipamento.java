package com.laboratorio.labanalise.model;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.laboratorio.labanalise.model.enums.StatusEquipamento;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "equipamentos")
@EntityListeners(AuditingEntityListener.class)
public class Equipamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String fabricante;
    private String modelo;
    private String numeroSerie;
    private String descricao;

    @Enumerated(EnumType.STRING)
    private StatusEquipamento status;

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

    @ManyToMany(mappedBy = "equipamentos")
    private Set<Procedimento> procedimentos = new HashSet<>();

    public Equipamento() {}

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getFabricante() { return fabricante; }
    public void setFabricante(String fabricante) { this.fabricante = fabricante; }

    public String getModelo() { return modelo; }
    public void setModelo(String modelo) { this.modelo = modelo; }

    public String getNumeroSerie() { return numeroSerie; }
    public void setNumeroSerie(String numeroSerie) { this.numeroSerie = numeroSerie; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public StatusEquipamento getStatus() { return status; }
    public void setStatus(StatusEquipamento status) { this.status = status; }

    public String getCadastradoPor() { return cadastradoPor; }
    public void setCadastradoPor(String cadastradoPor) { this.cadastradoPor = cadastradoPor; }

    public String getAtualizadoPor() { return atualizadoPor; }
    public void setAtualizadoPor(String atualizadoPor) { this.atualizadoPor = atualizadoPor; }

    public Instant getCriadoEm() { return criadoEm; }
    public void setCriadoEm(Instant criadoEm) { this.criadoEm = criadoEm; }

    public Instant getAtualizadoEm() { return atualizadoEm; }
    public void setAtualizadoEm(Instant atualizadoEm) { this.atualizadoEm = atualizadoEm; }

    public Set<Procedimento> getProcedimentos() { return procedimentos; }
    public void setProcedimentos(Set<Procedimento> procedimentos) { this.procedimentos = procedimentos; }
}