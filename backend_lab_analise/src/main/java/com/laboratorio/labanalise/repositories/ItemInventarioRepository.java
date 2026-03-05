package com.laboratorio.labanalise.repositories;

import com.laboratorio.labanalise.model.ItemInventario;
import com.laboratorio.labanalise.model.enums.CategoriaInventario;
import com.laboratorio.labanalise.model.enums.StatusInventario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemInventarioRepository extends JpaRepository<ItemInventario, Long> {

    List<ItemInventario> findByCategoria(CategoriaInventario categoria);

    List<ItemInventario> findByStatus(StatusInventario status);

    // Retorna itens com quantidade abaixo do mínimo
    @Query("SELECT i FROM ItemInventario i WHERE i.quantidade < i.quantidadeMinima")
    List<ItemInventario> findItensCriticos();

    // Busca por nome ignorando maiúsculas/minúsculas
    List<ItemInventario> findByNomeContainingIgnoreCase(String nome);
}
