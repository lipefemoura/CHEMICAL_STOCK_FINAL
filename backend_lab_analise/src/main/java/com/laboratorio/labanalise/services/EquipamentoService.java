package com.laboratorio.labanalise.services;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.laboratorio.labanalise.DTO.EquipamentoDTO;
import com.laboratorio.labanalise.model.Equipamento;
import com.laboratorio.labanalise.model.MovimentacaoEquipamento;
import com.laboratorio.labanalise.model.enums.TipoMovimentacaoEquipamento;
import com.laboratorio.labanalise.repositories.EquipamentoRepository;
import com.laboratorio.labanalise.repositories.MovimentacaoEquipamentoRepository;
import com.laboratorio.labanalise.repositories.ProcedimentoRepository;

@Service
public class EquipamentoService {

    private final EquipamentoRepository equipamentoRepository;
    private final ProcedimentoRepository procedimentoRepository;

    @Autowired
    private MovimentacaoEquipamentoRepository movimentacaoEquipamentoRepository;

    public EquipamentoService(EquipamentoRepository equipamentoRepository,
                              ProcedimentoRepository procedimentoRepository) {
        this.equipamentoRepository = equipamentoRepository;
        this.procedimentoRepository = procedimentoRepository;
    }

    @Transactional
    public EquipamentoDTO salvarEquipamento(EquipamentoDTO dto) {
        Equipamento equipamento = new Equipamento();
        equipamento.setNome(dto.getNome());
        equipamento.setFabricante(dto.getFabricante());
        equipamento.setModelo(dto.getModelo());
        equipamento.setNumeroSerie(dto.getNumeroSerie());
        equipamento.setDescricao(dto.getDescricao());
        equipamento.setStatus(dto.getStatus());

        if (dto.getProcedimentosIds() != null) {
            equipamento.setProcedimentos(
                    dto.getProcedimentosIds().stream()
                            .map(id -> procedimentoRepository.findById(id).orElse(null))
                            .filter(p -> p != null)
                            .collect(Collectors.toSet())
            );
        }

        Equipamento salvo = equipamentoRepository.save(equipamento);

        // Registra movimentação de cadastro usando criadoEm da entidade
        MovimentacaoEquipamento mov = new MovimentacaoEquipamento();
        mov.setEquipamento(salvo);
        mov.setTipo(TipoMovimentacaoEquipamento.CADASTRO);
        mov.setMotivo("Cadastro inicial do equipamento");
        mov.setRegistradoPor(getUsuarioLogado());
        // Usa criadoEm da entidade para ter a data real do cadastro
        mov.setDataMovimentacao(
                salvo.getCriadoEm() != null
                        ? LocalDateTime.ofInstant(salvo.getCriadoEm(), ZoneId.systemDefault())
                        : LocalDateTime.now()
        );
        movimentacaoEquipamentoRepository.save(mov);

        return new EquipamentoDTO(salvo);
    }

    public List<EquipamentoDTO> listarEquipamentos() {
        return equipamentoRepository.findAll().stream()
                .map(EquipamentoDTO::new)
                .collect(Collectors.toList());
    }

    public Optional<EquipamentoDTO> buscarPorId(Long id) {
        return equipamentoRepository.findById(id).map(EquipamentoDTO::new);
    }

    public void deletarEquipamento(Long id) {
        equipamentoRepository.deleteById(id);
    }

    @Transactional
    public EquipamentoDTO atualizarEquipamento(Long id, EquipamentoDTO dto) {
        Optional<Equipamento> opt = equipamentoRepository.findById(id);
        if (opt.isEmpty()) return null;

        Equipamento equipamento = opt.get();
        equipamento.setNome(dto.getNome());
        equipamento.setFabricante(dto.getFabricante());
        equipamento.setModelo(dto.getModelo());
        equipamento.setNumeroSerie(dto.getNumeroSerie());
        equipamento.setDescricao(dto.getDescricao());
        equipamento.setStatus(dto.getStatus());

        if (dto.getProcedimentosIds() != null) {
            equipamento.setProcedimentos(
                    dto.getProcedimentosIds().stream()
                            .map(pid -> procedimentoRepository.findById(pid).orElse(null))
                            .filter(p -> p != null)
                            .collect(Collectors.toSet())
            );
        }

        return new EquipamentoDTO(equipamentoRepository.save(equipamento));
    }

    // -------------------------
    // Auxiliar
    // -------------------------
    private String getUsuarioLogado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            return auth.getName();
        }
        return "sistema";
    }
}