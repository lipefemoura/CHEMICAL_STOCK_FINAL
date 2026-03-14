package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.DTO.InventarioItemDTO;
import com.laboratorio.labanalise.services.InventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventario")
public class InventarioController {

    @Autowired
    private InventarioService inventarioService;

    // GET /inventario/reagentes
    @GetMapping("/reagentes")
    public ResponseEntity<List<InventarioItemDTO>> listarReagentes() {
        return ResponseEntity.ok(inventarioService.listarReagentes());
    }

    // GET /inventario/equipamentos
    @GetMapping("/equipamentos")
    public ResponseEntity<List<InventarioItemDTO>> listarEquipamentos() {
        return ResponseEntity.ok(inventarioService.listarEquipamentos());
    }

    // GET /inventario/residuos
    @GetMapping("/residuos")
    public ResponseEntity<List<InventarioItemDTO>> listarResiduos() {
        return ResponseEntity.ok(inventarioService.listarResiduos());
    }

    // GET /inventario/frascos
    @GetMapping("/frascos")
    public ResponseEntity<List<InventarioItemDTO>> listarFrascos() {
        return ResponseEntity.ok(inventarioService.listarFrascos());
    }
}