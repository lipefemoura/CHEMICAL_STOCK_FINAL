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
import HistoryIcon from "@mui/icons-material/History";

import SideBar from "../components/SideBar";

import {
  getInventarioReagentes,
  getInventarioEquipamentos,
  getInventarioResiduos,
  getInventarioFrascos,
  getInventarioResumo,
} from "../../services/inventarioService";

import {
  getMovimentacoesEquipamentos,
  getMovimentacoesResiduos,
  getMovimentacoesReagentes,
} from "../../services/movimentacaoInventarioService";

const PAGE_SIZE = 10;

/* Ordenação movida para o backend via sort/direction params */

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
const TabelaInventario = ({ itens, colunas, sortKey, sortDir, onSort }) => {
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
                onClick={() => col.ordenavel !== false && onSort(col.key)}
              >
                {col.label}
                {col.ordenavel !== false && (
                  <IconeOrdenacao
                    coluna={col.key}
                    colunaAtiva={sortKey}
                    direcao={sortDir}
                  />
                )}
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
   ABA CARD — bloco clicável que funciona como aba
====================================================== */
const AbaCard = ({ title, icon, color, total, alertas, ativo, onClick }) => (
  <Card
    onClick={onClick}
    sx={{
      height: "100%",
      borderLeft: `6px solid ${color}`,
      cursor: "pointer",
      outline: ativo ? `2px solid ${color}` : "2px solid transparent",
      boxShadow: ativo ? 6 : 2,
      transition: "all 0.2s ease",
      "&:hover": { boxShadow: 6, transform: "translateY(-2px)" },
    }}
  >
    <CardContent sx={{ pb: "12px !important" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight="bold"
          >
            {title}
          </Typography>
          {total !== null && total !== undefined && (
            <Typography variant="h4" fontWeight="bold" sx={{ color, my: 0.5 }}>
              {total}
            </Typography>
          )}
        </Box>
        <Box sx={{ color, opacity: ativo ? 1 : 0.5 }}>{icon}</Box>
      </Box>
      {alertas && (
        <Box mt={1} display="flex" flexDirection="column" gap={0.8}>
          {alertas.map((a, i) => (
            <Chip
              key={i}
              label={`${a.label}: ${a.valor ?? "—"}`}
              color={a.valor > 0 ? a.cor : "default"}
              sx={{
                fontSize: "0.75rem",
                height: 26,
                width: "100%",
                justifyContent: "center",
                "& .MuiChip-label": { px: 1 },
              }}
            />
          ))}
        </Box>
      )}
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
   TABELA DE MOVIMENTAÇÕES
====================================================== */
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
   TABELA DE MOVIMENTAÇÕES
====================================================== */
const tipoChipColor = {
  // Equipamento
  CADASTRO: "default",
  ENTRADA_MANUTENCAO: "warning",
  SAIDA_MANUTENCAO: "success",
  DESATIVACAO: "error",
  REATIVACAO: "success",
  // Resíduo
  GERACAO: "info",
  TRATAMENTO: "warning",
  DESCARTE: "default",
  // Reagente
  ENTRADA: "success",
  SAIDA: "error",
};

const tipoLabel = {
  // Equipamento
  CADASTRO: "Cadastro",
  ENTRADA_MANUTENCAO: "Entrada Manutenção",
  SAIDA_MANUTENCAO: "Saída Manutenção",
  DESATIVACAO: "Desativação",
  REATIVACAO: "Reativação",
  // Resíduo
  GERACAO: "Geração",
  TRATAMENTO: "Tratamento",
  DESCARTE: "Descarte",
  // Reagente
  ENTRADA: "Entrada",
  SAIDA: "Saída",
};

const colunasMov = [
  { key: "dataMovimentacao", label: "Data" },
  { key: "origem", label: "Origem" },
  { key: "nome", label: "Item" },
  { key: "tipo", label: "Tipo" },
  { key: "motivo", label: "Motivo" },
  { key: "registradoPor", label: "Registrado por" },
];

const ordenarMovimentacoes = (itens, coluna, direcao) => {
  if (!coluna) return itens;
  return [...itens].sort((a, b) => {
    let valA = a[coluna] ?? "";
    let valB = b[coluna] ?? "";
    if (coluna === "dataMovimentacao") {
      return direcao === "asc"
        ? new Date(valA) - new Date(valB)
        : new Date(valB) - new Date(valA);
    }
    return direcao === "asc"
      ? String(valA).localeCompare(String(valB), "pt-BR", {
          sensitivity: "base",
        })
      : String(valB).localeCompare(String(valA), "pt-BR", {
          sensitivity: "base",
        });
  });
};

const MOV_PAGE_SIZE = 10;

const TabelaMovimentacoes = ({ movimentacoes, loadingMov }) => {
  const [filtroOrigem, setFiltroOrigem] = useState("todos");
  const [filtroBusca, setFiltroBusca] = useState("");
  const [colunaOrdem, setColunaOrdem] = useState("dataMovimentacao");
  const [direcao, setDirecao] = useState("desc");
  const [paginaAtual, setPaginaAtual] = useState(1);

  const handleOrdenar = (key) => {
    if (colunaOrdem === key) {
      setDirecao((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setColunaOrdem(key);
      setDirecao("asc");
    }
    setPaginaAtual(1);
  };

  const itensFiltradosOrdenados = ordenarMovimentacoes(
    movimentacoes.filter((m) => {
      const origemOk = filtroOrigem === "todos" || m.origem === filtroOrigem;
      const buscaOk =
        !filtroBusca ||
        m.nome?.toLowerCase().includes(filtroBusca.toLowerCase()) ||
        m.motivo?.toLowerCase().includes(filtroBusca.toLowerCase());
      return origemOk && buscaOk;
    }),
    colunaOrdem,
    direcao,
  );

  const totalPaginas = Math.ceil(
    itensFiltradosOrdenados.length / MOV_PAGE_SIZE,
  );
  const itensPagina = itensFiltradosOrdenados.slice(
    (paginaAtual - 1) * MOV_PAGE_SIZE,
    paginaAtual * MOV_PAGE_SIZE,
  );

  const handleFiltroOrigem = (e) => {
    setFiltroOrigem(e.target.value);
    setPaginaAtual(1);
  };
  const handleFiltroBusca = (e) => {
    setFiltroBusca(e.target.value);
    setPaginaAtual(1);
  };
  const handleLimpar = () => {
    setFiltroOrigem("todos");
    setFiltroBusca("");
    setPaginaAtual(1);
  };

  if (loadingMov) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress sx={{ color: "#4CAF50" }} />
      </Box>
    );
  }

  const thStyle = (key) => ({
    fontWeight: "bold",
    color: "white",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    "&:hover": { bgcolor: "#43A047" },
  });

  return (
    <Box>
      <Box display="flex" gap={2} mb={2} alignItems="center" flexWrap="wrap">
        <TextField
          size="small"
          placeholder="Buscar por nome ou motivo..."
          value={filtroBusca}
          onChange={handleFiltroBusca}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 14 }} />
              </InputAdornment>
            ),
            style: { fontSize: "0.78rem" },
          }}
          sx={{ width: 280 }}
        />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel sx={{ fontSize: "0.78rem" }}>Origem</InputLabel>
          <Select
            value={filtroOrigem}
            onChange={handleFiltroOrigem}
            label="Origem"
            sx={{ fontSize: "0.78rem" }}
          >
            <MenuItem value="todos" sx={{ fontSize: "0.78rem" }}>
              Todos
            </MenuItem>
            <MenuItem value="REAGENTE" sx={{ fontSize: "0.78rem" }}>
              Reagentes
            </MenuItem>
            <MenuItem value="EQUIPAMENTO" sx={{ fontSize: "0.78rem" }}>
              Equipamentos
            </MenuItem>
            <MenuItem value="RESIDUO" sx={{ fontSize: "0.78rem" }}>
              Resíduos
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          size="small"
          variant="outlined"
          onClick={handleLimpar}
          sx={{
            borderColor: "#4CAF50",
            color: "#4CAF50",
            fontSize: "0.72rem",
            textTransform: "none",
          }}
        >
          Limpar
        </Button>
      </Box>

      {itensFiltradosOrdenados.length === 0 ? (
        <Typography color="text.secondary" sx={{ p: 2 }}>
          Nenhuma movimentação encontrada.
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={0}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "#4CAF50" }}>
                {colunasMov.map((col) => (
                  <TableCell
                    key={col.key}
                    sx={thStyle(col.key)}
                    onClick={() => handleOrdenar(col.key)}
                  >
                    {col.label}
                    {colunaOrdem === col.key ? (
                      <span style={{ marginLeft: 4, fontSize: 12 }}>
                        {direcao === "asc" ? "▲" : "▼"}
                      </span>
                    ) : (
                      <span
                        style={{ opacity: 0.3, marginLeft: 4, fontSize: 12 }}
                      >
                        ▲▼
                      </span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {itensPagina.map((mov, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ whiteSpace: "nowrap", fontSize: "0.8rem" }}>
                    {mov.dataMovimentacao
                      ? new Date(mov.dataMovimentacao).toLocaleString("pt-BR")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={mov.origem}
                      size="small"
                      color={
                        mov.origem === "EQUIPAMENTO"
                          ? "warning"
                          : mov.origem === "REAGENTE"
                            ? "primary"
                            : "secondary"
                      }
                      variant="outlined"
                      sx={{ fontSize: "0.7rem" }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.8rem" }}>
                    {mov.nome ?? "-"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={tipoLabel[mov.tipo] ?? mov.tipo}
                      size="small"
                      color={tipoChipColor[mov.tipo] ?? "default"}
                      sx={{ fontSize: "0.7rem" }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.8rem" }}>
                    {mov.motivo ?? "-"}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.8rem" }}>
                    {mov.registradoPor ?? "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {totalPaginas > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPaginas}
            page={paginaAtual}
            onChange={(_, p) => setPaginaAtual(p)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
};

/* ======================================================
   MAIN
====================================================== */
export default function Inventario() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMov, setLoadingMov] = useState(true);
  const [filtrosVisiveis, setFiltrosVisiveis] = useState(true);
  const [filtros, setFiltros] = useState(filtrosIniciais);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [resumo, setResumo] = useState(null);

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
  const [ordenacao, setOrdenacao] = useState({
    reagentes: { sort: "nome", direction: "asc" },
    frascos: { sort: "nome", direction: "asc" },
    equipamentos: { sort: "nome", direction: "asc" },
    residuos: { sort: "nome", direction: "asc" },
  });

  const chaves = ["reagentes", "frascos", "equipamentos", "residuos"];
  const isAbaMovimentacoes = abaAtiva === 4;
  const chaveAtiva = chaves[abaAtiva] ?? null;

  const servicePorAba = {
    reagentes: getInventarioReagentes,
    frascos: getInventarioFrascos,
    equipamentos: getInventarioEquipamentos,
    residuos: getInventarioResiduos,
  };

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  const carregarAba = async (
    chave,
    page = 1,
    sort = null,
    direction = null,
  ) => {
    setLoading(true);
    try {
      const ord = ordenacao[chave];
      const s = sort ?? ord.sort;
      const d = direction ?? ord.direction;
      const resultado = await servicePorAba[chave](page - 1, PAGE_SIZE, s, d);
      setDados((prev) => ({ ...prev, [chave]: resultado }));
    } catch (error) {
      console.error(`Erro ao carregar ${chave}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const carregarMovimentacoes = async () => {
    setLoadingMov(true);
    try {
      const [movEquip, movResid, movReag] = await Promise.all([
        getMovimentacoesEquipamentos(),
        getMovimentacoesResiduos(),
        getMovimentacoesReagentes(),
      ]);
      const equipFormatadas = (movEquip ?? []).map((m) => ({
        ...m,
        origem: "EQUIPAMENTO",
        nome: m.equipamentoNome,
      }));
      const residFormatadas = (movResid ?? []).map((m) => ({
        ...m,
        origem: "RESIDUO",
        nome: m.residuoNome,
      }));
      const reagFormatadas = (movReag ?? []).map((m) => ({
        ...m,
        origem: "REAGENTE",
        nome: m.nomeReagente,
        registradoPor: m.cadastradoPor ?? "-",
      }));
      const todas = [
        ...equipFormatadas,
        ...residFormatadas,
        ...reagFormatadas,
      ].sort(
        (a, b) => new Date(b.dataMovimentacao) - new Date(a.dataMovimentacao),
      );
      setMovimentacoes(todas);
    } catch (error) {
      console.error("Erro ao carregar movimentações:", error);
    } finally {
      setLoadingMov(false);
    }
  };

  const carregarResumo = async () => {
    try {
      const data = await getInventarioResumo();
      setResumo(data);
    } catch (error) {
      console.error("Erro ao carregar resumo:", error);
    }
  };

  useEffect(() => {
    chaves.forEach((chave) => carregarAba(chave, 1));
    carregarMovimentacoes();
    carregarResumo();
  }, []);

  const handlePaginaChange = (_, novaPagina) => {
    if (!chaveAtiva) return;
    setPaginas((prev) => ({ ...prev, [chaveAtiva]: novaPagina }));
    carregarAba(chaveAtiva, novaPagina);
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    if (!chaveAtiva) return;
    setFiltros((prev) => ({
      ...prev,
      [chaveAtiva]: { ...prev[chaveAtiva], [name]: value },
    }));
  };

  const handleLimparFiltros = () => {
    if (!chaveAtiva) return;
    setFiltros((prev) => ({
      ...prev,
      [chaveAtiva]: filtrosIniciais[chaveAtiva],
    }));
  };

  const handleSort = (key) => {
    if (!chaveAtiva) return;
    const atual = ordenacao[chaveAtiva];
    const newDirection =
      atual.sort === key && atual.direction === "asc" ? "desc" : "asc";
    setOrdenacao((prev) => ({
      ...prev,
      [chaveAtiva]: { sort: key, direction: newDirection },
    }));
    setPaginas((prev) => ({ ...prev, [chaveAtiva]: 1 }));
    carregarAba(chaveAtiva, 1, key, newDirection);
  };

  const aplicarFiltros = (itens) => {
    if (!chaveAtiva) return itens;
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

  const itensFiltrados = chaveAtiva
    ? aplicarFiltros(dados[chaveAtiva].content)
    : [];

  const abas = [
    {
      label: `Reagentes (${dados.reagentes.totalElements})`,
      icon: <ScienceIcon fontSize="small" />,
    },
    {
      label: `Frascos (${dados.frascos.totalElements})`,
      icon: <Inventory2Icon fontSize="small" />,
    },
    {
      label: `Equipamentos (${dados.equipamentos.totalElements})`,
      icon: <BuildIcon fontSize="small" />,
    },
    {
      label: `Resíduos (${dados.residuos.totalElements})`,
      icon: <DeleteIcon fontSize="small" />,
    },
    {
      label: `Movimentações (${movimentacoes.length})`,
      icon: <HistoryIcon fontSize="small" />,
    },
  ];

  const colunasAba = [
    colunasReagentes,
    colunasFrascos,
    colunasEquipamentos,
    colunasResiduos,
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

        {/* ABA CARDS — blocos clicáveis que selecionam a aba */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AbaCard
              title="Reagentes"
              icon={<ScienceIcon fontSize="large" />}
              color="#4CAF50"
              total={resumo?.totalReagentes ?? dados.reagentes.totalElements}
              ativo={abaAtiva === 0}
              onClick={() => setAbaAtiva(0)}
              alertas={[
                {
                  label: "Vencidos",
                  valor: resumo?.reagentesVencidos,
                  cor: "error",
                },
                {
                  label: "Próx. vcto",
                  valor: resumo?.reagentesProximosVencimento,
                  cor: "warning",
                },
                {
                  label: "Controlados",
                  valor: resumo?.reagentesControlados,
                  cor: "secondary",
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AbaCard
              title="Frascos"
              icon={<Inventory2Icon fontSize="large" />}
              color="#2196F3"
              total={resumo?.totalFrascos ?? dados.frascos.totalElements}
              ativo={abaAtiva === 1}
              onClick={() => setAbaAtiva(1)}
              alertas={[
                {
                  label: "Cheios",
                  valor: resumo?.frascosCheios,
                  cor: "success",
                },
                {
                  label: "Em uso",
                  valor: resumo?.frascosEmUso,
                  cor: "warning",
                },
                { label: "Vazios", valor: resumo?.frascosVazios, cor: "error" },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AbaCard
              title="Equipamentos"
              icon={<BuildIcon fontSize="large" />}
              color="#FF9800"
              total={
                resumo?.totalEquipamentos ?? dados.equipamentos.totalElements
              }
              ativo={abaAtiva === 2}
              onClick={() => setAbaAtiva(2)}
              alertas={[
                {
                  label: "Ativos",
                  valor: resumo?.equipamentosAtivos,
                  cor: "success",
                },
                {
                  label: "Manutenção",
                  valor: resumo?.equipamentosEmManutencao,
                  cor: "warning",
                },
                {
                  label: "Inativos",
                  valor: resumo?.equipamentosInativos,
                  cor: "error",
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AbaCard
              title="Resíduos"
              icon={<DeleteIcon fontSize="large" />}
              color="#9C27B0"
              total={resumo?.totalResiduos ?? dados.residuos.totalElements}
              ativo={abaAtiva === 3}
              onClick={() => setAbaAtiva(3)}
              alertas={[
                {
                  label: "Em estoque",
                  valor: resumo?.residuosEmEstoque,
                  cor: "info",
                },
                {
                  label: "Tratados",
                  valor: resumo?.residuosTratados,
                  cor: "success",
                },
                {
                  label: "Descartados",
                  valor: resumo?.residuosDescartados,
                  cor: "default",
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AbaCard
              title="Movimentações"
              icon={<HistoryIcon fontSize="large" />}
              color="#607D8B"
              total={null}
              ativo={abaAtiva === 4}
              onClick={() => setAbaAtiva(4)}
              alertas={[
                {
                  label: "Hoje",
                  valor: resumo?.movimentacoesHoje,
                  cor: "primary",
                },
                {
                  label: "7 dias",
                  valor: resumo?.movimentacoes7Dias,
                  cor: "info",
                },
                {
                  label: "30 dias",
                  valor: resumo?.movimentacoes30Dias,
                  cor: "default",
                },
              ]}
            />
          </Grid>
        </Grid>

        {/* TABELAS */}
        <Card>
          <CardContent>
            {/* ABA DE MOVIMENTAÇÕES */}
            {isAbaMovimentacoes ? (
              <TabelaMovimentacoes
                movimentacoes={movimentacoes}
                loadingMov={loadingMov}
              />
            ) : (
              <>
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
                    colunas={colunasAba[abaAtiva]}
                    sortKey={chaveAtiva ? ordenacao[chaveAtiva].sort : "nome"}
                    sortDir={
                      chaveAtiva ? ordenacao[chaveAtiva].direction : "asc"
                    }
                    onSort={handleSort}
                  />
                )}

                {/* PAGINAÇÃO */}
                {!loading && chaveAtiva && dados[chaveAtiva].totalPages > 1 && (
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
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
