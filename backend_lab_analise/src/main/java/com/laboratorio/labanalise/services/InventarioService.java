package com.laboratorio.labanalise.services;

import com.laboratorio.labanalise.DTO.InventarioItemDTO;
import com.laboratorio.labanalise.model.Equipamento;
import com.laboratorio.labanalise.model.FrascoReagente;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.Residuo;
import com.laboratorio.labanalise.repositories.EquipamentoRepository;
import com.laboratorio.labanalise.repositories.FrascoReagenteRepository;
import com.laboratorio.labanalise.repositories.ReagenteRepository;
import com.laboratorio.labanalise.repositories.ResiduoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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

    public Page<InventarioItemDTO> listarReagentes(Pageable pageable) {
        return reagenteRepository.findAll(pageable)
                .map(this::reagenteToDTO);
    }

    public Page<InventarioItemDTO> listarEquipamentos(Pageable pageable) {
        return equipamentoRepository.findAll(pageable)
                .map(this::equipamentoToDTO);
    }

    public Page<InventarioItemDTO> listarResiduos(Pageable pageable) {
        return residuoRepository.findAll(pageable)
                .map(this::residuoToDTO);
    }

    public Page<InventarioItemDTO> listarFrascos(Pageable pageable) {
        return frascoReagenteRepository.findAll(pageable)
                .map(this::frascoToDTO);
    }

    // -------------------------
    // Conversores
    // -------------------------

    private InventarioItemDTO reagenteToDTO(Reagente r) {
        return new InventarioItemDTO(
                r.getId(),
                r.getNome(),
                "REAGENTE",
                r.getMarca() + " — Lote: " + r.getLote(),
                (double) r.getQuantidadeDeFrascos(),
                "frascos",
                r.getTipo().name(),
                "Validade: " + r.getDataValidade()
        );
    }

    private InventarioItemDTO equipamentoToDTO(Equipamento e) {
        return new InventarioItemDTO(
                e.getId(),
                e.getNome(),
                "EQUIPAMENTO",
                e.getModelo() + " — " + e.getFabricante(),
                null,
                null,
                e.getStatus().name(),
                "Nº Série: " + e.getNumeroSerie()
        );
    }

    private InventarioItemDTO residuoToDTO(Residuo r) {
        return new InventarioItemDTO(
                r.getId(),
                r.getNome(),
                "RESIDUO",
                r.getTipo() + " — " + r.getEstadoFisico(),
                r.getQuantidade(),
                r.getUnidadeMedida(),
                r.getStatus().name(),
                r.getObservacao()
        );
    }

    private InventarioItemDTO frascoToDTO(FrascoReagente f) {
        return new InventarioItemDTO(
                f.getId(),
                f.getReagente().getNome(),
                "FRASCO",
                "Capacidade: " + f.getCapacidadeMaxima(),
                f.getQuantidadeAtual(),
                f.getReagente().getUnidadeReagente().name(),
                f.getStatus().name(),
                "Validade: " + f.getDataValidade()
        );
    }
}