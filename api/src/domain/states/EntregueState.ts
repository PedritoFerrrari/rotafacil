import { EncomendaState, StatusEncomenda } from "./EncomendaState";

export class EntregueState implements EncomendaState {
  readonly nome: StatusEncomenda = "ENTREGUE";

  iniciarRota(): EncomendaState {
    throw new Error("Encomenda já foi entregue e não pode voltar para rota.");
  }

  concluirEntrega(): EncomendaState {
    throw new Error("Encomenda já consta como entregue.");
  }

  cancelar(): EncomendaState {
    throw new Error("Não é possível cancelar uma encomenda já entregue.");
  }
}