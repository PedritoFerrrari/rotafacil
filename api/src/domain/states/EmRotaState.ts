import { EncomendaState, StatusEncomenda } from "./EncomendaState";
import { EntregueState } from "./EntregueState";
import { CanceladaState } from "./CanceladaState";

export class EmRotaState implements EncomendaState {
  readonly nome: StatusEncomenda = "EM_ROTA";

  iniciarRota(): EncomendaState {
    throw new Error("A encomenda já está em rota de entrega.");
  }

  concluirEntrega(): EncomendaState {
    return new EntregueState();
  }

  cancelar(): EncomendaState {
    return new CanceladaState();
  }
}