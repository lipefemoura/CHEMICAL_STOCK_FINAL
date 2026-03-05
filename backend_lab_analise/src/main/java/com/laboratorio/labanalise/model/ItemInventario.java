package com.laboratorio.labanalise.model;

import com.laboratorio.labanalise.model.enums.CategoriaInventario;
import com.laboratorio.labanalise.model.enums.StatusInventario;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "item_inventario")
@Inheritance(strategy = InheritanceType.JOINED)
@EntityListeners(AuditingEntityListener.class)
public class ItemInventario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(length = 500)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CategoriaInventario categoria;

    @Column(nullable = false)
    private String unidadeMedida;

    @Column(nullable = false)
    private Double quantidade;

    @Column(nullable = false)
    private Double quantidadeMinima;

    private String localizacao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusInventario status;

    @CreatedDate
    @Column(name = "criado_em", updatable = false)
    private LocalDateTime criadoEm;

    @LastModifiedDate
    @Column(name = "atualizado_em")
    private LocalDateTime atualizadoEm;

    @CreatedBy
    @Column(name = "criado_por", updatable = false, length = 50)
    private String criadoPor;

    @LastModifiedBy
    @Column(name = "atualizado_por", length = 50)
    private String atualizadoPor;

    public ItemInventario() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public CategoriaInventario getCategoria() { return categoria; }
    public void setCategoria(CategoriaInventario categoria) { this.categoria = categoria; }

    public String getUnidadeMedida() { return unidadeMedida; }
    public void setUnidadeMedida(String unidadeMedida) { this.unidadeMedida = unidadeMedida; }

    public Double getQuantidade() { return quantidade; }
    public void setQuantidade(Double quantidade) { this.quantidade = quantidade; }

    public Double getQuantidadeMinima() { return quantidadeMinima; }
    public void setQuantidadeMinima(Double quantidadeMinima) { this.quantidadeMinima = quantidadeMinima; }

    public String getLocalizacao() { return localizacao; }
    public void setLocalizacao(String localizacao) { this.localizacao = localizacao; }

    public StatusInventario getStatus() { return status; }
    public void setStatus(StatusInventario status) { this.status = status; }

    public LocalDateTime getCriadoEm() { return criadoEm; }
    public LocalDateTime getAtualizadoEm() { return atualizadoEm; }
    public String getCriadoPor() { return criadoPor; }
    public String getAtualizadoPor() { return atualizadoPor; }
}
