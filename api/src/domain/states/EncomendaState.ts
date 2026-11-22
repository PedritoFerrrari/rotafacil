export type StatusEncomenda = "PENDENTE" | "EM_ROTA" | "ENTREGUE" | "CANCELADA";

export interface EncomendaState {
  readonly nome: StatusEncomenda;
  iniciarRota(): EncomendaState;
  concluirEntrega(): EncomendaState;
  cancelar(): EncomendaState;
}