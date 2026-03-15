package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.DTO.InventarioItemDTO;
import com.laboratorio.labanalise.DTO.InventarioResumoDTO;
import com.laboratorio.labanalise.model.Equipamento;
import com.laboratorio.labanalise.model.FrascoReagente;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.Residuo;
import com.laboratorio.labanalise.model.enums.StatusEquipamento;
import com.laboratorio.labanalise.model.enums.StatusFrasco;
import com.laboratorio.labanalise.model.enums.StatusResiduo;
import com.laboratorio.labanalise.repositories.EquipamentoRepository;
import com.laboratorio.labanalise.repositories.FrascoReagenteRepository;
import com.laboratorio.labanalise.repositories.MovimentacaoEquipamentoRepository;
import com.laboratorio.labanalise.repositories.MovimentacaoReagenteRepository;
import com.laboratorio.labanalise.repositories.MovimentacaoResiduoRepository;
import com.laboratorio.labanalise.repositories.ReagenteRepository;
import com.laboratorio.labanalise.repositories.ResiduoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Service
public class InventarioService {

    @Autowired
    private ReagenteRepository reagenteRepository;

    @Autowired
    private EquipamentoRepository equipamentoRepository;

    @Autowired
    private ResiduoRepository residuoRepository;

    @Autowired
    private FrascoReagenteRepository frascoReagenteRepository;

    @Autowired
    private MovimentacaoReagenteRepository movimentacaoReagenteRepository;

    @Autowired
    private MovimentacaoEquipamentoRepository movimentacaoEquipamentoRepository;

    @Autowired
    private MovimentacaoResiduoRepository movimentacaoResiduoRepository;

    // -------------------------
    // Mapeamento sort DTO → entidade
    // -------------------------
    private static final Map<String, String> REAGENTE_SORT_MAP = Map.of(
            "nome",            "nome",
            "descricao",       "marca",
            "quantidade",      "quantidadeDeFrascos",
            "unidade",         "unidadeReagente",
            "informacaoExtra", "dataValidade",
            "status",          "tipo"
    );

    private static final Map<String, String> EQUIPAMENTO_SORT_MAP = Map.of(
            "nome",            "nome",
            "descricao",       "modelo",
            "informacaoExtra", "numeroSerie",
            "status",          "status"
    );

    private static final Map<String, String> RESIDUO_SORT_MAP = Map.of(
            "nome",            "nome",
            "descricao",       "tipo",
            "quantidade",      "quantidade",
            "unidade",         "unidadeMedida",
            "status",          "status"
    );

    private static final Map<String, String> FRASCO_SORT_MAP = Map.of(
            "nome",            "reagente.nome",
            "quantidade",      "quantidadeAtual",
            "unidade",         "reagente.unidadeReagente",
            "informacaoExtra", "dataValidade",
            "status",          "status"
    );

    // -------------------------
    // Listagens paginadas
    // -------------------------
    public Page<InventarioItemDTO> listarReagentes(Pageable pageable) {
        return reagenteRepository.findAll(remapSort(pageable, REAGENTE_SORT_MAP, "nome"))
                .map(this::reagenteToDTO);
    }

    public Page<InventarioItemDTO> listarEquipamentos(Pageable pageable) {
        return equipamentoRepository.findAll(remapSort(pageable, EQUIPAMENTO_SORT_MAP, "nome"))
                .map(this::equipamentoToDTO);
    }

    public Page<InventarioItemDTO> listarResiduos(Pageable pageable) {
        return residuoRepository.findAll(remapSort(pageable, RESIDUO_SORT_MAP, "nome"))
                .map(this::residuoToDTO);
    }

    public Page<InventarioItemDTO> listarFrascos(Pageable pageable) {
        return frascoReagenteRepository.findAll(remapSort(pageable, FRASCO_SORT_MAP, "reagente.nome"))
                .map(this::frascoToDTO);
    }

    // -------------------------
    // Resumo para KPI cards
    // -------------------------
    public InventarioResumoDTO resumo() {
        LocalDate hojeDate = LocalDate.now();
        LocalDate limite30dias = hojeDate.plusDays(30);

        InventarioResumoDTO dto = new InventarioResumoDTO();

        // Reagentes
        dto.setTotalReagentes(reagenteRepository.count());
        dto.setReagentesVencidos(reagenteRepository.countVencidos(hojeDate));
        dto.setReagentesProximosVencimento(reagenteRepository.countProximosVencimento(hojeDate, limite30dias));
        dto.setReagentesControlados(reagenteRepository.countControlados());

        // Frascos
        dto.setTotalFrascos(frascoReagenteRepository.count());
        dto.setFrascosVazios(frascoReagenteRepository.countByStatus(StatusFrasco.VAZIO));
        dto.setFrascosEmUso(frascoReagenteRepository.countByStatus(StatusFrasco.EM_USO));
        dto.setFrascosCheios(frascoReagenteRepository.countByStatus(StatusFrasco.CHEIO));

        // Equipamentos
        dto.setTotalEquipamentos(equipamentoRepository.count());
        dto.setEquipamentosAtivos(equipamentoRepository.countByStatus(StatusEquipamento.ATIVO));
        dto.setEquipamentosEmManutencao(equipamentoRepository.countByStatus(StatusEquipamento.MANUTENCAO));
        dto.setEquipamentosInativos(equipamentoRepository.countByStatus(StatusEquipamento.INATIVO));

        // Resíduos
        dto.setTotalResiduos(residuoRepository.count());
        dto.setResiduosEmEstoque(residuoRepository.countByStatus(StatusResiduo.EM_ESTOQUE));
        dto.setResiduosTratados(residuoRepository.countByStatus(StatusResiduo.TRATADO));
        dto.setResiduosDescartados(residuoRepository.countByStatus(StatusResiduo.DESCARTADO));

        // Movimentações por período — nomes distintos de hojeDate para evitar conflito
        LocalDateTime inicioHoje = hojeDate.atStartOfDay();
        LocalDateTime inicio7Dias = inicioHoje.minusDays(7);
        LocalDateTime inicio30Dias = inicioHoje.minusDays(30);

        dto.setMovimentacoesHoje(
                movimentacaoReagenteRepository.countByDataMovimentacaoAfter(inicioHoje) +
                        movimentacaoEquipamentoRepository.countByDataMovimentacaoAfter(inicioHoje) +
                        movimentacaoResiduoRepository.countByDataMovimentacaoAfter(inicioHoje)
        );
        dto.setMovimentacoes7Dias(
                movimentacaoReagenteRepository.countByDataMovimentacaoAfter(inicio7Dias) +
                        movimentacaoEquipamentoRepository.countByDataMovimentacaoAfter(inicio7Dias) +
                        movimentacaoResiduoRepository.countByDataMovimentacaoAfter(inicio7Dias)
        );
        dto.setMovimentacoes30Dias(
                movimentacaoReagenteRepository.countByDataMovimentacaoAfter(inicio30Dias) +
                        movimentacaoEquipamentoRepository.countByDataMovimentacaoAfter(inicio30Dias) +
                        movimentacaoResiduoRepository.countByDataMovimentacaoAfter(inicio30Dias)
        );

        return dto;
    }

    // -------------------------
    // Auxiliares
    // -------------------------
    private Pageable remapSort(Pageable pageable, Map<String, String> sortMap, String defaultField) {
        Sort sort = pageable.getSort();
        if (sort.isUnsorted()) return pageable;
        Sort.Order order = sort.iterator().next();
        String entityField = sortMap.getOrDefault(order.getProperty(), defaultField);
        Sort newSort = order.isAscending()
                ? Sort.by(entityField).ascending()
                : Sort.by(entityField).descending();
        return PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), newSort);
    }

    private InventarioItemDTO reagenteToDTO(Reagente r) {
        return new InventarioItemDTO(
                r.getId(), r.getNome(), "REAGENTE",
                r.getMarca() + " — Lote: " + r.getLote(),
                (double) r.getQuantidadeDeFrascos(), "frascos",
                r.getTipo().name(), "Validade: " + r.getDataValidade());
    }

    private InventarioItemDTO equipamentoToDTO(Equipamento e) {
        return new InventarioItemDTO(
                e.getId(), e.getNome(), "EQUIPAMENTO",
                e.getModelo() + " — " + e.getFabricante(),
                null, null, e.getStatus().name(),
                "Nº Série: " + e.getNumeroSerie());
    }

    private InventarioItemDTO residuoToDTO(Residuo r) {
        return new InventarioItemDTO(
                r.getId(), r.getNome(), "RESIDUO",
                r.getTipo() + " — " + r.getEstadoFisico(),
                r.getQuantidade(), r.getUnidadeMedida(),
                r.getStatus().name(), r.getObservacao());
    }

    private InventarioItemDTO frascoToDTO(FrascoReagente f) {
        return new InventarioItemDTO(
                f.getId(), f.getReagente().getNome(), "FRASCO",
                "Capacidade: " + f.getCapacidadeMaxima(),
                f.getQuantidadeAtual(),
                f.getReagente().getUnidadeReagente().name(),
                f.getStatus().name(), "Validade: " + f.getDataValidade());
    }
}