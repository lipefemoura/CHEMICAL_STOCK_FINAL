import { useEffect, useState, useMemo } from "react";
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
  Pagination,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Collapse,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ScienceIcon from "@mui/icons-material/Science";
import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

import SideBar from "../components/SideBar";

import {
  getInventarioReagentes,
  getInventarioEquipamentos,
  getInventarioResiduos,
  getInventarioFrascos,
} from "../../services/inventarioService";

const PAGE_SIZE = 10;

/* ======================================================
   ORDENAÇÃO
====================================================== */
const ordenarItens = (itens, coluna, direcao) => {
  if (!coluna) return itens;
  return [...itens].sort((a, b) => {
    let valA = a[coluna] ?? "";
    let valB = b[coluna] ?? "";

    // Ordenação numérica para quantidade
    if (coluna === "quantidade") {
      valA = parseFloat(valA) || 0;
      valB = parseFloat(valB) || 0;
      return direcao === "asc" ? valA - valB : valB - valA;
    }

    // Ordenação por data (validade vem como "Validade: 2027-01-01")
    if (coluna === "informacaoExtra") {
      const extrairData = (v) => v?.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? "";
      valA = extrairData(valA);
      valB = extrairData(valB);
    }

    // Ordenação alfabética com locale pt-BR (trata acentos corretamente)
    return direcao === "asc"
      ? String(valA).localeCompare(String(valB), "pt-BR", {
          sensitivity: "base",
        })
      : String(valB).localeCompare(String(valA), "pt-BR", {
          sensitivity: "base",
        });
  });
};

/* ======================================================
   ÍCONE DE ORDENAÇÃO
====================================================== */
const IconeOrdenacao = ({ coluna, colunaAtiva, direcao }) => {
  if (coluna !== colunaAtiva) {
    return (
      <span style={{ opacity: 0.3, marginLeft: 4, fontSize: 12 }}>▲▼</span>
    );
  }
  return (
    <span style={{ marginLeft: 4, fontSize: 12 }}>
      {direcao === "asc" ? "▲" : "▼"}
    </span>
  );
};

/* ======================================================
   TABELA GENÉRICA COM ORDENAÇÃO
====================================================== */
const TabelaInventario = ({ itens, colunas }) => {
  const [colunaOrdem, setColunaOrdem] = useState(null);
  const [direcao, setDirecao] = useState("asc");

  const handleOrdenar = (key) => {
    if (colunaOrdem === key) {
      setDirecao((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setColunaOrdem(key);
      setDirecao("asc");
    }
  };

  const itenOrdenados = ordenarItens(itens, colunaOrdem, direcao);

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
          <TableRow sx={{ bgcolor: "#4CAF50" }}>
            {colunas.map((col) => (
              <TableCell
                key={col.key}
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  cursor: col.ordenavel !== false ? "pointer" : "default",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                  "&:hover":
                    col.ordenavel !== false ? { bgcolor: "#43A047" } : {},
                }}
                onClick={() =>
                  col.ordenavel !== false && handleOrdenar(col.key)
                }
              >
                {col.label}
                {col.ordenavel !== false && (
                  <IconeOrdenacao
                    coluna={col.key}
                    colunaAtiva={colunaOrdem}
                    direcao={direcao}
                  />
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {itenOrdenados.map((item) => (
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
   FILTROS POR ABA
====================================================== */

// Estilos compactos para os campos de filtro
const sxInput = { fontSize: "0.78rem" };
const sxMenuItem = { fontSize: "0.78rem" };

const CampoTexto = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  shrink = false,
  adornment = false,
}) => (
  <TextField
    fullWidth
    size="small"
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    type={type}
    InputProps={
      adornment
        ? {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 14 }} />
              </InputAdornment>
            ),
            style: sxInput,
          }
        : { style: sxInput }
    }
    InputLabelProps={{ style: sxInput, ...(shrink ? { shrink: true } : {}) }}
    inputProps={{ style: sxInput }}
  />
);

const CampoSelect = ({ label, name, value, onChange, children }) => (
  <FormControl fullWidth size="small">
    <InputLabel sx={sxInput}>{label}</InputLabel>
    <Select
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      sx={sxInput}
    >
      {children}
    </Select>
  </FormControl>
);

const BotaoLimpar = ({ onLimpar }) => (
  <Button
    fullWidth
    variant="outlined"
    size="small"
    onClick={onLimpar}
    sx={{
      borderColor: "#4CAF50",
      color: "#4CAF50",
      height: "40px",
      fontSize: "0.72rem",
      textTransform: "none",
      whiteSpace: "nowrap",
    }}
  >
    Limpar
  </Button>
);

const FiltrosReagentes = ({ filtros, onChange, onLimpar }) => (
  <Grid container spacing={1} alignItems="center">
    <Grid item xs={12} sm={6} md={3}>
      <CampoTexto
        label="Nome"
        name="nome"
        value={filtros.nome}
        onChange={onChange}
        adornment
      />
    </Grid>
    <Grid item xs={6} sm={3} md={2}>
      <CampoSelect
        label="Tipo"
        name="tipo"
        value={filtros.tipo}
        onChange={onChange}
      >
        <MenuItem value="" sx={sxMenuItem}>
          Todos
        </MenuItem>
        <MenuItem value="ÁCIDO" sx={sxMenuItem}>
          Ácido
        </MenuItem>
        <MenuItem value="BASE" sx={sxMenuItem}>
          Base
        </MenuItem>
        <MenuItem value="SAL" sx={sxMenuItem}>
          Sal
        </MenuItem>
        <MenuItem value="ÓXIDO" sx={sxMenuItem}>
          Óxido
        </MenuItem>
        <MenuItem value="PERÓXIDO" sx={sxMenuItem}>
          Peróxido
        </MenuItem>
        <MenuItem value="INDICADOR" sx={sxMenuItem}>
          Indicador
        </MenuItem>
        <MenuItem value="HIDRETO" sx={sxMenuItem}>
          Hidreto
        </MenuItem>
        <MenuItem value="OUTRO" sx={sxMenuItem}>
          Outro
        </MenuItem>
      </CampoSelect>
    </Grid>
    <Grid item xs={6} sm={3} md={2}>
      <CampoSelect
        label="Controlado"
        name="controlado"
        value={filtros.controlado}
        onChange={onChange}
      >
        <MenuItem value="" sx={sxMenuItem}>
          Todos
        </MenuItem>
        <MenuItem value="sim" sx={sxMenuItem}>
          Sim
        </MenuItem>
        <MenuItem value="nao" sx={sxMenuItem}>
          Não
        </MenuItem>
      </CampoSelect>
    </Grid>
    <Grid item xs={6} sm={3} md={2}>
      <CampoTexto
        label="Validade de"
        name="validadeInicio"
        value={filtros.validadeInicio}
        onChange={onChange}
        type="date"
        shrink
      />
    </Grid>
    <Grid item xs={6} sm={3} md={2}>
      <CampoTexto
        label="Validade até"
        name="validadeFim"
        value={filtros.validadeFim}
        onChange={onChange}
        type="date"
        shrink
      />
    </Grid>
    <Grid item xs={12} sm={6} md={1}>
      <BotaoLimpar onLimpar={onLimpar} />
    </Grid>
  </Grid>
);

const FiltrosFrascos = ({ filtros, onChange, onLimpar }) => (
  <Grid container spacing={1} alignItems="center">
    <Grid item xs={12} sm={6} md={4}>
      <CampoTexto
        label="Reagente"
        name="nome"
        value={filtros.nome}
        onChange={onChange}
        adornment
      />
    </Grid>
    <Grid item xs={6} sm={3} md={3}>
      <CampoSelect
        label="Status"
        name="status"
        value={filtros.status}
        onChange={onChange}
      >
        <MenuItem value="" sx={sxMenuItem}>
          Todos
        </MenuItem>
        <MenuItem value="CHEIO" sx={sxMenuItem}>
          Cheio
        </MenuItem>
        <MenuItem value="EM_USO" sx={sxMenuItem}>
          Em uso
        </MenuItem>
        <MenuItem value="VAZIO" sx={sxMenuItem}>
          Vazio
        </MenuItem>
      </CampoSelect>
    </Grid>
    <Grid item xs={6} sm={3} md={2}>
      <CampoTexto
        label="Validade de"
        name="validadeInicio"
        value={filtros.validadeInicio}
        onChange={onChange}
        type="date"
        shrink
      />
    </Grid>
    <Grid item xs={6} sm={3} md={2}>
      <CampoTexto
        label="Validade até"
        name="validadeFim"
        value={filtros.validadeFim}
        onChange={onChange}
        type="date"
        shrink
      />
    </Grid>
    <Grid item xs={12} sm={6} md={1}>
      <BotaoLimpar onLimpar={onLimpar} />
    </Grid>
  </Grid>
);

const FiltrosEquipamentos = ({ filtros, onChange, onLimpar }) => (
  <Grid container spacing={1} alignItems="center">
    <Grid item xs={12} sm={6} md={7}>
      <CampoTexto
        label="Nome"
        name="nome"
        value={filtros.nome}
        onChange={onChange}
        adornment
      />
    </Grid>
    <Grid item xs={12} sm={4} md={4}>
      <CampoSelect
        label="Status"
        name="status"
        value={filtros.status}
        onChange={onChange}
      >
        <MenuItem value="" sx={sxMenuItem}>
          Todos
        </MenuItem>
        <MenuItem value="ATIVO" sx={sxMenuItem}>
          Ativo
        </MenuItem>
        <MenuItem value="INATIVO" sx={sxMenuItem}>
          Inativo
        </MenuItem>
        <MenuItem value="MANUTENCAO" sx={sxMenuItem}>
          Manutenção
        </MenuItem>
      </CampoSelect>
    </Grid>
    <Grid item xs={12} sm={2} md={1}>
      <BotaoLimpar onLimpar={onLimpar} />
    </Grid>
  </Grid>
);

const FiltrosResiduos = ({ filtros, onChange, onLimpar }) => (
  <Grid container spacing={1} alignItems="center">
    <Grid item xs={12} sm={6} md={3}>
      <CampoTexto
        label="Nome"
        name="nome"
        value={filtros.nome}
        onChange={onChange}
        adornment
      />
    </Grid>
    <Grid item xs={6} sm={3} md={2}>
      <CampoSelect
        label="Status"
        name="status"
        value={filtros.status}
        onChange={onChange}
      >
        <MenuItem value="" sx={sxMenuItem}>
          Todos
        </MenuItem>
        <MenuItem value="EM_ESTOQUE" sx={sxMenuItem}>
          Em estoque
        </MenuItem>
        <MenuItem value="TRATADO" sx={sxMenuItem}>
          Tratado
        </MenuItem>
        <MenuItem value="DESCARTADO" sx={sxMenuItem}>
          Descartado
        </MenuItem>
      </CampoSelect>
    </Grid>
    <Grid item xs={6} sm={3} md={2}>
      <CampoTexto
        label="Tipo"
        name="tipo"
        value={filtros.tipo}
        onChange={onChange}
      />
    </Grid>
    <Grid item xs={6} sm={3} md={2}>
      <CampoTexto
        label="Geração de"
        name="geracaoInicio"
        value={filtros.geracaoInicio}
        onChange={onChange}
        type="date"
        shrink
      />
    </Grid>
    <Grid item xs={6} sm={3} md={2}>
      <CampoTexto
        label="Geração até"
        name="geracaoFim"
        value={filtros.geracaoFim}
        onChange={onChange}
        type="date"
        shrink
      />
    </Grid>
    <Grid item xs={12} sm={6} md={1}>
      <BotaoLimpar onLimpar={onLimpar} />
    </Grid>
  </Grid>
);

/* ======================================================
   COLUNAS POR ABA
====================================================== */
const colunasReagentes = [
  { key: "nome", label: "Nome", ordenavel: true },
  { key: "descricao", label: "Marca / Lote", ordenavel: true },
  { key: "quantidade", label: "Qtd. Frascos", ordenavel: true },
  { key: "unidade", label: "Unidade", ordenavel: true },
  { key: "informacaoExtra", label: "Validade", ordenavel: true },
  {
    key: "status",
    label: "Tipo",
    ordenavel: true,
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
  { key: "nome", label: "Nome", ordenavel: true },
  { key: "descricao", label: "Modelo / Fabricante", ordenavel: true },
  { key: "informacaoExtra", label: "Nº Série", ordenavel: true },
  {
    key: "status",
    label: "Status",
    ordenavel: true,
    render: (item) => <StatusChip status={item.status} />,
  },
];

const colunasResiduos = [
  { key: "nome", label: "Nome", ordenavel: true },
  { key: "descricao", label: "Tipo / Estado Físico", ordenavel: true },
  { key: "quantidade", label: "Quantidade", ordenavel: true },
  { key: "unidade", label: "Unidade", ordenavel: true },
  {
    key: "status",
    label: "Status",
    ordenavel: true,
    render: (item) => <StatusChip status={item.status} />,
  },
  { key: "informacaoExtra", label: "Observação", ordenavel: false },
];

const colunasFrascos = [
  { key: "nome", label: "Reagente", ordenavel: true },
  { key: "descricao", label: "Capacidade", ordenavel: true },
  { key: "quantidade", label: "Quantidade Atual", ordenavel: true },
  { key: "unidade", label: "Unidade", ordenavel: true },
  { key: "informacaoExtra", label: "Validade", ordenavel: true },
  {
    key: "status",
    label: "Status",
    ordenavel: true,
    render: (item) => <StatusChip status={item.status} />,
  },
];

/* ======================================================
   FILTROS INICIAIS
====================================================== */
const filtrosIniciais = {
  reagentes: {
    nome: "",
    tipo: "",
    controlado: "",
    validadeInicio: "",
    validadeFim: "",
  },
  frascos: { nome: "", status: "", validadeInicio: "", validadeFim: "" },
  equipamentos: { nome: "", status: "" },
  residuos: {
    nome: "",
    status: "",
    tipo: "",
    geracaoInicio: "",
    geracaoFim: "",
  },
};

/* ======================================================
   MAIN
====================================================== */
export default function Inventario() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filtrosVisiveis, setFiltrosVisiveis] = useState(true);
  const [filtros, setFiltros] = useState(filtrosIniciais);

  const [dados, setDados] = useState({
    reagentes: { content: [], totalElements: 0, totalPages: 0 },
    frascos: { content: [], totalElements: 0, totalPages: 0 },
    equipamentos: { content: [], totalElements: 0, totalPages: 0 },
    residuos: { content: [], totalElements: 0, totalPages: 0 },
  });

  const [paginas, setPaginas] = useState({
    reagentes: 1,
    frascos: 1,
    equipamentos: 1,
    residuos: 1,
  });

  const chaves = ["reagentes", "frascos", "equipamentos", "residuos"];
  const chaveAtiva = chaves[abaAtiva];

  const servicePorAba = {
    reagentes: getInventarioReagentes,
    frascos: getInventarioFrascos,
    equipamentos: getInventarioEquipamentos,
    residuos: getInventarioResiduos,
  };

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  const carregarAba = async (chave, page = 1) => {
    setLoading(true);
    try {
      const resultado = await servicePorAba[chave](page - 1, PAGE_SIZE);
      setDados((prev) => ({ ...prev, [chave]: resultado }));
    } catch (error) {
      console.error(`Erro ao carregar ${chave}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chaves.forEach((chave) => carregarAba(chave, 1));
  }, []);

  const handlePaginaChange = (_, novaPagina) => {
    setPaginas((prev) => ({ ...prev, [chaveAtiva]: novaPagina }));
    carregarAba(chaveAtiva, novaPagina);
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [chaveAtiva]: { ...prev[chaveAtiva], [name]: value },
    }));
  };

  const handleLimparFiltros = () => {
    setFiltros((prev) => ({
      ...prev,
      [chaveAtiva]: filtrosIniciais[chaveAtiva],
    }));
  };

  // Filtro local aplicado sobre os itens da página atual
  const aplicarFiltros = (itens) => {
    const f = filtros[chaveAtiva];
    return itens.filter((item) => {
      const nomeOk =
        !f.nome || item.nome?.toLowerCase().includes(f.nome.toLowerCase());
      const statusOk = !f.status || item.status === f.status;
      const tipoOk =
        !f.tipo ||
        item.status === f.tipo ||
        item.descricao?.toLowerCase().includes(f.tipo.toLowerCase());
      const controladoOk =
        !f.controlado ||
        (f.controlado === "sim" && item.descricao?.includes("controlado")) ||
        f.controlado === "nao";
      return nomeOk && statusOk && tipoOk && controladoOk;
    });
  };

  const itensFiltrados = aplicarFiltros(dados[chaveAtiva].content);

  const abas = [
    {
      label: `Reagentes (${dados.reagentes.totalElements})`,
      icon: <ScienceIcon fontSize="small" />,
      colunas: colunasReagentes,
    },
    {
      label: `Frascos (${dados.frascos.totalElements})`,
      icon: <Inventory2Icon fontSize="small" />,
      colunas: colunasFrascos,
    },
    {
      label: `Equipamentos (${dados.equipamentos.totalElements})`,
      icon: <BuildIcon fontSize="small" />,
      colunas: colunasEquipamentos,
    },
    {
      label: `Resíduos (${dados.residuos.totalElements})`,
      icon: <DeleteIcon fontSize="small" />,
      colunas: colunasResiduos,
    },
  ];

  const renderFiltros = () => {
    const props = {
      filtros: filtros[chaveAtiva],
      onChange: handleFiltroChange,
      onLimpar: handleLimparFiltros,
    };
    switch (chaveAtiva) {
      case "reagentes":
        return <FiltrosReagentes {...props} />;
      case "frascos":
        return <FiltrosFrascos {...props} />;
      case "equipamentos":
        return <FiltrosEquipamentos {...props} />;
      case "residuos":
        return <FiltrosResiduos {...props} />;
      default:
        return null;
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "#4CAF50" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Inventário Geral</Typography>
        </Toolbar>
      </AppBar>

      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

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
              value={dados.reagentes.totalElements}
              color="#4CAF50"
              icon={<ScienceIcon fontSize="large" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KpiCard
              title="Frascos"
              value={dados.frascos.totalElements}
              color="#2196F3"
              icon={<Inventory2Icon fontSize="large" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KpiCard
              title="Equipamentos"
              value={dados.equipamentos.totalElements}
              color="#FF9800"
              icon={<BuildIcon fontSize="large" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KpiCard
              title="Resíduos"
              value={dados.residuos.totalElements}
              color="#9C27B0"
              icon={<DeleteIcon fontSize="large" />}
            />
          </Grid>
        </Grid>

        {/* TABELAS */}
        <Card>
          <CardContent>
            {/* ABAS */}
            <Tabs
              value={abaAtiva}
              onChange={(_, novaAba) => {
                setAbaAtiva(novaAba);
              }}
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

            {/* BOTÃO MOSTRAR/OCULTAR FILTROS */}
            <Box display="flex" justifyContent="flex-end" mb={1}>
              <Button
                size="small"
                startIcon={<FilterListIcon />}
                onClick={() => setFiltrosVisiveis((prev) => !prev)}
                sx={{ color: "#4CAF50", textTransform: "none" }}
              >
                {filtrosVisiveis ? "Ocultar filtros" : "Mostrar filtros"}
              </Button>
            </Box>

            {/* FILTROS INLINE */}
            <Collapse in={filtrosVisiveis}>
              <Box
                sx={{
                  bgcolor: "#f9f9f9",
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  p: 2,
                  mb: 2,
                }}
              >
                {renderFiltros()}
              </Box>
            </Collapse>

            {/* TABELA */}
            {loading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress sx={{ color: "#4CAF50" }} />
              </Box>
            ) : (
              <TabelaInventario
                itens={itensFiltrados}
                colunas={abas[abaAtiva].colunas}
              />
            )}

            {/* PAGINAÇÃO */}
            {!loading && dados[chaveAtiva].totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                  count={dados[chaveAtiva].totalPages}
                  page={paginas[chaveAtiva]}
                  onChange={handlePaginaChange}
                  color="primary"
                  shape="rounded"
                />
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
