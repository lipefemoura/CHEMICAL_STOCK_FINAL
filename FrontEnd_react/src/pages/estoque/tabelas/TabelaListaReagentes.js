import React, { useState } from "react";
import {
  Paper,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Button,
  Collapse,
} from "@mui/material";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ReagenteDetailOverlay from "../../components/ReagenteListaIcons/ReagenteDetailOverlay";
import ReagenteEditOverlay from "../../components/ReagenteListaIcons/ReagenteEditOverlay";
import ReagenteExcluirOverlay from "../../components/ReagenteListaIcons/ReagenteExcluirOverlay";

const TabelaListaReagentes = ({ reagentes, onSave }) => {
  const [selectedReagente, setSelectedReagente] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [filtrosVisiveis, setFiltrosVisiveis] = useState(false);
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  const handleDeleteReagente = async (id) => {
    const response = await fetch(`http://localhost:8080/reagente/${id}`, {
      method: "DELETE",
    });
    if (response.ok) console.log("Reagente excluído com sucesso");
    else console.error("Erro ao excluir reagente");
    setOpenDelete(false);
    setSelectedReagente(null);
  };

  const reagentesFiltrados = (reagentes || []).filter((r) => {
    const nomeOk =
      !busca || (r.nome || "").toLowerCase().includes(busca.toLowerCase());
    const tipoOk = !filtroTipo || r.tipo === filtroTipo;
    return nomeOk && tipoOk;
  });

  const tiposUnicos = [
    ...new Set((reagentes || []).map((r) => r.tipo).filter(Boolean)),
  ];

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          borderRadius: "10px",
          width: "100%",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* FILTROS */}
        <Box sx={{ px: 2, pt: 1.5, pb: filtrosVisiveis ? 0 : 1.5 }}>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            mb={filtrosVisiveis ? 1 : 0}
          >
            <TextField
              size="small"
              placeholder="Buscar por nome..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 16 }} />
                  </InputAdornment>
                ),
                style: { fontSize: "0.82rem" },
              }}
              sx={{ width: 260 }}
            />
            <Button
              size="small"
              startIcon={<FilterListIcon />}
              onClick={() => setFiltrosVisiveis((p) => !p)}
              sx={{
                color: "#4CAF50",
                textTransform: "none",
                fontSize: "0.78rem",
              }}
            >
              {filtrosVisiveis ? "Ocultar filtros" : "Filtros"}
            </Button>
            {(busca || filtroTipo) && (
              <Button
                size="small"
                onClick={() => {
                  setBusca("");
                  setFiltroTipo("");
                }}
                sx={{
                  color: "#999",
                  textTransform: "none",
                  fontSize: "0.78rem",
                }}
              >
                Limpar
              </Button>
            )}
          </Box>
          <Collapse in={filtrosVisiveis}>
            <Box display="flex" gap={1} pb={1.5} flexWrap="wrap">
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "0.78rem",
                  cursor: "pointer",
                }}
              >
                <option value="">Todos os tipos</option>
                {tiposUnicos.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Box>
          </Collapse>
        </Box>

        {/* TABELA */}
        <Box sx={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#4CAF50" }}>
              <tr>
                <th style={thStyle}>Nome</th>
                <th style={thStyle}>Tipo</th>
                <th style={thStyle}>Qtd. Frascos</th>
                <th style={thStyle}>Validade</th>
                <th style={thStyle}>Lote</th>
                <th style={thStyle}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {reagentesFiltrados.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      ...tdStyle,
                      textAlign: "center",
                      color: "#999",
                      padding: "24px",
                    }}
                  >
                    Nenhum reagente encontrado.
                  </td>
                </tr>
              ) : (
                reagentesFiltrados.map((r) => (
                  <tr
                    key={r.id}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f9f9f9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#fff")
                    }
                  >
                    <td style={tdStyle}>{r.nome}</td>
                    <td style={tdStyle}>{r.tipo}</td>
                    <td style={tdStyle}>{r.quantidadeDeFrascos}</td>
                    <td style={tdStyle}>{r.dataValidade || "—"}</td>
                    <td style={tdStyle}>{r.lote}</td>
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
                            setSelectedReagente(r);
                            setOpenDetail(true);
                          }}
                        >
                          <FaEye style={{ color: "#666", fontSize: "18px" }} />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setSelectedReagente(r);
                            setOpenEdit(true);
                          }}
                        >
                          <FaEdit
                            style={{ color: "#4CAF50", fontSize: "18px" }}
                          />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setSelectedReagente(r);
                            setOpenDelete(true);
                          }}
                        >
                          <FaTrashAlt
                            style={{ color: "#e74c3c", fontSize: "18px" }}
                          />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Box>
      </Paper>

      {selectedReagente && openDetail && (
        <ReagenteDetailOverlay
          open={openDetail}
          onClose={() => setOpenDetail(false)}
          reagente={selectedReagente}
        />
      )}
      {selectedReagente && openEdit && (
        <ReagenteEditOverlay
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          reagente={selectedReagente}
          onSave={onSave}
        />
      )}
      {selectedReagente && openDelete && (
        <ReagenteExcluirOverlay
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          onDelete={() => handleDeleteReagente(selectedReagente.id)}
          reagente={selectedReagente}
        />
      )}
    </>
  );
};

const thStyle = {
  color: "#fff",
  padding: "12px 24px",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "12px 24px",
  borderBottom: "1px solid #f0f0f0",
};

export default TabelaListaReagentes;
