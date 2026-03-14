package com.laboratorio.labanalise.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.laboratorio.labanalise.DTO.MovimentacaoReagenteResponseDTO;
import com.laboratorio.labanalise.model.FrascoReagente;
import com.laboratorio.labanalise.model.MovimentacaoReagente;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.enums.TipoMovimentacao;
import com.laboratorio.labanalise.repositories.FrascoReagenteRepository;
import com.laboratorio.labanalise.repositories.MovimentacaoReagenteRepository;

@Service
public class MovimentacaoReagenteService {

    private final MovimentacaoReagenteRepository repository;
    private final FrascoReagenteRepository frascoReagenteRepository;

    public MovimentacaoReagenteService(MovimentacaoReagenteRepository repository, FrascoReagenteRepository frascoReagenteRepository) {
        this.repository = repository;
        this.frascoReagenteRepository = frascoReagenteRepository;
    }

    /* ===============================
       CRUD BÁSICO
    =============================== */
    public MovimentacaoReagente salvar(MovimentacaoReagente movimentacao) {
        return repository.save(movimentacao);
    }

    public List<MovimentacaoReagente> listarTodas() {
        return repository.findAll();
    }

    public List<MovimentacaoReagente> listarPorReagente(Long reagenteId) {
        return repository.findByReagenteIdOrderByDataMovimentacaoDesc(reagenteId);
    }

    public List<MovimentacaoReagenteResponseDTO> listarDTO() {
        return repository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    /* ===============================
       REGISTROS DE MOVIMENTAÇÃO
    =============================== */
    public void registrarMovimentacaoInicial(Reagente reagente) {

        List<FrascoReagente> frascos
                = frascoReagenteRepository.findByReagente(reagente);

        for (FrascoReagente frasco : frascos) {

            MovimentacaoReagente mov = new MovimentacaoReagente();
            mov.setTipoMovimentacao(TipoMovimentacao.ENTRADA);
            mov.setReagente(reagente);
            mov.setFrasco(frasco);
            mov.setQuantidadeAlterada(frasco.getQuantidadeAtual());
            mov.setDataMovimentacao(LocalDateTime.now());
            mov.setMotivo("Cadastro inicial do reagente");

            repository.save(mov);
        }
    }

    public void registrarMovimentacaoDeEntrada(Reagente reagente, Double quantidade) {

        MovimentacaoReagente mov = new MovimentacaoReagente();
        mov.setTipoMovimentacao(TipoMovimentacao.ENTRADA);
        mov.setReagente(reagente);
        mov.setDataMovimentacao(LocalDateTime.now());
        mov.setQuantidadeAlterada(quantidade);
        mov.setMotivo("Entrada de reagente");

        repository.save(mov);
    }

    public void registrarMovimentacaoDeSaida(Reagente reagente, Double quantidade) {

        MovimentacaoReagente mov = new MovimentacaoReagente();
        mov.setTipoMovimentacao(TipoMovimentacao.SAIDA);
        mov.setReagente(reagente);
        mov.setDataMovimentacao(LocalDateTime.now());
        mov.setQuantidadeAlterada(quantidade);
        mov.setMotivo("Saída por uso em procedimento");

        repository.save(mov);
    }

    /* ===============================
       DTO
    =============================== */
    private MovimentacaoReagenteResponseDTO toDTO(MovimentacaoReagente mov) {

        MovimentacaoReagenteResponseDTO dto
                = new MovimentacaoReagenteResponseDTO();

        dto.setId(mov.getId());
        dto.setTipoMovimentacao(mov.getTipoMovimentacao());
        dto.setQuantidadeAlterada(mov.getQuantidadeAlterada());
        dto.setDataMovimentacao(mov.getDataMovimentacao().toLocalDate());
        dto.setMotivo(mov.getMotivo());

        dto.setReagenteId(mov.getReagente().getId());
        dto.setNomeReagente(mov.getReagente().getNome());

        return dto;
    }
}