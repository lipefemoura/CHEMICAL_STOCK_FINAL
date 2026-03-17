// src/pages/DashboardAnalises/overlayTabelas/ListaAnalisesCompleta.js
import React, { useState, useEffect } from "react";
import { Paper, IconButton } from "@mui/material";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import AnaliseDetailOverlay from "../../components/analiseListaIcons/AnaliseDetailOverlay";
import AnaliseEditOverlay from "../../components/analiseListaIcons/AnaliseEditOverlay";
import AnaliseExcluirOverlay from "../../components/analiseListaIcons/AnaliseExcluirOverlay";
import OverlayFiltroAnalise from "./OverlayFiltroAnalise";
import axios from "axios";

const ListaAnalisesCompleta = ({ analises, onClose, onSave }) => {
  const [selectedAnalise, setSelectedAnalise] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAnalises, setFilteredAnalises] = useState(analises);
  const [showFiltroOverlay, setShowFiltroOverlay] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      axios
        .get("http://localhost:8080/analise")
        .then((res) => setFilteredAnalises(res.data))
        .catch((err) => console.error(err));
    } else {
      axios
        .get(
          `http://localhost:8080/analise/buscarAnalise?nome=${encodeURIComponent(
            searchTerm,
          )}`,
        )
        .then((res) => setFilteredAnalises(res.data))
        .catch((err) => console.error(err));
    }
  }, [searchTerm]);

  const handleConfirmDelete = async () => {
    const response = await fetch(
      `http://localhost:8080/analise/${selectedAnalise.id}`,
      { method: "DELETE" },
    );

    if (response.ok) {
      console.log("Análise excluída com sucesso");
    } else {
      console.error("Erro ao excluir análise");
    }

    setOpenDelete(false);
    setSelectedAnalise(null);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button
          onClick={onClose}
          style={{
            alignSelf: "flex-end",
            background: "transparent",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            color: "#444",
            marginBottom: "10px",
          }}
        >
          ✕
        </button>

        {/* Campo de busca e botões */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={() => console.log("Buscar clicado")}
            style={buttonStyle("#4CAF50")}
          >
            Buscar
          </button>
          <button
            onClick={() => setShowFiltroOverlay(true)}
            style={buttonStyle("#13529b")}
          >
            Filtrar
          </button>
        </div>

        {/* Tabela completa */}
        <Paper
          elevation={4}
          sx={{
            overflowX: "auto",
            borderRadius: "12px",
            width: "100%",
          }}
        >
          <table style={{ width: "100%" }}>
            <thead style={{ backgroundColor: "#4CAF50" }}>
              <tr>
                <th style={thStyle}>Nome</th>
                <th style={thStyle}>Matriz</th>
                <th style={thStyle}>Contrato</th>
                <th style={thStyle}>Data Cadastro</th>
                <th style={thStyle}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnalises.map((a) => (
                <tr
                  key={a.id}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f0f0f0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#fff")
                  }
                >
                  <td style={tdStyle}>{a.nomeAnalise}</td>
                  <td style={tdStyle}>{a.matrizNome}</td>
                  <td style={tdStyle}>{a.contratoNome}</td>
                  <td style={tdStyle}>{a.dataCadastro}</td>
                  <td style={tdStyle}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          setSelectedAnalise(a);
                          setOpenDetail(true);
                        }}
                      >
                        <FaEye style={{ color: "#666" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setSelectedAnalise(a);
                          setOpenEdit(true);
                        }}
                      >
                        <FaEdit style={{ color: "#4CAF50" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setSelectedAnalise(a);
                          setOpenDelete(true);
                        }}
                      >
                        <FaTrashAlt style={{ color: "#e74c3c" }} />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      </div>

      {/* Overlays */}
      {selectedAnalise && openDetail && (
        <AnaliseDetailOverlay
          open={openDetail}
          onClose={() => setOpenDetail(false)}
          analise={selectedAnalise}
        />
      )}
      {selectedAnalise && openEdit && (
        <AnaliseEditOverlay
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          analise={selectedAnalise}
          onSave={onSave}
        />
      )}
      {selectedAnalise && openDelete && (
        <AnaliseExcluirOverlay
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          onDelete={handleConfirmDelete}
          analise={selectedAnalise}
        />
      )}
      {showFiltroOverlay && (
        <OverlayFiltroAnalise
          open={showFiltroOverlay}
          onClose={() => setShowFiltroOverlay(false)}
        />
      )}
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1300,
};

const modalStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "20px",
  maxWidth: "90%",
  maxHeight: "90%",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
};

const thStyle = {
  color: "#fff",
  padding: "12px 24px",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "12px 24px",
};

const buttonStyle = (color) => ({
  backgroundColor: color,
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  cursor: "pointer",
});

export default ListaAnalisesCompleta;
