package com.laboratorio.labanalise.services;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.laboratorio.labanalise.DTO.ResiduoDTO;
import com.laboratorio.labanalise.model.MovimentacaoResiduo;
import com.laboratorio.labanalise.model.Residuo;
import com.laboratorio.labanalise.model.enums.StatusResiduo;
import com.laboratorio.labanalise.model.enums.TipoMovimentacaoResiduo;
import com.laboratorio.labanalise.repositories.MovimentacaoResiduoRepository;
import com.laboratorio.labanalise.repositories.ResiduoRepository;

@Service
public class ResiduoService {

    private final ResiduoRepository residuoRepository;

    @Autowired
    private MovimentacaoResiduoRepository movimentacaoResiduoRepository;

    public ResiduoService(ResiduoRepository residuoRepository) {
        this.residuoRepository = residuoRepository;
    }

    @Transactional
    public Residuo salvar(Residuo residuo) {
        if (residuo.getStatus() == null) {
            residuo.setStatus(StatusResiduo.EM_ESTOQUE);
        }
        Residuo salvo = residuoRepository.save(residuo);

        // Registra movimentação de geração usando criadoEm da entidade
        MovimentacaoResiduo mov = new MovimentacaoResiduo();
        mov.setResidue(salvo);
        mov.setTipo(TipoMovimentacaoResiduo.GERACAO);
        mov.setMotivo("Geração inicial do resíduo");
        mov.setRegistradoPor(getUsuarioLogado());
        mov.setDataMovimentacao(
                salvo.getCriadoEm() != null
                        ? LocalDateTime.ofInstant(salvo.getCriadoEm(), ZoneId.systemDefault())
                        : LocalDateTime.now()
        );
        movimentacaoResiduoRepository.save(mov);

        return salvo;
    }

    public List<Residuo> listarTodos() {
        return residuoRepository.findAll();
    }

    public Optional<Residuo> buscarPorId(Long id) {
        return residuoRepository.findById(id);
    }

    public void deletar(Long id) {
        residuoRepository.deleteById(id);
    }

    public List<ResiduoDTO> listarTodosDTO() {
        return residuoRepository.findAll()
                .stream()
                .map(ResiduoDTO::new)
                .toList();
    }

    public Optional<ResiduoDTO> buscarDTOPorId(Long id) {
        return residuoRepository.findById(id).map(ResiduoDTO::new);
    }

    public ResiduoDTO salvarDTO(ResiduoDTO dto) {
        Residuo residuo = toEntity(dto);
        return new ResiduoDTO(residuoRepository.save(residuo));
    }

    public Optional<ResiduoDTO> atualizarDTO(Long id, ResiduoDTO dto) {
        return residuoRepository.findById(id).map(residuoExistente -> {
            Residuo atualizado = toEntity(dto);
            atualizado.setId(id);
            return new ResiduoDTO(residuoRepository.save(atualizado));
        });
    }

    // -------------------------
    // Auxiliares
    // -------------------------

    private Residuo toEntity(ResiduoDTO dto) {
        Residuo residuo = new Residuo();
        residuo.setId(dto.getId());
        residuo.setNome(dto.getNome());
        residuo.setTipo(dto.getTipo());
        residuo.setEstadoFisico(dto.getEstadoFisico());
        residuo.setQuantidade(dto.getQuantidade());
        residuo.setUnidadeMedida(dto.getUnidadeMedida());
        residuo.setDataGeracao(dto.getDataGeracao());
        residuo.setDataDescarte(dto.getDataDescarte());
        residuo.setObservacao(dto.getObservacao());

        if (dto.getStatus() != null) {
            residuo.setStatus(StatusResiduo.valueOf(dto.getStatus()));
        } else {
            residuo.setStatus(StatusResiduo.EM_ESTOQUE);
        }

        return residuo;
    }

    private String getUsuarioLogado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            return auth.getName();
        }
        return "sistema";
    }
}