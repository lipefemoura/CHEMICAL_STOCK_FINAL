package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.DTO.MovimentacaoResiduoDTO;
import com.laboratorio.labanalise.services.MovimentacaoResiduoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/residuos/movimentacoes")
public class MovimentacaoResiduoController {

    @Autowired
    private MovimentacaoResiduoService movimentacaoService;

    // GET /residuos/movimentacoes
    @GetMapping
    public ResponseEntity<List<MovimentacaoResiduoDTO>> listarTodas() {
        return ResponseEntity.ok(movimentacaoService.listarTodas());
    }

    // GET /residuos/movimentacoes/{residuoId}
    @GetMapping("/{residuoId}")
    public ResponseEntity<List<MovimentacaoResiduoDTO>> listarPorResiduo(
            @PathVariable Long residuoId) {
        return ResponseEntity.ok(movimentacaoService.listarPorResiduo(residuoId));
    }

    // POST /residuos/movimentacoes
    @PostMapping
    public ResponseEntity<MovimentacaoResiduoDTO> registrar(
            @RequestBody MovimentacaoResiduoDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(movimentacaoService.registrar(dto));
    }
}