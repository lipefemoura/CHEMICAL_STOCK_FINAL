package com.laboratorio.labanalise.DTO;

public class InventarioItemDTO {

    private Long id;
    private String nome;
    private String tipo;        // REAGENTE, EQUIPAMENTO, RESIDUO, FRASCO
    private String descricao;
    private Double quantidade;
    private String unidade;
    private String status;
    private String informacaoExtra; // validade, modelo, estado físico, etc.

    public InventarioItemDTO() {}

    public InventarioItemDTO(Long id, String nome, String tipo, String descricao,
                             Double quantidade, String unidade, String status,
                             String informacaoExtra) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.unidade = unidade;
        this.status = status;
        this.informacaoExtra = informacaoExtra;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public Double getQuantidade() { return quantidade; }
    public void setQuantidade(Double quantidade) { this.quantidade = quantidade; }

    public String getUnidade() { return unidade; }
    public void setUnidade(String unidade) { this.unidade = unidade; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getInformacaoExtra() { return informacaoExtra; }
    public void setInformacaoExtra(String informacaoExtra) { this.informacaoExtra = informacaoExtra; }
}