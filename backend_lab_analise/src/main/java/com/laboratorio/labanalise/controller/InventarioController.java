package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.DTO.InventarioItemDTO;
import com.laboratorio.labanalise.services.InventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventario")
public class InventarioController {

    @Autowired
    private InventarioService inventarioService;

    // GET /inventario/reagentes?page=0&size=10
    @GetMapping("/reagentes")
    public ResponseEntity<Page<InventarioItemDTO>> listarReagentes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(inventarioService.listarReagentes(pageable));
    }

    // GET /inventario/equipamentos?page=0&size=10
    @GetMapping("/equipamentos")
    public ResponseEntity<Page<InventarioItemDTO>> listarEquipamentos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(inventarioService.listarEquipamentos(pageable));
    }

    // GET /inventario/residuos?page=0&size=10
    @GetMapping("/residuos")
    public ResponseEntity<Page<InventarioItemDTO>> listarResiduos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(inventarioService.listarResiduos(pageable));
    }

    // GET /inventario/frascos?page=0&size=10
    @GetMapping("/frascos")
    public ResponseEntity<Page<InventarioItemDTO>> listarFrascos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(inventarioService.listarFrascos(pageable));
    }
}