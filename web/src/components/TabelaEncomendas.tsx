import React from "react";
import { AcaoStatus, Encomenda } from "../services/api";

interface Props {
  encomendas: Encomenda[];
  onMudarStatus: (codigo: string, acao: AcaoStatus) => void;
  onVerHistorico: (codigo: string) => void;
}

export function TabelaEncomendas({ encomendas, onMudarStatus, onVerHistorico }: Props) {
  if (encomendas.length === 0) {
    return <p>Nenhuma encomenda cadastrada.</p>;
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "16px", fontSize: "14px" }}>
      <thead>
        <tr style={{ borderBottom: "2px solid #ccc", textAlign: "left" }}>
          <th style={{ padding: "8px" }}>Código</th>
          <th style={{ padding: "8px" }}>Cliente</th>
          <th style={{ padding: "8px" }}>Trajeto</th>
          <th style={{ padding: "8px" }}>Peso</th>
          <th style={{ padding: "8px" }}>Modalidade</th>
          <th style={{ padding: "8px" }}>Taxa / Prazo</th>
          <th style={{ padding: "8px" }}>Status</th>
          <th style={{ padding: "8px" }}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {encomendas.map((item) => (
          <tr key={item.codigo} style={{ borderBottom: "1px solid #eee" }}>
            <td style={{ padding: "8px" }}><strong>{item.codigo}</strong></td>
            <td style={{ padding: "8px" }}>{item.cliente}</td>
            <td style={{ padding: "8px" }}>{item.origem} → {item.destino}</td>
            <td style={{ padding: "8px" }}>{item.pesoKg} kg</td>
            <td style={{ padding: "8px" }}>{item.modalidade}</td>
            <td style={{ padding: "8px" }}>R$ {item.taxa.toFixed(2)} ({item.prazoHoras}h)</td>
            <td style={{ padding: "8px" }}><strong>{item.status}</strong></td>
            <td style={{ padding: "8px", display: "flex", gap: "4px" }}>
              <button onClick={() => onMudarStatus(item.codigo, "INICIAR_ROTA")}>Em Rota</button>
              <button onClick={() => onMudarStatus(item.codigo, "CONCLUIR")}>Entregar</button>
              <button onClick={() => onMudarStatus(item.codigo, "CANCELAR")}>Cancelar</button>
              <button onClick={() => onVerHistorico(item.codigo)}>Logs</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}