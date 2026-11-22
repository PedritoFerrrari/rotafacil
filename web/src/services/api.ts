export type StatusEncomenda = "PENDENTE" | "EM_ROTA" | "ENTREGUE" | "CANCELADA";
export type ModalidadeEntrega = "PADRAO" | "EXPRESSA" | "BALCAO";
export type AcaoStatus = "INICIAR_ROTA" | "CONCLUIR" | "CANCELAR";

export interface Encomenda {
  codigo: string;
  cliente: string;
  origem: string;
  destino: string;
  pesoKg: number;
  modalidade: ModalidadeEntrega;
  taxa: number;
  prazoHoras: number;
  status: StatusEncomenda;
  criadoEm: string;
}

export interface RegistroAuditoria {
  codigo: string;
  descricao: string;
  dataHora: string;
}

const BASE_URL = "http://localhost:3333";

export async function listarEncomendas(): Promise<Encomenda[]> {
  const res = await fetch(`${BASE_URL}/encomendas`);
  if (!res.ok) throw new Error("Falha ao buscar encomendas.");
  return res.json();
}

export async function criarEncomenda(dados: {
  cliente: string;
  origem: string;
  destino: string;
  pesoKg: number;
  modalidade: ModalidadeEntrega;
}): Promise<Encomenda> {
  const res = await fetch(`${BASE_URL}/encomendas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.erro || "Erro ao cadastrar encomenda.");
  return body;
}

export async function atualizarStatusEncomenda(
  codigo: string,
  acao: AcaoStatus
): Promise<Encomenda> {
  const res = await fetch(`${BASE_URL}/encomendas/${codigo}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ acao }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.erro || "Erro ao atualizar status.");
  return body;
}

export async function buscarHistoricoEncomenda(
  codigo: string
): Promise<RegistroAuditoria[]> {
  const res = await fetch(`${BASE_URL}/encomendas/${codigo}/historico`);
  if (!res.ok) throw new Error("Falha ao buscar histórico.");
  return res.json();
}