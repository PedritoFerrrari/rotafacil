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
      setEncomendas(await listarEncomendas());
    } catch {
      setErro("Não foi possível conectar na API.");
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
      setLogs(await buscarHistoricoEncomenda(codigo));
      setCodigoHistorico(codigo);
    } catch (err: any) {
      setErro(err.message);
    }
  }

  return (
    <div style={{ maxWidth: "960px", margin: "24px auto", padding: "0 16px", fontFamily: "sans-serif" }}>
      <h2 style={{ marginTop: 0 }}>RotaFácil</h2>
      {erro && <p style={{ color: "#b91c1c" }}>{erro}</p>}
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