package com.laboratorio.labanalise.repositories;

import com.laboratorio.labanalise.model.MovimentacaoResiduo;
import com.laboratorio.labanalise.model.enums.TipoMovimentacaoResiduo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MovimentacaoResiduoRepository extends JpaRepository<MovimentacaoResiduo, Long> {

    List<MovimentacaoResiduo> findByResiduoIdOrderByDataMovimentacaoDesc(Long residuoId);

    List<MovimentacaoResiduo> findByTipo(TipoMovimentacaoResiduo tipo);

    @Query("SELECT COUNT(m) FROM MovimentacaoResiduo m WHERE m.dataMovimentacao >= :inicio")
    long countByDataMovimentacaoAfter(@Param("inicio") LocalDateTime inicio);
}