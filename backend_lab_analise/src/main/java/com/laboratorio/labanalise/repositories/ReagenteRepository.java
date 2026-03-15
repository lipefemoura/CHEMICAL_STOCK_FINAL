package com.laboratorio.labanalise.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.laboratorio.labanalise.model.Reagente;
import com.laboratorio.labanalise.model.enums.TipoReagente;

@Repository
public interface ReagenteRepository extends JpaRepository<Reagente, Long> {

    // =========================
    // MÉTODOS ORIGINAIS
    // =========================
    @Query("SELECT r FROM Reagente r WHERE r.dataValidade < CURRENT_DATE")
    List<Reagente> reagentesVencidos();

    @Query("SELECT SUM(r.quantidadeDeFrascos) FROM Reagente r")
    Integer somarTodosOsFrascos();

    @Query("SELECT r.tipo, COUNT(r) FROM Reagente r GROUP BY r.tipo")
    List<Object[]> countReagentesByTipo();

    @Query("SELECT r FROM Reagente r WHERE r.dataValidade BETWEEN :hoje AND :quinzeDias")
    List<Reagente> proximosAVencer15Dias(@Param("hoje") LocalDate hoje,
                                         @Param("quinzeDias") LocalDate quinzeDias);

    @Query("SELECT r FROM Reagente r WHERE r.dataValidade > :quinzeDias AND r.dataValidade <= :trintaDias")
    List<Reagente> vencemEm30Dias(@Param("quinzeDias") LocalDate quinzeDias,
                                  @Param("trintaDias") LocalDate trintaDias);

    @Query("SELECT COUNT(r) FROM Reagente r WHERE r.controlado = true")
    long contarReagentesControlados();

    List<Reagente> findByNomeContainingIgnoreCase(String nome);

    @Query("SELECT r FROM Reagente r WHERE "
            + "(:nome IS NULL OR LOWER(r.nome) LIKE LOWER(CONCAT('%', :nome, '%'))) AND "
            + "(:tipo IS NULL OR r.tipo = :tipo) AND "
            + "(:dataInicio IS NULL OR r.criadoEm >= :dataInicio) AND "
            + "(:dataFim IS NULL OR r.criadoEm <= :dataFim)")
    List<Reagente> buscarFiltrados(@Param("nome") String nome,
                                   @Param("tipo") TipoReagente tipo,
                                   @Param("dataInicio") LocalDate dataInicio,
                                   @Param("dataFim") LocalDate dataFim);

    @Query("""
        SELECT COUNT(r)
        FROM Reagente r
        WHERE r.dataValidade < :hoje
    """)
    Long contarReagentesVencidos(@Param("hoje") LocalDate hoje);

    // =========================
    // NOVOS — usados pelo resumo do inventário
    // =========================
    @Query("SELECT COUNT(r) FROM Reagente r WHERE r.dataValidade < :hoje")
    long countVencidos(@Param("hoje") LocalDate hoje);

    @Query("SELECT COUNT(r) FROM Reagente r WHERE r.dataValidade BETWEEN :hoje AND :limite")
    long countProximosVencimento(@Param("hoje") LocalDate hoje,
                                 @Param("limite") LocalDate limite);

    @Query("SELECT COUNT(r) FROM Reagente r WHERE r.controlado = true")
    long countControlados();
}