package com.laboratorio.labanalise.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laboratorio.labanalise.model.FrascoReagente;
import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.enums.StatusFrasco;

public interface FrascoReagenteRepository extends JpaRepository<FrascoReagente, Long> {

    // =========================
    // MÉTODOS ORIGINAIS
    // =========================
    List<FrascoReagente> findByReagenteAndStatusIn(
            Reagente reagente,
            List<StatusFrasco> status
    );

    @Query("""
        SELECT f FROM FrascoReagente f
        WHERE f.reagente = :reagente
        AND f.status <> 'VAZIO'
        ORDER BY f.id
    """)
    List<FrascoReagente> buscarFrascosDisponiveis(Reagente reagente);

    @Query("""
        SELECT f FROM FrascoReagente f
        WHERE f.reagente = :reagente
          AND f.status IN (:cheio, :emUso)
          AND f.quantidadeAtual > 0
        ORDER BY f.dataValidade ASC
    """)
    List<FrascoReagente> buscarFrascosDisponiveisOrdenadoPorValidade(
            @Param("reagente") Reagente reagente,
            @Param("cheio") StatusFrasco cheio,
            @Param("emUso") StatusFrasco emUso
    );

    @Query("""
        SELECT COALESCE(SUM(f.quantidadeAtual), 0)
        FROM FrascoReagente f
        WHERE f.reagente = :reagente
    """)
    Double somarQuantidadeAtualPorReagente(@Param("reagente") Reagente reagente);

    List<FrascoReagente> findByReagente(Reagente reagente);

    @Query("""
        SELECT COUNT(f)
        FROM FrascoReagente f
        WHERE f.status IN ('CHEIO', 'EM_USO')
        AND f.quantidadeAtual > 0
    """)
    Long contarFrascosDisponiveis();

    // =========================
    // NOVOS — usados pelo resumo do inventário
    // =========================
    long countByStatus(StatusFrasco status);

    @Query("SELECT COUNT(f) FROM FrascoReagente f")
    long getTotalFrascos();
}