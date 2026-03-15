package com.laboratorio.labanalise.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.laboratorio.labanalise.DTO.projection.EquipamentoEstatisticasProjection;
import com.laboratorio.labanalise.model.Equipamento;
import com.laboratorio.labanalise.model.enums.StatusEquipamento;

@Repository
public interface EquipamentoRepository extends JpaRepository<Equipamento, Long> {

    // =========================
    // MÉTODOS ORIGINAIS
    // =========================
    @Query("""
        SELECT e.status AS nome, COUNT(e) AS quantidade
        FROM Equipamento e
        GROUP BY e.status
    """)
    List<EquipamentoEstatisticasProjection> contarPorStatus();

    @Query("""
        SELECT p.nomeProcedimento AS nome, COUNT(e) AS quantidade
        FROM Procedimento p
        JOIN p.equipamentos e
        GROUP BY p.nomeProcedimento
    """)
    List<EquipamentoEstatisticasProjection> distribuicaoPorProcedimento();

    @Query("""
        SELECT e.nome AS nome, COUNT(a.id) AS quantidade
        FROM AmostraEquipamento ae
        JOIN ae.equipamento e
        JOIN ae.amostra a
        GROUP BY e.nome
        ORDER BY COUNT(a.id) DESC
    """)
    List<EquipamentoEstatisticasProjection> contagemDeUso();

    @Query("""
        SELECT e.nome AS nome, COUNT(a.id) AS quantidade
        FROM AmostraEquipamento ae
        JOIN ae.equipamento e
        JOIN ae.amostra a
        GROUP BY e.nome
        ORDER BY COUNT(a.id) DESC
    """)
    List<EquipamentoEstatisticasProjection> top5MaisUsados();

    // =========================
    // NOVO — usado pelo resumo do inventário
    // =========================
    long countByStatus(StatusEquipamento status);
}