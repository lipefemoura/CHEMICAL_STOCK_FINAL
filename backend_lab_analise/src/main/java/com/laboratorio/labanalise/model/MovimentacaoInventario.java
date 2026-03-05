package com.laboratorio.labanalise.model;

import com.laboratorio.labanalise.model.enums.TipoMovimentacaoInventario;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "movimentacao_inventario")
public class MovimentacaoInventario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_movimentacao", nullable = false)
    private LocalDateTime dataMovimentacao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoMovimentacaoInventario tipo;

    @Column(nullable = false)
    private Double quantidade;

    @Column(length = 255)
    private String motivo;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private ItemInventario item;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public MovimentacaoInventario() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getDataMovimentacao() { return dataMovimentacao; }
    public void setDataMovimentacao(LocalDateTime dataMovimentacao) { this.dataMovimentacao = dataMovimentacao; }

    public TipoMovimentacaoInventario getTipo() { return tipo; }
    public void setTipo(TipoMovimentacaoInventario tipo) { this.tipo = tipo; }

    public Double getQuantidade() { return quantidade; }
    public void setQuantidade(Double quantidade) { this.quantidade = quantidade; }

    public String getMotivo() { return motivo; }
    public void setMotivo(String motivo) { this.motivo = motivo; }

    public ItemInventario getItem() { return item; }
    public void setItem(ItemInventario item) { this.item = item; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}
