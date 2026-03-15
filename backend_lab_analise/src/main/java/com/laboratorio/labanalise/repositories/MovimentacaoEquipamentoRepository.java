package com.laboratorio.labanalise.repositories;

import com.laboratorio.labanalise.model.MovimentacaoEquipamento;
import com.laboratorio.labanalise.model.enums.TipoMovimentacaoEquipamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MovimentacaoEquipamentoRepository extends JpaRepository<MovimentacaoEquipamento, Long> {

    List<MovimentacaoEquipamento> findByEquipamentoIdOrderByDataMovimentacaoDesc(Long equipamentoId);

    List<MovimentacaoEquipamento> findByTipo(TipoMovimentacaoEquipamento tipo);

    @Query("SELECT COUNT(m) FROM MovimentacaoEquipamento m WHERE m.dataMovimentacao >= :inicio")
    long countByDataMovimentacaoAfter(@Param("inicio") LocalDateTime inicio);
}