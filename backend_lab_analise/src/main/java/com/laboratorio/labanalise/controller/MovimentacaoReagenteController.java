package com.laboratorio.labanalise.controller;

import java.util.List;

import com.laboratorio.labanalise.DTO.MovimentacaoReagenteResponseDTO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laboratorio.labanalise.model.MovimentacaoReagente;
import com.laboratorio.labanalise.services.MovimentacaoReagenteService;

@RestController
@RequestMapping("/movimentacoes")
@CrossOrigin(origins = "*")
public class MovimentacaoReagenteController {

    private final MovimentacaoReagenteService service;

    public MovimentacaoReagenteController(MovimentacaoReagenteService service) {
        this.service = service;
    }

    @GetMapping
    public List<MovimentacaoReagente> listarTodas() {
        return service.listarTodas();
    }

    @GetMapping("/reagente/{reagenteId}")
    public List<MovimentacaoReagente> listarPorReagente(
            @PathVariable Long reagenteId
    ) {
        return service.listarPorReagente(reagenteId);
    }

    @GetMapping("/dto")
    public List<MovimentacaoReagenteResponseDTO> listarDTO() {
        return service.listarDTO();
    }
}
