import React, { useEffect, useState } from "react";
import {
  AcaoStatus,
  atualizarStatusEncomenda,
  buscarHistoricoEncomenda,
  Encomenda,
  listarEncomendas,
  RegistroAuditoria,
} from "./services/api";
import { FormularioEncomenda } from "./components/FormularioEncomenda";
import { TabelaEncomendas } from "./components/TabelaEncomendas";
import { ModalHistorico } from "./components/ModalHistorico";

export default function App() {
  const [encomendas, setEncomendas] = useState<Encomenda[]>([]);
  const [erro, setErro] = useState("");
  const [codigoHistorico, setCodigoHistorico] = useState<string | null>(null);
  const [logs, setLogs] = useState<RegistroAuditoria[]>([]);

  async function carregar() {
    try {
      const lista = await listarEncomendas();
      setEncomendas(lista);
    } catch {
      setErro("Não foi possível conectar à API na porta 3333.");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleMudarStatus(codigo: string, acao: AcaoStatus) {
    setErro("");
    try {
      await atualizarStatusEncomenda(codigo, acao);
      await carregar();
    } catch (err: any) {
      setErro(err.message);
    }
  }

  async function handleVerHistorico(codigo: string) {
    try {
      const historico = await buscarHistoricoEncomenda(codigo);
      setLogs(historico);
      setCodigoHistorico(codigo);
    } catch (err: any) {
      setErro(err.message);
    }
  }

  return (
    <div style={{ maxWidth: "1040px", margin: "32px auto", padding: "0 16px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <header style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: 0, color: "#0f172a" }}>RotaFácil — Despacho Urbano</h1>
        <p style={{ margin: "4px 0 0", color: "#64748b" }}>
          Gestão de encomendas, cálculo de frete e rastreamento de entregas
        </p>
      </header>

      {erro && (
        <div style={{ background: "#fee2e2", color: "#991b1b", padding: "12px 16px", borderRadius: "6px", marginBottom: "16px", border: "1px solid #fecaca" }}>
          <strong>Regra de Negócio / Aviso:</strong> {erro}
        </div>
      )}

      <FormularioEncomenda onCriada={carregar} onErro={setErro} />

      <TabelaEncomendas
        encomendas={encomendas}
        onMudarStatus={handleMudarStatus}
        onVerHistorico={handleVerHistorico}
      />

      <ModalHistorico
        codigo={codigoHistorico}
        logs={logs}
        onFechar={() => setCodigoHistorico(null)}
      />
    </div>
  );
}