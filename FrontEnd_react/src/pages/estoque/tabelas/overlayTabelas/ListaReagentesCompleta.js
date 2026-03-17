import React, { useState, useEffect } from "react";
import { Paper, IconButton } from "@mui/material";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import ReagenteDetailOverlay from "../../../components/ReagenteListaIcons/ReagenteDetailOverlay";
import ReagenteEditOverlay from "../../../components/ReagenteListaIcons/ReagenteEditOverlay";
import ReagenteExcluirOverlay from "../../../components/ReagenteListaIcons/ReagenteExcluirOverlay";
import OverlayFiltroReagente from "../../../components/OverlayFiltroReagente";
import axios from "axios";

const ListaReagentesCompleta = ({ reagentes, onClose, onSave }) => {
  const [selectedReagente, setSelectedReagente] = useState(null);
  const [editOverlayOpen, setEditOverlayOpen] = useState(false);
  const [deleteOverlayOpen, setDeleteOverlayOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReagentes, setFilteredReagentes] = useState(reagentes);
  const [allReagentes, setAllReagentes] = useState([]);
  const [showFiltroOverlay, setShowFiltroOverlay] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      axios
        .get("http://localhost:8080/reagente")
        .then((res) => {
          setAllReagentes(res.data);
          setFilteredReagentes(res.data);
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .get(
          `http://localhost:8080/reagente/buscarReagente?nome=${encodeURIComponent(searchTerm)}`,
        )
        .then((res) => {
          setAllReagentes(res.data);
          setFilteredReagentes(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [searchTerm]);

  const handleApplyFilters = (filtros) => {
    console.log("Filtros aplicados:", filtros);
    setShowFiltroOverlay(false);
  };

  const handleClearFilters = () => {
    console.log("Filtros limpos");
  };

  const handleFiltroAplicado = async (filtros) => {
    const queryParams = new URLSearchParams();

    if (filtros.nome) queryParams.append("nome", filtros.nome);
    if (filtros.tipo) queryParams.append("tipo", filtros.tipo);
    if (filtros.dataInicio)
      queryParams.append("dataInicio", filtros.dataInicio);
    if (filtros.dataFim) queryParams.append("dataFim", filtros.dataFim);

    try {
      const response = await fetch(
        `http://localhost:8080/reagente/filtroReagente?${queryParams.toString()}`,
      );
      const data = await response.json();
      setFilteredReagentes(data);
    } catch (error) {
      console.error("Erro ao buscar reagentes filtrados:", error);
    }
  };

  const handleEdit = (reagente) => {
    setSelectedReagente(reagente);
    setEditOverlayOpen(true);
  };

  const handleView = (reagente) => {
    setSelectedReagente(reagente);
    setDetailOpen(true);
  };

  const handleDelete = (reagente) => {
    setSelectedReagente(reagente);
    setDeleteOverlayOpen(true);
  };

  const handleConfirmDelete = async () => {
    const response = await fetch(
      `http://localhost:8080/reagente/${selectedReagente.id}`,
      {
        method: "DELETE",
      },
    );

    if (response.ok) {
      console.log("Reagente excluído com sucesso");
    } else {
      console.error("Erro ao excluir reagente");
    }

    setDeleteOverlayOpen(false);
    setSelectedReagente(null);
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

        {/* Campo de busca e botões + tabela no mesmo container */}
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
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Buscar
          </button>
          <button
            onClick={() => setShowFiltroOverlay(true)}
            style={{
              backgroundColor: "#13529bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Filtrar
          </button>
        </div>

        {/* Tabela dentro do mesmo modal */}
        <Paper
          elevation={4}
          sx={{ overflowX: "auto", borderRadius: "12px", width: "100%" }}
        >
          <table style={{ width: "100%" }}>
            <thead style={{ backgroundColor: "#4CAF50" }}>
              <tr>
                <th style={thStyle}>Nome</th>
                <th style={thStyle}>Tipo</th>
                <th style={thStyle}>Validade</th>
                <th style={thStyle}>Quantidade Frascos</th>
                <th style={thStyle}>Lote</th>
                <th style={thStyle}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredReagentes.map((r) => (
                <tr
                  key={r.id}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f0f0f0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#fff")
                  }
                >
                  <td style={tdStyle}>{r.nome}</td>
                  <td style={tdStyle}>{r.tipo}</td>
                  <td style={tdStyle}>{r.dataValidade}</td>
                  <td style={tdStyle}>{r.quantidadeDeFrascos}</td>
                  <td style={tdStyle}>{r.lote}</td>
                  <td style={tdStyle}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <IconButton onClick={() => handleView(r)}>
                        <FaEye style={{ color: "#666" }} />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(r)}>
                        <FaEdit style={{ color: "#4CAF50" }} />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(r)}>
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
      {selectedReagente && detailOpen && (
        <ReagenteDetailOverlay
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          reagente={selectedReagente}
        />
      )}
      {selectedReagente && editOverlayOpen && (
        <ReagenteEditOverlay
          open={editOverlayOpen}
          onClose={() => setEditOverlayOpen(false)}
          reagente={selectedReagente}
          onSave={onSave}
        />
      )}
      {selectedReagente && deleteOverlayOpen && (
        <ReagenteExcluirOverlay
          open={deleteOverlayOpen}
          onClose={() => setDeleteOverlayOpen(false)}
          onDelete={handleConfirmDelete}
          reagente={selectedReagente}
        />
      )}
      {showFiltroOverlay && (
        <OverlayFiltroReagente
          open={showFiltroOverlay}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
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

export default ListaReagentesCompleta;
