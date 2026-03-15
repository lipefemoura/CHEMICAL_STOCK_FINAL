package com.laboratorio.labanalise.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.laboratorio.labanalise.model.*;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MovimentacaoReagenteRepository extends JpaRepository<MovimentacaoReagente, Long> {

    // =========================
    // MÉTODOS ORIGINAIS
    // =========================
    @Query("SELECT mr FROM MovimentacaoReagente mr WHERE mr.reagente.id = :id")
    MovimentacaoReagente obterMovimentacaoPorIdDoReagente(@Param("id") Long id);

    List<MovimentacaoReagente> findByReagenteIdOrderByDataMovimentacaoDesc(Long reagenteId);

    // =========================
    // NOVO — contagem por período
    // =========================
    @Query("SELECT COUNT(m) FROM MovimentacaoReagente m WHERE m.dataMovimentacao >= :inicio")
    long countByDataMovimentacaoAfter(@Param("inicio") LocalDateTime inicio);
}