package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.DTO.MovimentacaoEquipamentoDTO;
import com.laboratorio.labanalise.services.MovimentacaoEquipamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/equipamentos/movimentacoes")
public class MovimentacaoEquipamentoController {

    @Autowired
    private MovimentacaoEquipamentoService movimentacaoService;

    // GET /equipamentos/movimentacoes
    @GetMapping
    public ResponseEntity<List<MovimentacaoEquipamentoDTO>> listarTodas() {
        return ResponseEntity.ok(movimentacaoService.listarTodas());
    }

    // GET /equipamentos/movimentacoes/{equipamentoId}
    @GetMapping("/{equipamentoId}")
    public ResponseEntity<List<MovimentacaoEquipamentoDTO>> listarPorEquipamento(
            @PathVariable Long equipamentoId) {
        return ResponseEntity.ok(movimentacaoService.listarPorEquipamento(equipamentoId));
    }

    // POST /equipamentos/movimentacoes
    @PostMapping
    public ResponseEntity<MovimentacaoEquipamentoDTO> registrar(
            @RequestBody MovimentacaoEquipamentoDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(movimentacaoService.registrar(dto));
    }
}