import React, { useState } from "react";
import { criarEncomenda, ModalidadeEntrega } from "../services/api";

interface Props {
  onCriada: () => void;
  onErro: (msg: string) => void;
}

export function FormularioEncomenda({ onCriada, onErro }: Props) {
  const [cliente, setCliente] = useState("");
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [pesoKg, setPesoKg] = useState("1.5");
  const [modalidade, setModalidade] = useState<ModalidadeEntrega>("PADRAO");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    onErro("");
    try {
      await criarEncomenda({
        cliente,
        origem,
        destino,
        pesoKg: parseFloat(pesoKg),
        modalidade,
      });
      setCliente("");
      setOrigem("");
      setDestino("");
      setPesoKg("1.5");
      onCriada();
    } catch (err: any) {
      onErro(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={{ marginTop: 0, fontSize: "18px", color: "#0f172a" }}>Nova Encomenda</h2>
      <div style={styles.grid}>
        <input
          placeholder="Nome do Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          required
          style={styles.input}
        />
        <input
          placeholder="Origem (Bairro/Endereço)"
          value={origem}
          onChange={(e) => setOrigem(e.target.value)}
          required
          style={styles.input}
        />
        <input
          placeholder="Destino (Bairro/Endereço)"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          step="0.1"
          min="0.1"
          placeholder="Peso (kg)"
          value={pesoKg}
          onChange={(e) => setPesoKg(e.target.value)}
          required
          style={styles.input}
        />
        <select
          value={modalidade}
          onChange={(e) => setModalidade(e.target.value as ModalidadeEntrega)}
          style={styles.input}
        >
          <option value="PADRAO">Padrão (48h)</option>
          <option value="EXPRESSA">Expressa (6h)</option>
          <option value="BALCAO">Retirada no Balcão (Grátis)</option>
        </select>
        <button type="submit" disabled={enviando} style={styles.button}>
          {enviando ? "Cadastrando..." : "Cadastrar"}
        </button>
      </div>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    marginBottom: "24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
  },
  button: {
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    fontWeight: 600,
    cursor: "pointer",
  },
};