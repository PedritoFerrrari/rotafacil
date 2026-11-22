import React from "react";
import { RegistroAuditoria } from "../services/api";

interface Props {
  codigo: string | null;
  logs: RegistroAuditoria[];
  onFechar: () => void;
}

export function ModalHistorico({ codigo, logs, onFechar }: Props) {
  if (!codigo) return null;

  return (
    <div style={styles.overlay} onClick={onFechar}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={{ margin: 0, color: "#0f172a" }}>Histórico de Auditoria — {codigo}</h3>
          <button onClick={onFechar} style={styles.closeBtn}>✕</button>
        </div>
        <ul style={styles.list}>
          {logs.map((log, index) => (
            <li key={index} style={styles.item}>
              <small style={{ color: "#64748b", display: "block", marginBottom: "2px" }}>
                {log.dataHora}
              </small>
              <span style={{ color: "#1e293b", fontSize: "14px" }}>{log.descricao}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  modal: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "480px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    color: "#64748b",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  item: {
    padding: "10px",
    background: "#f8fafc",
    borderRadius: "6px",
    borderLeft: "3px solid #2563eb",
  },
};