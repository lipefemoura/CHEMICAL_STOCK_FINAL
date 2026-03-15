package com.laboratorio.labanalise.repositories;

import com.laboratorio.labanalise.model.Residuo;
import com.laboratorio.labanalise.model.enums.StatusResiduo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResiduoRepository extends JpaRepository<Residuo, Long> {

    // =========================
    // MÉTODOS ORIGINAIS
    // =========================
    Residuo findByNome(String nome);

    // =========================
    // NOVO — usado pelo resumo do inventário
    // =========================
    long countByStatus(StatusResiduo status);
}