package com.laboratorio.labanalise.DTO;

import com.laboratorio.labanalise.model.enums.CategoriaInventario;
import com.laboratorio.labanalise.model.enums.StatusInventario;

import java.time.LocalDateTime;

public class ItemInventarioDTO {

    private Long id;
    private String nome;
    private String descricao;
    private CategoriaInventario categoria;
    private String unidadeMedida;
    private Double quantidade;
    private Double quantidadeMinima;
    private String localizacao;
    private StatusInventario status;
    private LocalDateTime criadoEm;
    private LocalDateTime atualizadoEm;
    private String criadoPor;
    private String atualizadoPor;

    public ItemInventarioDTO() {}

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
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }

    public LocalDateTime getAtualizadoEm() { return atualizadoEm; }
    public void setAtualizadoEm(LocalDateTime atualizadoEm) { this.atualizadoEm = atualizadoEm; }

    public String getCriadoPor() { return criadoPor; }
    public void setCriadoPor(String criadoPor) { this.criadoPor = criadoPor; }

    public String getAtualizadoPor() { return atualizadoPor; }
    public void setAtualizadoPor(String atualizadoPor) { this.atualizadoPor = atualizadoPor; }
}
