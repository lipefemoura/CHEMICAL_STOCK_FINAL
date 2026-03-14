import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnalitoCadastro from "../cadastro/AnalitoCadastro";
import MatrizCadastro from "../cadastro/MatrizCadastro";
import SelectAnaliseDaAmostra from "./SelectAnaliseDaAmostra";
import { getUsuarioLogado } from "../../services/usuarioService";

import {
  ArrowForward as ArrowForwardIcon,
  Description as DescriptionIcon,
  ExpandLess,
  ExpandMore,
  Home as HomeIcon,
  Inventory as InventoryIcon,
  PersonAdd as PersonAddIcon,
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
  Typography,
} from "@mui/material";
import ReagenteCadastro from "../cadastro/ReagenteCadastro";

const SideBar = ({ drawerOpen, toggleDrawer }) => {
  const [openMatrizOverlay, setOpenMatrizOverlay] = useState(false);
  const [openAnalitoOverlay, setOpenAnalitoOverlay] = useState(false);
  const [openAmostraOverlay, setOpenAmostraOverlay] = useState(false);
  const [openReagenteOverlay, setOpenReagenteOverlay] = useState(false);

  const handleCloseAmostraOverlay = () => setOpenAmostraOverlay(false);
  const handleOpenAmostraOverlay = () => setOpenAmostraOverlay(true);
  const handleOpenMatrizOverlay = () => setOpenMatrizOverlay(true);
  const handleCloseMatrizOverlay = () => setOpenMatrizOverlay(false);
  const handleOpenAnalitoOverlay = () => setOpenAnalitoOverlay(true);
  const handleCloseAnalitoOverlay = () => setOpenAnalitoOverlay(false);
  const handleCloseReagenteOverlay = () => setOpenReagenteOverlay(false);
  const handleOpenReagenteOverlay = () => setOpenReagenteOverlay(true);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  const [openListas, setOpenListas] = useState(false);
  const [openCadastroItens, setOpenCadastroItens] = useState(false);
  const [selectedItem, setSelectedItem] = useState("/");

  const handleListasClick = () => setOpenListas(!openListas);
  const handleCadastroItensClick = () =>
    setOpenCadastroItens(!openCadastroItens);
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

  return (
    <>
      <Drawer
        sx={{
          width: 300,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 300,
            boxSizing: "border-box",
            backgroundColor: "#4CAF50",
            color: "white",
            mt: 8,
            height: "100vh",
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
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

          <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
            {usuario?.email || "usuario@exemplo.com"}
          </Typography>
        </Box>

        <List sx={{ position: "relative", height: "100%" }}>
          {/* HOME */}
          <ListItem
            button
            component={Link}
            to="/home"
            onClick={() => setSelectedItem("/home")}
            selected={selectedItem === "/home"}
            sx={{
              bgcolor: selectedItem === "/home" ? "#8BC34A" : "transparent",
              color: "white",
            }}
          >
            <ListItemIcon>
              <HomeIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          {/* ESTOQUE */}
          <ListItem
            button
            component={Link}
            to="/estoque"
            onClick={() => setSelectedItem("/estoque")}
            selected={selectedItem === "/estoque"}
            sx={{
              bgcolor: selectedItem === "/estoque" ? "#8BC34A" : "transparent",
              color: "white",
            }}
          >
            <ListItemIcon>
              <StorageIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Estoque" />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/inventario"
            onClick={() => setSelectedItem("/inventario")}
            selected={selectedItem === "/inventario"}
            sx={{
              bgcolor:
                selectedItem === "/inventario" ? "#8BC34A" : "transparent",
              color: "white",
            }}
          >
            <ListItemIcon>
              <InventoryIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Inventário" />
          </ListItem>

          {/* Ordem de serviço */}
          <ListItem
            button
            component={Link}
            to="/contratoLista"
            onClick={() => setSelectedItem("/contratoLista")}
            selected={selectedItem === "/contratoLista"}
            sx={{
              bgcolor:
                selectedItem === "/contratoLista" ? "#8BC34A" : "transparent",
              color: "white",
            }}
          >
            <ListItemIcon>
              <FolderCopyIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Ordem de Serviço" />
          </ListItem>

          {/* DASHBORAD ANALISES */}
          <ListItem
            button
            component={Link}
            to="/dashboardAnalises"
            onClick={() => setSelectedItem("/dashboardAnalises")}
            selected={selectedItem === "/dashboardAnalises"}
            sx={{
              bgcolor:
                selectedItem === "/dashboardAnalises"
                  ? "#8BC34A"
                  : "transparent",
              color: "white",
            }}
          >
            <ListItemIcon>
              <FolderCopyIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard de Análises" />
          </ListItem>

          {/* DASHBORAD ANALISES */}
          <ListItem
            button
            component={Link}
            to="/dashboardEquipamentos"
            onClick={() => setSelectedItem("/dashboardEquipamentos")}
            selected={selectedItem === "/dashboardEquipamentos"}
            sx={{
              bgcolor:
                selectedItem === "/dashboardEquipamentos"
                  ? "#8BC34A"
                  : "transparent",
              color: "white",
            }}
          >
            <ListItemIcon>
              <FolderCopyIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard de Equipamentos" />
          </ListItem>

          {/* LISTAS */}
          <ListItem button onClick={handleListasClick}>
            <ListItemIcon>
              <ListAltIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Listas" />
            {openListas ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openListas} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* Análises */}
              <ListItem
                button
                component={Link}
                to="/analiseLista"
                onClick={() => setSelectedItem("/analiseLista")}
                selected={selectedItem === "/analiseLista"}
                sx={{
                  pl: 4,
                  bgcolor:
                    selectedItem === "/analiseLista"
                      ? "#8BC34A"
                      : "transparent",
                  color: "white",
                }}
              >
                <ListItemIcon>
                  <AnalyticsIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Análises" />
              </ListItem>

              {/* Procedimentos */}
              <ListItem
                button
                component={Link}
                to="/procedimentoLista"
                onClick={() => setSelectedItem("/procedimentoLista")}
                selected={selectedItem === "/procedimentoLista"}
                sx={{
                  pl: 4,
                  bgcolor:
                    selectedItem === "/procedimentoLista"
                      ? "#8BC34A"
                      : "transparent",
                  color: "white",
                }}
              >
                <ListItemIcon>
                  <AssignmentIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Procedimentos" />
              </ListItem>

              {/* Contratos */}
              <ListItem
                button
                component={Link}
                to="/contratoLista"
                onClick={() => setSelectedItem("/contratoLista")}
                selected={selectedItem === "/contratoLista"}
                sx={{
                  pl: 4,
                  bgcolor:
                    selectedItem === "/contratoLista"
                      ? "#8BC34A"
                      : "transparent",
                  color: "white",
                }}
              >
                <ListItemIcon>
                  <FolderCopyIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Contratos" />
              </ListItem>

              {/* Matrizes */}
              <ListItem
                button
                component={Link}
                to="/matrizLista"
                onClick={() => setSelectedItem("/matrizLista")}
                selected={selectedItem === "/matrizLista"}
                sx={{
                  pl: 4,
                  bgcolor:
                    selectedItem === "/matrizLista" ? "#8BC34A" : "transparent",
                  color: "white",
                }}
              >
                <ListItemIcon>
                  <CategoryIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Matrizes" />
              </ListItem>

              {/* Clientes */}
              <ListItem
                button
                component={Link}
                to="/clientesLista"
                onClick={() => setSelectedItem("/clientesLista")}
                selected={selectedItem === "/clientesLista"}
                sx={{
                  pl: 4,
                  bgcolor:
                    selectedItem === "/clientesLista"
                      ? "#8BC34A"
                      : "transparent",
                  color: "white",
                }}
              >
                <ListItemIcon>
                  <PeopleIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Clientes" />
              </ListItem>

              {/* Amostras */}
              <ListItem
                button
                component={Link}
                to="/amostraLista"
                onClick={() => setSelectedItem("/amostraLista")}
                selected={selectedItem === "/amostraLista"}
                sx={{
                  pl: 4,
                  bgcolor:
                    selectedItem === "/amostraLista"
                      ? "#8BC34A"
                      : "transparent",
                  color: "white",
                }}
              >
                <ListItemIcon>
                  <BiotechIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Amostras" />
              </ListItem>
            </List>
          </Collapse>

          {/* CADASTRO DE ITENS */}
          <ListItem button onClick={handleCadastroItensClick}>
            <ListItemIcon>
              <InventoryIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Cadastro de Itens" />
            {openCadastroItens ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openCadastroItens} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* Análises */}
              <ListItem
                button
                component={Link}
                to="/analiseCadastro"
                onClick={() => setSelectedItem("/analiseCadastro")}
                selected={selectedItem === "/analiseCadastro"}
                sx={{
                  pl: 4,
                  bgcolor:
                    selectedItem === "/analiseCadastro"
                      ? "#8BC34A"
                      : "transparent",
                  color: "white",
                }}
              >
                <ListItemIcon>
                  <AnalyticsIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Análises" />
              </ListItem>

              {/* Amostras */}
              <ListItem
                button
                onClick={handleOpenAmostraOverlay}
                selected={selectedItem === "/amostraCadastro"}
                sx={{
                  pl: 4,
                  bgcolor:
                    selectedItem === "/amostraCadastro"
                      ? "#8BC34A"
                      : "transparent",
                  color: "white",
                }}
              >
                <ListItemIcon>
                  <BiotechIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Amostras" />
              </ListItem>

              <SelectAnaliseDaAmostra
                open={openAmostraOverlay}
                handleClose={handleCloseAmostraOverlay}
              />

              {/* Matriz */}
              <ListItem
                button
                onClick={handleOpenMatrizOverlay}
                sx={{
                  pl: 4,
                  bgcolor:
                    selectedItem === "/matrizCadastro"
                      ? "#8BC34A"
                      : "transparent",
                  color: "white",
                }}
              >
                <ListItemIcon>
                  <CategoryIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Matriz" />
              </ListItem>

              <MatrizCadastro
                open={openMatrizOverlay}
                handleClose={handleCloseMatrizOverlay}
              />

              {/* Equipamentos */}
              <ListItem
                button
                component={Link}
                to="/equipamentoCadastro"
                onClick={() => setSelectedItem("/equipamentoCadastro")}
                selected={selectedItem === "/equipamentoCadastro"}
                sx={{
                  pl: 4,
                  bgcolor:
                    selectedItem === "/equipamentoCadastro"
                      ? "#8BC34A"
                      : "transparent",
                  color: "white",
                }}
              >
                <ListItemIcon>
                  <AnalyticsIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Equipamentos" />
              </ListItem>

              {/* Resíduos */}
              <ListItem
                button
                component={Link}
                to="/residuoCadastro"
                onClick={() => setSelectedItem("/residuoCadastro")}
                selected={selectedItem === "/residuoCadastro"}
                sx={{
                  pl: 4,
                  bgcolor:
                    selectedItem === "/residuoCadastro"
                      ? "#8BC34A"
                      : "transparent",
                  color: "white",
                }}
              >
                <ListItemIcon>
                  <AnalyticsIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Resíduos" />
              </ListItem>

              {/* Reagentes */}
              <ListItem
                button
                component={Link}
                to="/reagenteCadastro"
                onClick={() => setSelectedItem("/reagenteCadastro")}
                selected={selectedItem === "/reagenteCadastro"}
                sx={{
                  pl: 4,
                  bgcolor:
                    selectedItem === "/reagenteCadastro"
                      ? "#8BC34A"
                      : "transparent",
                  color: "white",
                }}
              >
                <ListItemIcon>
                  <ScienceIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Reagentes" />
              </ListItem>

              {/* Analito */}
              <ListItem
                button
                onClick={handleOpenAnalitoOverlay}
                sx={{
                  pl: 4,
                  bgcolor:
                    selectedItem === "/analitoCadastro"
                      ? "#8BC34A"
                      : "transparent",
                  color: "white",
                }}
              >
                <ListItemIcon>
                  <ScienceIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Analito" />
              </ListItem>

              <AnalitoCadastro
                open={openAnalitoOverlay}
                handleClose={handleCloseAnalitoOverlay}
              />

              {/* Clientes */}
              <ListItem
                button
                component={Link}
                to="/clienteCadastro"
                onClick={() => setSelectedItem("/clienteCadastro")}
                selected={selectedItem === "/clienteCadastro"}
                sx={{
                  pl: 4,
                  bgcolor:
                    selectedItem === "/clienteCadastro"
                      ? "#8BC34A"
                      : "transparent",
                  color: "white",
                }}
              >
                <ListItemIcon>
                  <PeopleIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Clientes" />
              </ListItem>

              {/* Procedimentos */}
              <ListItem
                button
                component={Link}
                to="/procedimentoCadastro"
                onClick={() => setSelectedItem("/procedimentoCadastro")}
                selected={selectedItem === "/procedimentoCadastro"}
                sx={{
                  pl: 4,
                  bgcolor:
                    selectedItem === "/procedimentoCadastro"
                      ? "#8BC34A"
                      : "transparent",
                  color: "white",
                }}
              >
                <ListItemIcon>
                  <AssignmentIcon sx={{ color: "white" }} />
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
            selected={selectedItem === "/perfil"}
            sx={{
              bgcolor: selectedItem === "/perfil" ? "#8BC34A" : "transparent",
              color: "white",
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItem>

          {/* LOGOUT — ÍCONE NO CANTO INFERIOR */}
          <ListItem
            button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/loginPage");
            }}
            sx={{
              position: "absolute",
              bottom: 10,
              left: 10,
              width: "auto",
              color: "white",
              padding: 0,
              minWidth: 0,
            }}
          >
            <LogoutIcon sx={{ color: "white", fontSize: 28 }} />
          </ListItem>
        </List>
      </Drawer>

      {/* Ícones compactos (sidebar recolhida) */}
      {!drawerOpen && (
        <Box
          sx={{
            position: "fixed",
            left: 0,
            top: 0,
            height: "100vh",
            width: 60,
            backgroundColor: "#4CAF50",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 1,
            boxShadow: 2,
            paddingTop: "70px",
          }}
        >
          <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
            <ArrowForwardIcon />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <HomeIcon />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <ListAltIcon />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <InventoryIcon />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default SideBar;