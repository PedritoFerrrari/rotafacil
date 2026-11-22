import { EncomendaState, StatusEncomenda } from "./EncomendaState";

export class CanceladaState implements EncomendaState {
  readonly nome: StatusEncomenda = "CANCELADA";

  iniciarRota(): EncomendaState {
    throw new Error("Encomenda cancelada não pode iniciar rota.");
  }

  concluirEntrega(): EncomendaState {
    throw new Error("Encomenda cancelada não pode ser entregue.");
  }

  cancelar(): EncomendaState {
    throw new Error("A encomenda já está cancelada.");
  }
}