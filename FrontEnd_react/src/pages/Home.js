import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useNavigate, Link } from "react-router-dom";
import SideBar from "./components/SideBar.js";
import Dashboard from "./components/MenuComponents/Dashboard.js";
import AmostraCardContainer from "./components/MenuComponents/AmostraCardContainer.js";
import CardReabastecimentoEstoque from "./components/MenuComponents/CardReabastecimentoEstoque.js";
import ListaMovimentacoes from "./components/MenuComponents/ListaMovimentacoes.js";
import LineChartDashboard from "./components/MenuComponents/LineChartDashboard.js";

// Dados mock (mantidos do original)
const amostras = [
  {
    dataVencimento: "2024-08-10",
    nome: "Amostra 1",
    diasParaVencer: 5,
    endereco: "Laboratório A",
  },
  {
    dataVencimento: "2024-08-12",
    nome: "Amostra 2",
    diasParaVencer: 7,
    endereco: "Laboratório B",
  },
  {
    dataVencimento: "2024-08-15",
    nome: "Amostra 3",
    diasParaVencer: 10,
    endereco: "Laboratório C",
  },
  {
    dataVencimento: "2024-08-18",
    nome: "Amostra 4",
    diasParaVencer: 13,
    endereco: "Laboratório D",
  },
];

const reagentes = [
  { nome: "Ácido Sulfúrico", quantidade: 5, limite: 10 },
  { nome: "Hidróxido de Sódio", quantidade: 3, limite: 5 },
  { nome: "Água Destilada", quantidade: 15, limite: 10 },
];

// Componente para a barra de botões
const ButtonBar = ({ navigate }) => {
  const [loading, setLoading] = useState({
    analiseLista: false,
    cadastrarProcesso: false,
    cadastrarReagente: false,
    cadastrarAnalise: false,
    cadastrarAmostra: false,
  });

  const handleNavigate = (path, key) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      navigate(path);
      setLoading((prev) => ({ ...prev, [key]: false }));
    }, 500);
  };

  return (
    <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
      {[
        {
          icon: <ListAltIcon sx={{ fontSize: "32px" }} />,
          label: "Lista de Análises",
          path: "/analiseLista",
          key: "analiseLista",
        },
        {
          icon: <AddCircleIcon sx={{ fontSize: "32px" }} />,
          label: "Cadastrar Reagente",
          path: "/ReagenteCadastro",
          key: "cadastrarReagente",
        },
        {
          icon: <AssessmentIcon sx={{ fontSize: "32px" }} />,
          label: "Cadastrar Análise",
          path: "/analiseCadastro",
          key: "cadastrarAnalise",
        },
        {
          icon: <EmojiNatureIcon sx={{ fontSize: "32px" }} />,
          label: "Cadastrar Amostra",
          path: "/amostraCadastro",
          key: "cadastrarAmostra",
        },
        {
          icon: <LocalHospitalIcon sx={{ fontSize: "32px" }} />,
          label: "Cadastrar Processo",
          path: "/cadastrarProcesso",
          key: "cadastrarProcesso",
          bgcolor: "#1976D2",
        },
      ].map((btn) => (
        <Grid item xs={6} sm={4} md={2.4} key={btn.key}>
          <Button
            variant="contained"
            startIcon={
              loading[btn.key] ? <CircularProgress size={20} /> : btn.icon
            }
            disabled={loading[btn.key]}
            sx={{
              borderRadius: "16px",
              bgcolor: btn.bgcolor || "#4CAF50",
              height: "48px",
              fontWeight: "600",
              fontSize: "14px",
              boxShadow: 2,
              transition: "box-shadow 0.3s ease, transform 0.3s ease",
              "&:hover": { boxShadow: 4, transform: "scale(1.03)" },
              width: "100%",
              textTransform: "none",
            }}
            component={Link}
            to={btn.path}
            onClick={() => handleNavigate(btn.path, btn.key)}
            aria-label={btn.label}
          >
            {btn.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

// Componente para a seção de visão geral
const OverviewSection = ({ amostras }) => (
  <Grid container spacing={3} sx={{ mb: 4 }}>
    <Grid item xs={12} md={8}>
      <Dashboard />
    </Grid>
    <Grid item xs={12} md={4}>
      <AmostraCardContainer amostras={amostras} />
    </Grid>
  </Grid>
);

// Componente para a seção de tendências
const TrendsSection = () => (
  <Box sx={{ mb: 4 }}>
    <LineChartDashboard />
  </Box>
);

// Componente para a seção de estoque e movimentações
const StockSection = ({ reagentes }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <CardReabastecimentoEstoque reagentes={reagentes} />
      <Box sx={{ mt: 2, textAlign: "center" }}></Box>
    </Grid>
    <Grid item xs={12} md={6}>
      <ListaMovimentacoes />
    </Grid>
  </Grid>
);

function Menu() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ bgcolor: "#4CAF50", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            aria-label="Abrir menu lateral"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "left",
              fontWeight: 600,
              fontSize: "1.25rem",
            }}
          >
            Menu Inicial
          </Typography>
        </Toolbar>
      </AppBar>

      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          mt: 8,
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.5rem", sm: "2rem" },
            mb: 3,
          }}
        >
          Painel de Controle
        </Typography>

        <ButtonBar navigate={navigate} />
        <OverviewSection amostras={amostras} />
        <TrendsSection />
        <StockSection reagentes={reagentes} />
      </Box>
    </Box>
  );
}

export default Menu;
