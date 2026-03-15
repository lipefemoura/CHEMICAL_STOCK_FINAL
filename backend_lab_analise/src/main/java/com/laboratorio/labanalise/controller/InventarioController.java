package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.DTO.InventarioItemDTO;
import com.laboratorio.labanalise.DTO.InventarioResumoDTO;
import com.laboratorio.labanalise.services.InventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventario")
public class InventarioController {

    @Autowired
    private InventarioService inventarioService;

    // GET /inventario/resumo
    @GetMapping("/resumo")
    public ResponseEntity<InventarioResumoDTO> resumo() {
        return ResponseEntity.ok(inventarioService.resumo());
    }

    // GET /inventario/reagentes?page=0&size=10&sort=nome&direction=asc
    @GetMapping("/reagentes")
    public ResponseEntity<Page<InventarioItemDTO>> listarReagentes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "nome") String sort,
            @RequestParam(defaultValue = "asc") String direction) {
        return ResponseEntity.ok(
                inventarioService.listarReagentes(buildPageable(page, size, sort, direction)));
    }

    // GET /inventario/equipamentos?page=0&size=10&sort=nome&direction=asc
    @GetMapping("/equipamentos")
    public ResponseEntity<Page<InventarioItemDTO>> listarEquipamentos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "nome") String sort,
            @RequestParam(defaultValue = "asc") String direction) {
        return ResponseEntity.ok(
                inventarioService.listarEquipamentos(buildPageable(page, size, sort, direction)));
    }

    // GET /inventario/residuos?page=0&size=10&sort=nome&direction=asc
    @GetMapping("/residuos")
    public ResponseEntity<Page<InventarioItemDTO>> listarResiduos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "nome") String sort,
            @RequestParam(defaultValue = "asc") String direction) {
        return ResponseEntity.ok(
                inventarioService.listarResiduos(buildPageable(page, size, sort, direction)));
    }

    // GET /inventario/frascos?page=0&size=10&sort=nome&direction=asc
    @GetMapping("/frascos")
    public ResponseEntity<Page<InventarioItemDTO>> listarFrascos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "nome") String sort,
            @RequestParam(defaultValue = "asc") String direction) {
        return ResponseEntity.ok(
                inventarioService.listarFrascos(buildPageable(page, size, sort, direction)));
    }

    private Pageable buildPageable(int page, int size, String sort, String direction) {
        Sort sortObj = direction.equalsIgnoreCase("desc")
                ? Sort.by(sort).descending()
                : Sort.by(sort).ascending();
        return PageRequest.of(page, size, sortObj);
    }
}