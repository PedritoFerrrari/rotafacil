import { EncomendaState, StatusEncomenda } from "./EncomendaState";
import { EmRotaState } from "./EmRotaState";
import { CanceladaState } from "./CanceladaState";

export class PendenteState implements EncomendaState {
  readonly nome: StatusEncomenda = "PENDENTE";

  iniciarRota(): EncomendaState {
    return new EmRotaState();
  }

  concluirEntrega(): EncomendaState {
    throw new Error("Não é possível concluir uma encomenda que ainda não saiu para entrega.");
  }

  cancelar(): EncomendaState {
    return new CanceladaState();
  }
}