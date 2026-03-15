package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.DTO.MovimentacaoEquipamentoDTO;
import com.laboratorio.labanalise.model.Equipamento;
import com.laboratorio.labanalise.model.MovimentacaoEquipamento;
import com.laboratorio.labanalise.model.enums.TipoMovimentacaoEquipamento;
import com.laboratorio.labanalise.repositories.EquipamentoRepository;
import com.laboratorio.labanalise.repositories.MovimentacaoEquipamentoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovimentacaoEquipamentoService {

    @Autowired
    private MovimentacaoEquipamentoRepository movimentacaoRepository;

    @Autowired
    private EquipamentoRepository equipamentoRepository;

    public List<MovimentacaoEquipamentoDTO> listarPorEquipamento(Long equipamentoId) {
        return movimentacaoRepository
                .findByEquipamentoIdOrderByDataMovimentacaoDesc(equipamentoId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<MovimentacaoEquipamentoDTO> listarTodas() {
        return movimentacaoRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public MovimentacaoEquipamentoDTO registrar(MovimentacaoEquipamentoDTO dto) {
        Equipamento equipamento = equipamentoRepository.findById(dto.getEquipamentoId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Equipamento não encontrado. ID: " + dto.getEquipamentoId()));

        MovimentacaoEquipamento mov = new MovimentacaoEquipamento();
        mov.setEquipamento(equipamento);
        mov.setTipo(dto.getTipo());
        mov.setMotivo(dto.getMotivo());
        mov.setRegistradoPor(dto.getRegistradoPor());
        mov.setDataMovimentacao(LocalDateTime.now());

        return toDTO(movimentacaoRepository.save(mov));
    }

    // Chamado automaticamente ao cadastrar um equipamento
    @Transactional
    public void registrarCadastro(Equipamento equipamento, String usuario) {
        MovimentacaoEquipamento mov = new MovimentacaoEquipamento();
        mov.setEquipamento(equipamento);
        mov.setTipo(TipoMovimentacaoEquipamento.CADASTRO);
        mov.setMotivo("Cadastro inicial do equipamento");
        mov.setRegistradoPor(usuario);
        mov.setDataMovimentacao(LocalDateTime.now());
        movimentacaoRepository.save(mov);
    }

    // -------------------------
    // Auxiliares
    // -------------------------

    private MovimentacaoEquipamentoDTO toDTO(MovimentacaoEquipamento mov) {
        MovimentacaoEquipamentoDTO dto = new MovimentacaoEquipamentoDTO();
        dto.setId(mov.getId());
        dto.setDataMovimentacao(mov.getDataMovimentacao());
        dto.setTipo(mov.getTipo());
        dto.setMotivo(mov.getMotivo());
        dto.setRegistradoPor(mov.getRegistradoPor());
        dto.setEquipamentoId(mov.getEquipamento().getId());
        dto.setEquipamentoNome(mov.getEquipamento().getNome());
        return dto;
    }
}