package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.DTO.MovimentacaoResiduoDTO;
import com.laboratorio.labanalise.model.MovimentacaoResiduo;
import com.laboratorio.labanalise.model.Residuo;
import com.laboratorio.labanalise.model.enums.TipoMovimentacaoResiduo;
import com.laboratorio.labanalise.repositories.MovimentacaoResiduoRepository;
import com.laboratorio.labanalise.repositories.ResiduoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovimentacaoResiduoService {

    @Autowired
    private MovimentacaoResiduoRepository movimentacaoRepository;

    @Autowired
    private ResiduoRepository residuoRepository;

    public List<MovimentacaoResiduoDTO> listarPorResiduo(Long residuoId) {
        return movimentacaoRepository
                .findByResiduoIdOrderByDataMovimentacaoDesc(residuoId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<MovimentacaoResiduoDTO> listarTodas() {
        return movimentacaoRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public MovimentacaoResiduoDTO registrar(MovimentacaoResiduoDTO dto) {
        Residuo residuo = residuoRepository.findById(dto.getResiduoId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Resíduo não encontrado. ID: " + dto.getResiduoId()));

        MovimentacaoResiduo mov = new MovimentacaoResiduo();
        mov.setResidue(residuo);
        mov.setTipo(dto.getTipo());
        mov.setMotivo(dto.getMotivo());
        mov.setRegistradoPor(dto.getRegistradoPor());
        mov.setDataMovimentacao(LocalDateTime.now());

        return toDTO(movimentacaoRepository.save(mov));
    }

    // Chamado automaticamente ao cadastrar um resíduo
    @Transactional
    public void registrarGeracao(Residuo residuo, String usuario) {
        MovimentacaoResiduo mov = new MovimentacaoResiduo();
        mov.setResidue(residuo);
        mov.setTipo(TipoMovimentacaoResiduo.GERACAO);
        mov.setMotivo("Geração inicial do resíduo");
        mov.setRegistradoPor(usuario);
        mov.setDataMovimentacao(LocalDateTime.now());
        movimentacaoRepository.save(mov);
    }

    // -------------------------
    // Auxiliares
    // -------------------------

    private MovimentacaoResiduoDTO toDTO(MovimentacaoResiduo mov) {
        MovimentacaoResiduoDTO dto = new MovimentacaoResiduoDTO();
        dto.setId(mov.getId());
        dto.setDataMovimentacao(mov.getDataMovimentacao());
        dto.setTipo(mov.getTipo());
        dto.setMotivo(mov.getMotivo());
        dto.setRegistradoPor(mov.getRegistradoPor());
        dto.setResiduoId(mov.getResidue().getId());
        dto.setResiduoNome(mov.getResidue().getNome());
        return dto;
    }
}