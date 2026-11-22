import { EncomendaEvento, EncomendaObserver } from "./EncomendaSubject";

export interface RegistroAuditoria {
  codigo: string;
  descricao: string;
  dataHora: string;
}

export class AuditoriaObserver implements EncomendaObserver {
  private logs: RegistroAuditoria[] = [];

  atualizar(evento: EncomendaEvento): void {
    const descricao =
      evento.tipo === "CRIACAO"
        ? `Encomenda criada para ${evento.cliente} com status inicial ${evento.statusAtual}.`
        : `Status alterado de ${evento.statusAnterior} para ${evento.statusAtual}.`;

    const registro: RegistroAuditoria = {
      codigo: evento.codigo,
      descricao,
      dataHora: evento.dataHora,
    };

    this.logs.push(registro);
    console.log(`[AUDITORIA] [${registro.dataHora}] ${registro.codigo}: ${registro.descricao}`);
  }

  listarPorCodigo(codigo: string): RegistroAuditoria[] {
    return this.logs.filter((log) => log.codigo === codigo);
  }
}