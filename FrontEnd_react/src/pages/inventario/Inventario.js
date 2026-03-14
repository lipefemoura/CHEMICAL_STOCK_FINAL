import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ScienceIcon from "@mui/icons-material/Science";
import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import Inventory2Icon from "@mui/icons-material/Inventory2";

import SideBar from "../components/SideBar";

import {
  getInventarioReagentes,
  getInventarioEquipamentos,
  getInventarioResiduos,
  getInventarioFrascos,
} from "../../services/inventarioService";

/* ======================================================
   TABELA GENÉRICA DE INVENTÁRIO
====================================================== */
const TabelaInventario = ({ itens, colunas }) => {
  if (!itens || itens.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ p: 2 }}>
        Nenhum item encontrado.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "#f5f5f5" }}>
            {colunas.map((col) => (
              <TableCell key={col.key} sx={{ fontWeight: "bold" }}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {itens.map((item) => (
            <TableRow key={item.id} hover>
              {colunas.map((col) => (
                <TableCell key={col.key}>
                  {col.render ? col.render(item) : (item[col.key] ?? "-")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

/* ======================================================
   KPI CARD
====================================================== */
const KpiCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: "100%", borderLeft: `6px solid ${color}` }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
        </Box>
        <Box sx={{ color }}>{icon}</Box>
      </Box>
    </CardContent>
  </Card>
);

/* ======================================================
   CHIP DE STATUS
====================================================== */
const StatusChip = ({ status }) => {
  const cores = {
    ATIVO: "success",
    CHEIO: "success",
    EM_USO: "warning",
    VAZIO: "error",
    MANUTENCAO: "warning",
    INATIVO: "default",
    EM_ESTOQUE: "info",
    DESCARTADO: "default",
    TRATADO: "success",
  };

  return (
    <Chip
      label={status ?? "-"}
      color={cores[status] ?? "default"}
      size="small"
    />
  );
};

/* ======================================================
   COLUNAS POR ABA
====================================================== */
const colunasReagentes = [
  { key: "nome", label: "Nome" },
  { key: "descricao", label: "Marca / Lote" },
  { key: "quantidade", label: "Qtd. Frascos" },
  { key: "unidade", label: "Unidade" },
  { key: "informacaoExtra", label: "Validade" },
  {
    key: "status",
    label: "Tipo",
    render: (item) => (
      <Chip
        label={item.status}
        size="small"
        color="primary"
        variant="outlined"
      />
    ),
  },
];

const colunasEquipamentos = [
  { key: "nome", label: "Nome" },
  { key: "descricao", label: "Modelo / Fabricante" },
  { key: "informacaoExtra", label: "Nº Série" },
  {
    key: "status",
    label: "Status",
    render: (item) => <StatusChip status={item.status} />,
  },
];

const colunasResiduos = [
  { key: "nome", label: "Nome" },
  { key: "descricao", label: "Tipo / Estado Físico" },
  { key: "quantidade", label: "Quantidade" },
  { key: "unidade", label: "Unidade" },
  {
    key: "status",
    label: "Status",
    render: (item) => <StatusChip status={item.status} />,
  },
  { key: "informacaoExtra", label: "Observação" },
];

const colunasFrascos = [
  { key: "nome", label: "Reagente" },
  { key: "descricao", label: "Capacidade" },
  { key: "quantidade", label: "Quantidade Atual" },
  { key: "unidade", label: "Unidade" },
  { key: "informacaoExtra", label: "Validade" },
  {
    key: "status",
    label: "Status",
    render: (item) => <StatusChip status={item.status} />,
  },
];

/* ======================================================
   MAIN
====================================================== */
export default function Inventario() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState(0);
  const [loading, setLoading] = useState(true);

  const [reagentes, setReagentes] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);
  const [residuos, setResiduos] = useState([]);
  const [frascos, setFrascos] = useState([]);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [dadosReagentes, dadosEquipamentos, dadosResiduos, dadosFrascos] =
        await Promise.all([
          getInventarioReagentes(),
          getInventarioEquipamentos(),
          getInventarioResiduos(),
          getInventarioFrascos(),
        ]);

      setReagentes(dadosReagentes ?? []);
      setEquipamentos(dadosEquipamentos ?? []);
      setResiduos(dadosResiduos ?? []);
      setFrascos(dadosFrascos ?? []);
    } catch (error) {
      console.error("Erro ao carregar inventário:", error);
    } finally {
      setLoading(false);
    }
  };

  const abas = [
    {
      label: `Reagentes (${reagentes.length})`,
      icon: <ScienceIcon fontSize="small" />,
      itens: reagentes,
      colunas: colunasReagentes,
    },
    {
      label: `Frascos (${frascos.length})`,
      icon: <Inventory2Icon fontSize="small" />,
      itens: frascos,
      colunas: colunasFrascos,
    },
    {
      label: `Equipamentos (${equipamentos.length})`,
      icon: <BuildIcon fontSize="small" />,
      itens: equipamentos,
      colunas: colunasEquipamentos,
    },
    {
      label: `Resíduos (${residuos.length})`,
      icon: <DeleteIcon fontSize="small" />,
      itens: residuos,
      colunas: colunasResiduos,
    },
  ];

  return (
    <>
      {/* APP BAR */}
      <AppBar position="fixed" sx={{ bgcolor: "#4CAF50" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Inventário Geral</Typography>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      {/* CONTEÚDO */}
      <Box sx={{ p: 3, pt: 10, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
        {/* HEADER */}
        <Box mb={3}>
          <Typography variant="h4" fontWeight="bold">
            Inventário Geral
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Visão consolidada de todos os ativos do laboratório
          </Typography>
        </Box>

        {/* KPIs */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <KpiCard
              title="Reagentes"
              value={reagentes.length}
              color="#4CAF50"
              icon={<ScienceIcon fontSize="large" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KpiCard
              title="Frascos"
              value={frascos.length}
              color="#2196F3"
              icon={<Inventory2Icon fontSize="large" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KpiCard
              title="Equipamentos"
              value={equipamentos.length}
              color="#FF9800"
              icon={<BuildIcon fontSize="large" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KpiCard
              title="Resíduos"
              value={residuos.length}
              color="#9C27B0"
              icon={<DeleteIcon fontSize="large" />}
            />
          </Grid>
        </Grid>

        {/* TABELAS POR ABA */}
        <Card>
          <CardContent>
            <Tabs
              value={abaAtiva}
              onChange={(_, novaAba) => setAbaAtiva(novaAba)}
              sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}
            >
              {abas.map((aba, index) => (
                <Tab
                  key={index}
                  label={aba.label}
                  icon={aba.icon}
                  iconPosition="start"
                />
              ))}
            </Tabs>

            {loading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress sx={{ color: "#4CAF50" }} />
              </Box>
            ) : (
              <TabelaInventario
                itens={abas[abaAtiva].itens}
                colunas={abas[abaAtiva].colunas}
              />
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
