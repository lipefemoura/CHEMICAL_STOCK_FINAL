package com.laboratorio.labanalise.DTO;

public class InventarioResumoDTO {

    // Reagentes
    private long totalReagentes;
    private long reagentesVencidos;
    private long reagentesProximosVencimento; // até 30 dias
    private long reagentesControlados;

    // Frascos
    private long totalFrascos;
    private long frascosVazios;
    private long frascosEmUso;
    private long frascosCheios;

    // Equipamentos
    private long totalEquipamentos;
    private long equipamentosEmManutencao;
    private long equipamentosInativos;
    private long equipamentosAtivos;

    // Resíduos
    private long totalResiduos;
    private long residuosEmEstoque;
    private long residuosTratados;
    private long residuosDescartados;

    public InventarioResumoDTO() {}

    // Getters e Setters
    public long getTotalReagentes() { return totalReagentes; }
    public void setTotalReagentes(long totalReagentes) { this.totalReagentes = totalReagentes; }

    public long getReagentesVencidos() { return reagentesVencidos; }
    public void setReagentesVencidos(long reagentesVencidos) { this.reagentesVencidos = reagentesVencidos; }

    public long getReagentesProximosVencimento() { return reagentesProximosVencimento; }
    public void setReagentesProximosVencimento(long reagentesProximosVencimento) { this.reagentesProximosVencimento = reagentesProximosVencimento; }

    public long getReagentesControlados() { return reagentesControlados; }
    public void setReagentesControlados(long reagentesControlados) { this.reagentesControlados = reagentesControlados; }

    public long getTotalFrascos() { return totalFrascos; }
    public void setTotalFrascos(long totalFrascos) { this.totalFrascos = totalFrascos; }

    public long getFrascosVazios() { return frascosVazios; }
    public void setFrascosVazios(long frascosVazios) { this.frascosVazios = frascosVazios; }

    public long getFrascosEmUso() { return frascosEmUso; }
    public void setFrascosEmUso(long frascosEmUso) { this.frascosEmUso = frascosEmUso; }

    public long getFrascosCheios() { return frascosCheios; }
    public void setFrascosCheios(long frascosCheios) { this.frascosCheios = frascosCheios; }

    public long getTotalEquipamentos() { return totalEquipamentos; }
    public void setTotalEquipamentos(long totalEquipamentos) { this.totalEquipamentos = totalEquipamentos; }

    public long getEquipamentosEmManutencao() { return equipamentosEmManutencao; }
    public void setEquipamentosEmManutencao(long equipamentosEmManutencao) { this.equipamentosEmManutencao = equipamentosEmManutencao; }

    public long getEquipamentosInativos() { return equipamentosInativos; }
    public void setEquipamentosInativos(long equipamentosInativos) { this.equipamentosInativos = equipamentosInativos; }

    public long getEquipamentosAtivos() { return equipamentosAtivos; }
    public void setEquipamentosAtivos(long equipamentosAtivos) { this.equipamentosAtivos = equipamentosAtivos; }

    public long getTotalResiduos() { return totalResiduos; }
    public void setTotalResiduos(long totalResiduos) { this.totalResiduos = totalResiduos; }

    public long getResiduosEmEstoque() { return residuosEmEstoque; }
    public void setResiduosEmEstoque(long residuosEmEstoque) { this.residuosEmEstoque = residuosEmEstoque; }

    public long getResiduosTratados() { return residuosTratados; }
    public void setResiduosTratados(long residuosTratados) { this.residuosTratados = residuosTratados; }

    public long getResiduosDescartados() { return residuosDescartados; }
    public void setResiduosDescartados(long residuosDescartados) { this.residuosDescartados = residuosDescartados; }

    // Movimentações
    private long movimentacoesHoje;
    private long movimentacoes7Dias;
    private long movimentacoes30Dias;

    public long getMovimentacoesHoje() { return movimentacoesHoje; }
    public void setMovimentacoesHoje(long movimentacoesHoje) { this.movimentacoesHoje = movimentacoesHoje; }

    public long getMovimentacoes7Dias() { return movimentacoes7Dias; }
    public void setMovimentacoes7Dias(long movimentacoes7Dias) { this.movimentacoes7Dias = movimentacoes7Dias; }

    public long getMovimentacoes30Dias() { return movimentacoes30Dias; }
    public void setMovimentacoes30Dias(long movimentacoes30Dias) { this.movimentacoes30Dias = movimentacoes30Dias; }
}