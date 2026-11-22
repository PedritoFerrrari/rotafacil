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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
      onCriada();
    } catch (err: any) {
      onErro(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
      <input
        placeholder="Cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        required
        style={{ padding: "6px" }}
      />
      <input
        placeholder="Origem"
        value={origem}
        onChange={(e) => setOrigem(e.target.value)}
        required
        style={{ padding: "6px" }}
      />
      <input
        placeholder="Destino"
        value={destino}
        onChange={(e) => setDestino(e.target.value)}
        required
        style={{ padding: "6px" }}
      />
      <input
        type="number"
        step="0.1"
        min="0.1"
        value={pesoKg}
        onChange={(e) => setPesoKg(e.target.value)}
        required
        style={{ width: "80px", padding: "6px" }}
      />
      <select
        value={modalidade}
        onChange={(e) => setModalidade(e.target.value as ModalidadeEntrega)}
        style={{ padding: "6px" }}
      >
        <option value="PADRAO">Padrão</option>
        <option value="EXPRESSA">Expressa</option>
        <option value="BALCAO">Balcão</option>
      </select>
      <button type="submit" style={{ padding: "6px 12px", cursor: "pointer" }}>
        Cadastrar
      </button>
    </form>
  );
}