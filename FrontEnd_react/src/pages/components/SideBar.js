import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnalitoCadastro from "../cadastro/AnalitoCadastro";
import MatrizCadastro from "../cadastro/MatrizCadastro";
import SelectAnaliseDaAmostra from "./SelectAnaliseDaAmostra";
import { getUsuarioLogado } from "../../services/usuarioService";

import {
  ExpandLess,
  ExpandMore,
  Home as HomeIcon,
  Inventory as InventoryIcon,
  Science as ScienceIcon,
  Assignment as AssignmentIcon,
  ListAlt as ListAltIcon,
  AccountCircle as AccountCircleIcon,
  Analytics as AnalyticsIcon,
  Storage as StorageIcon,
  People as PeopleIcon,
  Biotech as BiotechIcon,
  Category as CategoryIcon,
  FolderCopy as FolderCopyIcon,
  Dashboard as DashboardIcon,
  Build as BuildIcon,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Avatar,
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import AnalitoCadastro2 from "../cadastro/AnalitoCadastro";
import ReagenteCadastro from "../cadastro/ReagenteCadastro";

const DRAWER_WIDTH = 300;
const MINI_WIDTH = 60;

const SideBar = ({ drawerOpen, toggleDrawer }) => {
  const [openMatrizOverlay, setOpenMatrizOverlay] = useState(false);
  const [openAnalitoOverlay, setOpenAnalitoOverlay] = useState(false);
  const [openAmostraOverlay, setOpenAmostraOverlay] = useState(false);
  const [openListas, setOpenListas] = useState(false);
  const [openCadastroItens, setOpenCadastroItens] = useState(false);
  const [selectedItem, setSelectedItem] = useState("/");
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const data = await getUsuarioLogado();
        setUsuario(data);
      } catch (error) {
        console.error("Erro ao carregar usuário logado:", error);
      }
    }
    carregarUsuario();
  }, []);

  // Estilos de item do menu
  const itemSx = (path) => ({
    bgcolor: selectedItem === path ? "#8BC34A" : "transparent",
    color: "white",
    borderRadius: 1,
    mx: 0.5,
    "&:hover": { bgcolor: "#66BB6A" },
  });

  const subItemSx = (path) => ({
    ...itemSx(path),
    pl: 4,
  });

  const iconSx = { color: "white" };

  return (
    <>
      {/* =====================
          OVERLAY — fecha ao clicar fora
      ===================== */}
      {drawerOpen && (
        <Box
          onClick={toggleDrawer}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 1049,
            bgcolor: "transparent",
          }}
        />
      )}

      {/* =====================
          DRAWER EXPANDIDO
      ===================== */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            backgroundColor: "#4CAF50",
            color: "white",
            mt: "64px",
            height: "calc(100vh - 64px)",
            zIndex: 1050,
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Perfil do usuário */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 2,
          }}
        >
          <Avatar
            src={
              usuario?.fotoPerfil
                ? `data:image/jpeg;base64,${usuario.fotoPerfil}`
                : null
            }
            sx={{ width: 56, height: 56 }}
          >
            {!usuario?.fotoPerfil &&
              (usuario?.nome?.charAt(0).toUpperCase() || "U")}
          </Avatar>
          <Typography variant="h6" sx={{ mt: 1 }}>
            {usuario?.nome || "Usuário"}
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            {usuario?.email || ""}
          </Typography>
        </Box>

        <List sx={{ flex: 1, overflowY: "auto", overflowX: "hidden", pb: 1 }}>
          {/* HOME */}
          <ListItem
            button
            component={Link}
            to="/home"
            onClick={() => setSelectedItem("/home")}
            sx={itemSx("/home")}
          >
            <ListItemIcon>
              <HomeIcon sx={iconSx} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          {/* ESTOQUE */}
          <ListItem
            button
            component={Link}
            to="/estoque"
            onClick={() => setSelectedItem("/estoque")}
            sx={itemSx("/estoque")}
          >
            <ListItemIcon>
              <StorageIcon sx={iconSx} />
            </ListItemIcon>
            <ListItemText primary="Estoque" />
          </ListItem>

          {/* INVENTÁRIO */}
          <ListItem
            button
            component={Link}
            to="/inventario"
            onClick={() => setSelectedItem("/inventario")}
            sx={itemSx("/inventario")}
          >
            <ListItemIcon>
              <InventoryIcon sx={iconSx} />
            </ListItemIcon>
            <ListItemText primary="Inventário" />
          </ListItem>

          {/* ORDEM DE SERVIÇO */}
          <ListItem
            button
            component={Link}
            to="/contratoLista"
            onClick={() => setSelectedItem("/contratoLista")}
            sx={itemSx("/contratoLista")}
          >
            <ListItemIcon>
              <FolderCopyIcon sx={iconSx} />
            </ListItemIcon>
            <ListItemText primary="Ordem de Serviço" />
          </ListItem>

          {/* DASHBOARD ANÁLISES */}
          <ListItem
            button
            component={Link}
            to="/dashboardAnalises"
            onClick={() => setSelectedItem("/dashboardAnalises")}
            sx={itemSx("/dashboardAnalises")}
          >
            <ListItemIcon>
              <DashboardIcon sx={iconSx} />
            </ListItemIcon>
            <ListItemText primary="Dashboard Análises" />
          </ListItem>

          {/* DASHBOARD EQUIPAMENTOS */}
          <ListItem
            button
            component={Link}
            to="/dashboardEquipamentos"
            onClick={() => setSelectedItem("/dashboardEquipamentos")}
            sx={itemSx("/dashboardEquipamentos")}
          >
            <ListItemIcon>
              <BuildIcon sx={iconSx} />
            </ListItemIcon>
            <ListItemText primary="Dashboard Equipamentos" />
          </ListItem>

          {/* LISTAS */}
          <ListItem
            button
            onClick={() => setOpenListas(!openListas)}
            sx={itemSx("")}
          >
            <ListItemIcon>
              <ListAltIcon sx={iconSx} />
            </ListItemIcon>
            <ListItemText primary="Listas" />
            {openListas ? (
              <ExpandLess sx={iconSx} />
            ) : (
              <ExpandMore sx={iconSx} />
            )}
          </ListItem>
          <Collapse in={openListas} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/analiseLista"
                onClick={() => setSelectedItem("/analiseLista")}
                sx={subItemSx("/analiseLista")}
              >
                <ListItemIcon>
                  <AnalyticsIcon sx={iconSx} />
                </ListItemIcon>
                <ListItemText primary="Análises" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/procedimentoLista"
                onClick={() => setSelectedItem("/procedimentoLista")}
                sx={subItemSx("/procedimentoLista")}
              >
                <ListItemIcon>
                  <AssignmentIcon sx={iconSx} />
                </ListItemIcon>
                <ListItemText primary="Procedimentos" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/contratoLista"
                onClick={() => setSelectedItem("/contratoLista")}
                sx={subItemSx("/contratoLista")}
              >
                <ListItemIcon>
                  <FolderCopyIcon sx={iconSx} />
                </ListItemIcon>
                <ListItemText primary="Contratos" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/matrizLista"
                onClick={() => setSelectedItem("/matrizLista")}
                sx={subItemSx("/matrizLista")}
              >
                <ListItemIcon>
                  <CategoryIcon sx={iconSx} />
                </ListItemIcon>
                <ListItemText primary="Matrizes" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/clientesLista"
                onClick={() => setSelectedItem("/clientesLista")}
                sx={subItemSx("/clientesLista")}
              >
                <ListItemIcon>
                  <PeopleIcon sx={iconSx} />
                </ListItemIcon>
                <ListItemText primary="Clientes" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/amostraLista"
                onClick={() => setSelectedItem("/amostraLista")}
                sx={subItemSx("/amostraLista")}
              >
                <ListItemIcon>
                  <BiotechIcon sx={iconSx} />
                </ListItemIcon>
                <ListItemText primary="Amostras" />
              </ListItem>
            </List>
          </Collapse>

          {/* CADASTRO DE ITENS */}
          <ListItem
            button
            onClick={() => setOpenCadastroItens(!openCadastroItens)}
            sx={itemSx("")}
          >
            <ListItemIcon>
              <InventoryIcon sx={iconSx} />
            </ListItemIcon>
            <ListItemText primary="Cadastro de Itens" />
            {openCadastroItens ? (
              <ExpandLess sx={iconSx} />
            ) : (
              <ExpandMore sx={iconSx} />
            )}
          </ListItem>
          <Collapse in={openCadastroItens} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/analiseCadastro"
                onClick={() => setSelectedItem("/analiseCadastro")}
                sx={subItemSx("/analiseCadastro")}
              >
                <ListItemIcon>
                  <AnalyticsIcon sx={iconSx} />
                </ListItemIcon>
                <ListItemText primary="Análises" />
              </ListItem>
              <ListItem
                button
                onClick={() => setOpenAmostraOverlay(true)}
                sx={subItemSx("/amostraCadastro")}
              >
                <ListItemIcon>
                  <BiotechIcon sx={iconSx} />
                </ListItemIcon>
                <ListItemText primary="Amostras" />
              </ListItem>
              <SelectAnaliseDaAmostra
                open={openAmostraOverlay}
                handleClose={() => setOpenAmostraOverlay(false)}
              />
              <ListItem
                button
                onClick={() => setOpenMatrizOverlay(true)}
                sx={subItemSx("/matrizCadastro")}
              >
                <ListItemIcon>
                  <CategoryIcon sx={iconSx} />
                </ListItemIcon>
                <ListItemText primary="Matriz" />
              </ListItem>
              <MatrizCadastro
                open={openMatrizOverlay}
                handleClose={() => setOpenMatrizOverlay(false)}
              />
              <ListItem
                button
                component={Link}
                to="/equipamentoCadastro"
                onClick={() => setSelectedItem("/equipamentoCadastro")}
                sx={subItemSx("/equipamentoCadastro")}
              >
                <ListItemIcon>
                  <BuildIcon sx={iconSx} />
                </ListItemIcon>
                <ListItemText primary="Equipamentos" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/residuoCadastro"
                onClick={() => setSelectedItem("/residuoCadastro")}
                sx={subItemSx("/residuoCadastro")}
              >
                <ListItemIcon>
                  <AnalyticsIcon sx={iconSx} />
                </ListItemIcon>
                <ListItemText primary="Resíduos" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/reagenteCadastro"
                onClick={() => setSelectedItem("/reagenteCadastro")}
                sx={subItemSx("/reagenteCadastro")}
              >
                <ListItemIcon>
                  <ScienceIcon sx={iconSx} />
                </ListItemIcon>
                <ListItemText primary="Reagentes" />
              </ListItem>
              <ListItem
                button
                onClick={() => setOpenAnalitoOverlay(true)}
                sx={subItemSx("/analitoCadastro")}
              >
                <ListItemIcon>
                  <ScienceIcon sx={iconSx} />
                </ListItemIcon>
                <ListItemText primary="Analito" />
              </ListItem>
              <AnalitoCadastro
                open={openAnalitoOverlay}
                handleClose={() => setOpenAnalitoOverlay(false)}
              />
              <ListItem
                button
                component={Link}
                to="/clienteCadastro"
                onClick={() => setSelectedItem("/clienteCadastro")}
                sx={subItemSx("/clienteCadastro")}
              >
                <ListItemIcon>
                  <PeopleIcon sx={iconSx} />
                </ListItemIcon>
                <ListItemText primary="Clientes" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/procedimentoCadastro"
                onClick={() => setSelectedItem("/procedimentoCadastro")}
                sx={subItemSx("/procedimentoCadastro")}
              >
                <ListItemIcon>
                  <AssignmentIcon sx={iconSx} />
                </ListItemIcon>
                <ListItemText primary="Procedimentos" />
              </ListItem>
            </List>
          </Collapse>

          {/* PERFIL */}
          <ListItem
            button
            component={Link}
            to="/perfil"
            onClick={() => setSelectedItem("/perfil")}
            sx={itemSx("/perfil")}
          >
            <ListItemIcon>
              <AccountCircleIcon sx={iconSx} />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItem>
        </List>

        {/* LOGOUT fixo no rodapé */}
        <Box sx={{ flexShrink: 0, width: "100%", bgcolor: "#388E3C", py: 0.5 }}>
          <ListItem
            button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/loginPage");
            }}
            sx={{ color: "white", "&:hover": { bgcolor: "#2E7D32" } }}
          >
            <ListItemIcon>
              <LogoutIcon sx={iconSx} />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItem>
        </Box>
      </Drawer>

      {/* =====================
          MINI SIDEBAR — recolhida
      ===================== */}
      {!drawerOpen && (
        <Box
          sx={{
            position: "fixed",
            left: 0,
            top: "64px",
            height: "calc(100vh - 64px)",
            width: MINI_WIDTH,
            backgroundColor: "#4CAF50",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 2,
            zIndex: 1050,
            pt: 1,
            pb: 1,
          }}
        >
          <Tooltip title="Home" placement="right">
            <IconButton sx={iconSx} onClick={() => navigate("/home")}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Estoque" placement="right">
            <IconButton sx={iconSx} onClick={() => navigate("/estoque")}>
              <StorageIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Inventário" placement="right">
            <IconButton sx={iconSx} onClick={() => navigate("/inventario")}>
              <InventoryIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Ordem de Serviço" placement="right">
            <IconButton sx={iconSx} onClick={() => navigate("/contratoLista")}>
              <FolderCopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Dashboard Análises" placement="right">
            <IconButton
              sx={iconSx}
              onClick={() => navigate("/dashboardAnalises")}
            >
              <DashboardIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Dashboard Equipamentos" placement="right">
            <IconButton
              sx={iconSx}
              onClick={() => navigate("/dashboardEquipamentos")}
            >
              <BuildIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Listas" placement="right">
            <IconButton sx={iconSx} onClick={toggleDrawer}>
              <ListAltIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cadastro de Itens" placement="right">
            <IconButton sx={iconSx} onClick={toggleDrawer}>
              <InventoryIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Perfil" placement="right">
            <IconButton sx={iconSx} onClick={() => navigate("/perfil")}>
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>

          {/* Logout no rodapé */}
          <Box sx={{ position: "absolute", bottom: 8 }}>
            <Tooltip title="Sair" placement="right">
              <IconButton
                sx={iconSx}
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/loginPage");
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SideBar;
