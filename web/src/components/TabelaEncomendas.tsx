import React from "react";
import { AcaoStatus, Encomenda } from "../services/api";

interface Props {
  encomendas: Encomenda[];
  onMudarStatus: (codigo: string, acao: AcaoStatus) => void;
  onVerHistorico: (codigo: string) => void;
}

export function TabelaEncomendas({ encomendas, onMudarStatus, onVerHistorico }: Props) {
  if (encomendas.length === 0) {
    return (
      <div style={styles.empty}>
        Nenhuma encomenda registrada ainda. Cadastre a primeira acima.
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Código</th>
            <th style={styles.th}>Cliente</th>
            <th style={styles.th}>Trajeto / Peso</th>
            <th style={styles.th}>Modalidade</th>
            <th style={styles.th}>Frete / Prazo</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {encomendas.map((item) => (
            <tr key={item.codigo}>
              <td style={styles.td}><strong>{item.codigo}</strong></td>
              <td style={styles.td}>{item.cliente}</td>
              <td style={styles.td}>{item.origem} → {item.destino} ({item.pesoKg} kg)</td>
              <td style={styles.td}>{item.modalidade}</td>
              <td style={styles.td}>
                R$ {item.taxa.toFixed(2)} • {item.prazoHoras}h
              </td>
              <td style={styles.td}>
                <span style={{ ...styles.badge, ...badgeColors[item.status] }}>
                  {item.status}
                </span>
              </td>
              <td style={styles.td}>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  <button
                    onClick={() => onMudarStatus(item.codigo, "INICIAR_ROTA")}
                    style={styles.btnSmall}
                  >
                    Em Rota
                  </button>
                  <button
                    onClick={() => onMudarStatus(item.codigo, "CONCLUIR")}
                    style={styles.btnSmall}
                  >
                    Entregar
                  </button>
                  <button
                    onClick={() => onMudarStatus(item.codigo, "CANCELAR")}
                    style={{ ...styles.btnSmall, background: "#fee2e2", color: "#991b1b", borderColor: "#fecaca" }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => onVerHistorico(item.codigo)}
                    style={{ ...styles.btnSmall, background: "#e0f2fe", color: "#075985", borderColor: "#bae6fd" }}
                  >
                    Auditoria
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const badgeColors: Record<string, React.CSSProperties> = {
  PENDENTE: { background: "#fef3c7", color: "#92400e" },
  EM_ROTA: { background: "#dbeafe", color: "#1e40af" },
  ENTREGUE: { background: "#dcfce7", color: "#166534" },
  CANCELADA: { background: "#fee2e2", color: "#991b1b" },
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    overflowX: "auto",
  },
  empty: {
    background: "#ffffff",
    padding: "24px",
    borderRadius: "8px",
    textAlign: "center",
    color: "#64748b",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "14px" },
  th: { textAlign: "left", padding: "12px", borderBottom: "1px solid #e2e8f0", background: "#f8fafc", color: "#475569" },
  td: { padding: "12px", borderBottom: "1px solid #f1f5f9", color: "#1e293b" },
  badge: { padding: "4px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: 600 },
  btnSmall: {
    padding: "5px 10px",
    borderRadius: "5px",
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 500,
  },
};