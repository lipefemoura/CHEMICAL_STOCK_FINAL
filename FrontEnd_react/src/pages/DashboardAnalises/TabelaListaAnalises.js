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
import AnaliseDetailOverlay from "../../pages/components/analiseListaIcons/AnaliseDetailOverlay";
import AnaliseEditOverlay from "../../pages/components/analiseListaIcons/AnaliseEditOverlay";
import AnaliseExcluirOverlay from "../../pages/components/analiseListaIcons/AnaliseExcluirOverlay";

const TabelaListaAnalises = ({ analises, onSave }) => {
  const [selectedAnalise, setSelectedAnalise] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [filtrosVisiveis, setFiltrosVisiveis] = useState(false);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");

  const handleDeleteAnalise = async (id) => {
    const response = await fetch(`http://localhost:8080/analise/${id}`, {
      method: "DELETE",
    });
    if (response.ok) console.log("Análise excluída com sucesso");
    else console.error("Erro ao excluir análise");
    setOpenDelete(false);
  };

  const analisesFiltradas = (analises || []).filter((a) => {
    const nomeOk =
      !busca ||
      (a.nomeAnalise || "").toLowerCase().includes(busca.toLowerCase());
    const statusOk = !filtroStatus || a.statusAnalise === filtroStatus;
    return nomeOk && statusOk;
  });

  return (
    <>
      <Paper
        elevation={3}
        sx={{ borderRadius: "10px", width: "100%", overflow: "hidden" }}
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
            {(busca || filtroStatus) && (
              <Button
                size="small"
                onClick={() => {
                  setBusca("");
                  setFiltroStatus("");
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
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "0.78rem",
                  cursor: "pointer",
                }}
              >
                <option value="">Todos os status</option>
                <option value="EM_ANDAMENTO">Em andamento</option>
                <option value="CONCLUIDA">Concluída</option>
                <option value="ATRASADA">Atrasada</option>
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
                <th style={thStyle}>Matriz</th>
                <th style={thStyle}>Contrato</th>
                <th style={thStyle}>Data Cadastro</th>
                <th style={thStyle}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {analisesFiltradas.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      ...tdStyle,
                      textAlign: "center",
                      color: "#999",
                      padding: "24px",
                    }}
                  >
                    Nenhuma análise encontrada.
                  </td>
                </tr>
              ) : (
                analisesFiltradas.map((a) => (
                  <tr
                    key={a.id}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f9f9f9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#fff")
                    }
                  >
                    <td style={tdStyle}>{a.nomeAnalise || "—"}</td>
                    <td style={tdStyle}>{a.matrizNome || "—"}</td>
                    <td style={tdStyle}>{a.contratoNome || "—"}</td>
                    <td style={tdStyle}>{a.dataCadastro || "—"}</td>
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
                          <FaEye style={{ color: "#666", fontSize: "18px" }} />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setSelectedAnalise(a);
                            setOpenEdit(true);
                          }}
                        >
                          <FaEdit
                            style={{ color: "#4CAF50", fontSize: "18px" }}
                          />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setSelectedAnalise(a);
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
          onDelete={() => handleDeleteAnalise(selectedAnalise.id)}
          analise={selectedAnalise}
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

export default TabelaListaAnalises;
