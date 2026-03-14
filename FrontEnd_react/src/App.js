import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";

import Home from "./pages/Home";
import LoginPage from "./pages/Login/LoginPage";
import AprovarUsuarios from "./pages/Login/AprovarUsuarios";

import AnaliseLista from "./pages/lista/AnaliseLista";
import ContratoLista from "./pages/lista/ContratoLista";
import ProcedimentoLista from "./pages/lista/ProcedimentoLista";
import ClienteLista from "./pages/lista/ClienteLista";
import MatrizLista from "./pages/lista/MatrizLista";
import AnalitoLista from "./pages/lista/AnalitoLista";
import AmostraLista from "./pages/lista/AmostraLista";
import EquipamentoLista from "./pages/lista/EquipamentoLista";
import ResiduoLista from "./pages/lista/ReiduoLista";

import AnaliseCadastro from "./pages/cadastro/AnaliseCadastro";
import ContratoCadastro from "./pages/cadastro/ContratoCadastro";
import ProcedimentoCadastro from "./pages/cadastro/ProcedimentoCadastro";
import MatrizCadastro from "./pages/cadastro/MatrizCadastro";
import AnalitoCadastro from "./pages/cadastro/AnalitoCadastro";
import ClienteCadastro from "./pages/cadastro/ClienteCadastro";
import ContAnaliseCadastro from "./pages/cadastro/ContAnaliseCadastro";
import AmostraCadastro from "./pages/cadastro/AmostraCadastro";
import ReagenteCadastro from "./pages/cadastro/ReagenteCadastro";
import AnalitoExistenteCadastro from "./pages/cadastro/AnalitoExistenteCadastro";
import CadastrarProcesso from "./pages/cadastro/CadastrarProcesso";
import ResiduoCadastro from "./pages/cadastro/ResiduoCadastro";

import Estoque from "./pages/estoque/Estoque";
import DashboardEquipamentos from "./pages/DashboardEquipamentos/DashboardEquipamentos";

import SelectAnaliseDaAmostra from "./pages/components/SelectAnaliseDaAmostra";
import ReposicaoReagentOverlay from "./pages/components/ReposicaoReagentOverlay";
import ListaReagenteCompleta from "./pages/estoque/tabelas/overlayTabelas/ListaReagentesCompleta";

import AlertasPanel from "./pages/DashboardAnalises/components/AlertasPanel";
import DashboardAnalises from "./pages/DashboardAnalises/DashboardAnalises";
import GraficoEquipamentos from "./pages/DashboardAnalises/components/GraficoEquipamentos";
import IndicadoresCards from "./pages/DashboardAnalises/components/IndicadoresCards";
import GraficoProcedimentos from "./pages/DashboardAnalises/components/GraficoProcedimentos";
import GraficoStatusAmostras from "./pages/DashboardAnalises/components/GraficoStatusAmostras";
import TabelaAnalises from "./pages/DashboardAnalises/components/TabelaAnalises";

import EquipamentoCadastro from "./pages/cadastro/EquipamentoCadastro";

import Perfil from "./pages/perfil/Perfil";

import ReservaPublicPage from "./pages/Login/ReservaPublicPage";
import AprovacaoReservaPage from "./pages/Login/AprovarReservaLab";

import Inventario from "./pages/inventario/Inventario";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/aprovar-usuario/:id" element={<AprovarUsuarios />} />
        <Route
          path="/reserva-laboratorio/:id"
          element={<AprovacaoReservaPage />}
        />

        <Route path="/reservaPublicPage" element={<ReservaPublicPage />} />

        <Route path="/ReagenteCadastro" element={<ReagenteCadastro />} />

        <Route path="/alertasPanel" element={<AlertasPanel />} />
        <Route path="/dashboardAnalises" element={<DashboardAnalises />} />
        <Route path="/graficoEquipamentos" element={<GraficoEquipamentos />} />
        <Route path="/indicadoresCards" element={<IndicadoresCards />} />
        <Route
          path="/graficoProcedimentos"
          element={<GraficoProcedimentos />}
        />
        <Route
          path="/graficoStatusAmostras"
          element={<GraficoStatusAmostras />}
        />
        <Route path="/tabelaAnalises" element={<TabelaAnalises />} />

        {/* Rotas protegidas */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboardEquipamentos"
          element={
            <PrivateRoute>
              <DashboardEquipamentos />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/residuoCadastro"
          element={
            <PrivateRoute>
              <ResiduoCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/residuoLista"
          element={
            <PrivateRoute>
              <ResiduoLista />
            </PrivateRoute>
          }
        />
        <Route
          path="/equipamentoCadastro"
          element={
            <PrivateRoute>
              <EquipamentoCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/equipamentoLista"
          element={
            <PrivateRoute>
              <EquipamentoLista />
            </PrivateRoute>
          }
        />

        <Route
          path="/estoque"
          element={
            <PrivateRoute>
              <Estoque />
            </PrivateRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />

        <Route
          path="/analiseLista"
          element={
            <PrivateRoute>
              <AnaliseLista />
            </PrivateRoute>
          }
        />

        <Route
          path="/contratoLista"
          element={
            <PrivateRoute>
              <ContratoLista />
            </PrivateRoute>
          }
        />

        <Route
          path="/procedimentoLista"
          element={
            <PrivateRoute>
              <ProcedimentoLista />
            </PrivateRoute>
          }
        />

        <Route
          path="/clientesLista"
          element={
            <PrivateRoute>
              <ClienteLista />
            </PrivateRoute>
          }
        />

        <Route
          path="/matrizLista"
          element={
            <PrivateRoute>
              <MatrizLista />
            </PrivateRoute>
          }
        />

        <Route
          path="/analitoLista"
          element={
            <PrivateRoute>
              <AnalitoLista />
            </PrivateRoute>
          }
        />

        <Route
          path="/amostraLista"
          element={
            <PrivateRoute>
              <AmostraLista />
            </PrivateRoute>
          }
        />

        <Route
          path="/analiseCadastro"
          element={
            <PrivateRoute>
              <AnaliseCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/contratoCadastro"
          element={
            <PrivateRoute>
              <ContratoCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/procedimentoCadastro"
          element={
            <PrivateRoute>
              <ProcedimentoCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/clienteCadastro"
          element={
            <PrivateRoute>
              <ClienteCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/matrizCadastro"
          element={
            <PrivateRoute>
              <MatrizCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/analitoCadastro"
          element={
            <PrivateRoute>
              <AnalitoCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/contrato-cadastrar-analises"
          element={
            <PrivateRoute>
              <ContAnaliseCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/amostraCadastro"
          element={
            <PrivateRoute>
              <AmostraCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/analitoExistenteCadastro"
          element={
            <PrivateRoute>
              <AnalitoExistenteCadastro />
            </PrivateRoute>
          }
        />

        <Route
          path="/cadastrarProcesso"
          element={
            <PrivateRoute>
              <CadastrarProcesso />
            </PrivateRoute>
          }
        />

        <Route
          path="/analiseAmostra"
          element={
            <PrivateRoute>
              <SelectAnaliseDaAmostra />
            </PrivateRoute>
          }
        />

        <Route
          path="/reposicaoReagente"
          element={
            <PrivateRoute>
              <ReposicaoReagentOverlay />
            </PrivateRoute>
          }
        />

        <Route
          path="/listaReagentesCompleta"
          element={
            <PrivateRoute>
              <ListaReagenteCompleta />
            </PrivateRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />

        <Route
          path="/inventario"
          element={
            <PrivateRoute>
              <Inventario />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
