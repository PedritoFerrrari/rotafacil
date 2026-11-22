import { StatusEncomenda } from "../domain/states/EncomendaState";

export interface EncomendaEvento {
  tipo: "CRIACAO" | "MUDANCA_STATUS";
  codigo: string;
  cliente: string;
  statusAnterior?: StatusEncomenda;
  statusAtual: StatusEncomenda;
  dataHora: string;
}

export interface EncomendaObserver {
  atualizar(evento: EncomendaEvento): void;
}

export class EncomendaSubject {
  private observers: EncomendaObserver[] = [];

  inscrever(observer: EncomendaObserver): void {
    this.observers.push(observer);
  }

  notificar(evento: EncomendaEvento): void {
    for (const observer of this.observers) {
      observer.atualizar(evento);
    }
  }
}