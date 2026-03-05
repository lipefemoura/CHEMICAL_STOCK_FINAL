package com.laboratorio.labanalise.controller;

import com.laboratorio.labanalise.DTO.ItemInventarioDTO;
import com.laboratorio.labanalise.model.enums.CategoriaInventario;
import com.laboratorio.labanalise.services.ItemInventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventario")
public class ItemInventarioController {

    @Autowired
    private ItemInventarioService itemInventarioService;

    // GET /inventario
    @GetMapping
    public ResponseEntity<List<ItemInventarioDTO>> listarTodos() {
        return ResponseEntity.ok(itemInventarioService.listarTodos());
    }

    // GET /inventario/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ItemInventarioDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(itemInventarioService.buscarPorId(id));
    }

    // GET /inventario/criticos
    @GetMapping("/criticos")
    public ResponseEntity<List<ItemInventarioDTO>> listarCriticos() {
        return ResponseEntity.ok(itemInventarioService.listarCriticos());
    }

    // GET /inventario/categoria/{categoria}
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ItemInventarioDTO>> listarPorCategoria(
            @PathVariable CategoriaInventario categoria) {
        return ResponseEntity.ok(itemInventarioService.listarPorCategoria(categoria));
    }

    // GET /inventario/buscar?nome=ponteira
    @GetMapping("/buscar")
    public ResponseEntity<List<ItemInventarioDTO>> buscarPorNome(@RequestParam String nome) {
        return ResponseEntity.ok(itemInventarioService.buscarPorNome(nome));
    }

    // POST /inventario
    @PostMapping
    public ResponseEntity<ItemInventarioDTO> criar(@RequestBody ItemInventarioDTO dto) {
        ItemInventarioDTO criado = itemInventarioService.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    // PUT /inventario/{id}
    @PutMapping("/{id}")
    public ResponseEntity<ItemInventarioDTO> atualizar(
            @PathVariable Long id,
            @RequestBody ItemInventarioDTO dto) {
        return ResponseEntity.ok(itemInventarioService.atualizar(id, dto));
    }

    // DELETE /inventario/{id}
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        itemInventarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
