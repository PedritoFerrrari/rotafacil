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
    <div style={{ marginTop: "20px", padding: "12px", border: "1px solid #ccc", background: "#fafafa" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>Histórico — {codigo}</strong>
        <button onClick={onFechar}>Fechar</button>
      </div>
      <ul style={{ margin: "8px 0 0", paddingLeft: "20px" }}>
        {logs.map((log, i) => (
          <li key={i}>
            <small>{log.dataHora}</small> — {log.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
}