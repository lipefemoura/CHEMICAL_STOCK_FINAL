package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.DTO.ItemInventarioDTO;
import com.laboratorio.labanalise.model.ItemInventario;
import com.laboratorio.labanalise.model.enums.CategoriaInventario;
import com.laboratorio.labanalise.model.enums.StatusInventario;
import com.laboratorio.labanalise.repositories.ItemInventarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemInventarioService {

    @Autowired
    private ItemInventarioRepository itemInventarioRepository;

    public List<ItemInventarioDTO> listarTodos() {
        return itemInventarioRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ItemInventarioDTO buscarPorId(Long id) {
        ItemInventario item = buscarEntidadePorId(id);
        return toDTO(item);
    }

    public List<ItemInventarioDTO> listarPorCategoria(CategoriaInventario categoria) {
        return itemInventarioRepository.findByCategoria(categoria)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<ItemInventarioDTO> listarCriticos() {
        return itemInventarioRepository.findItensCriticos()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<ItemInventarioDTO> buscarPorNome(String nome) {
        return itemInventarioRepository.findByNomeContainingIgnoreCase(nome)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ItemInventarioDTO criar(ItemInventarioDTO dto) {
        ItemInventario item = toEntity(dto);
        item.setStatus(calcularStatus(dto.getQuantidade(), dto.getQuantidadeMinima()));
        ItemInventario salvo = itemInventarioRepository.save(item);
        return toDTO(salvo);
    }

    @Transactional
    public ItemInventarioDTO atualizar(Long id, ItemInventarioDTO dto) {
        ItemInventario item = buscarEntidadePorId(id);

        item.setNome(dto.getNome());
        item.setDescricao(dto.getDescricao());
        item.setCategoria(dto.getCategoria());
        item.setUnidadeMedida(dto.getUnidadeMedida());
        item.setQuantidade(dto.getQuantidade());
        item.setQuantidadeMinima(dto.getQuantidadeMinima());
        item.setLocalizacao(dto.getLocalizacao());
        item.setStatus(calcularStatus(dto.getQuantidade(), dto.getQuantidadeMinima()));

        return toDTO(itemInventarioRepository.save(item));
    }

    @Transactional
    public void deletar(Long id) {
        ItemInventario item = buscarEntidadePorId(id);
        itemInventarioRepository.delete(item);
    }

    // Atualiza a quantidade e recalcula o status — chamado pela MovimentacaoInventarioService
    @Transactional
    public void atualizarQuantidade(Long id, Double novaQuantidade) {
        ItemInventario item = buscarEntidadePorId(id);
        item.setQuantidade(novaQuantidade);
        item.setStatus(calcularStatus(novaQuantidade, item.getQuantidadeMinima()));
        itemInventarioRepository.save(item);
    }

    // -------------------------
    // Métodos auxiliares
    // -------------------------

    public ItemInventario buscarEntidadePorId(Long id) {
        return itemInventarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item de inventário não encontrado. ID: " + id));
    }

    private StatusInventario calcularStatus(Double quantidade, Double quantidadeMinima) {
        if (quantidade <= 0) return StatusInventario.ESGOTADO;
        if (quantidade < quantidadeMinima) return StatusInventario.CRITICO;
        return StatusInventario.ATIVO;
    }

    private ItemInventarioDTO toDTO(ItemInventario item) {
        ItemInventarioDTO dto = new ItemInventarioDTO();
        dto.setId(item.getId());
        dto.setNome(item.getNome());
        dto.setDescricao(item.getDescricao());
        dto.setCategoria(item.getCategoria());
        dto.setUnidadeMedida(item.getUnidadeMedida());
        dto.setQuantidade(item.getQuantidade());
        dto.setQuantidadeMinima(item.getQuantidadeMinima());
        dto.setLocalizacao(item.getLocalizacao());
        dto.setStatus(item.getStatus());
        dto.setCriadoEm(item.getCriadoEm());
        dto.setAtualizadoEm(item.getAtualizadoEm());
        dto.setCriadoPor(item.getCriadoPor());
        dto.setAtualizadoPor(item.getAtualizadoPor());
        return dto;
    }

    private ItemInventario toEntity(ItemInventarioDTO dto) {
        ItemInventario item = new ItemInventario();
        item.setNome(dto.getNome());
        item.setDescricao(dto.getDescricao());
        item.setCategoria(dto.getCategoria());
        item.setUnidadeMedida(dto.getUnidadeMedida());
        item.setQuantidade(dto.getQuantidade() != null ? dto.getQuantidade() : 0.0);
        item.setQuantidadeMinima(dto.getQuantidadeMinima() != null ? dto.getQuantidadeMinima() : 0.0);
        item.setLocalizacao(dto.getLocalizacao());
        return item;
    }
}
