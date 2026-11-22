import { EncomendaState, StatusEncomenda } from "../domain/states/EncomendaState";
import { PendenteState } from "../domain/states/PendenteState";
import { FreteStrategy } from "../domain/strategies/FreteStrategy";
import { PadraoStrategy } from "../domain/strategies/PadraoStrategy";
import { ExpressaStrategy } from "../domain/strategies/ExpressaStrategy";
import { RetiradaBalcaoStrategy } from "../domain/strategies/RetiradaBalcaoStrategy";
import { EncomendaSubject } from "../observers/EncomendaSubject";
import { AuditoriaObserver, RegistroAuditoria } from "../observers/AuditoriaObserver";
import { NotificacaoObserver } from "../observers/NotificacaoObserver";

export interface CriarEncomendaDTO {
  cliente: string;
  origem: string;
  destino: string;
  pesoKg: number;
  modalidade: "PADRAO" | "EXPRESSA" | "BALCAO";
}

interface EncomendaInterna {
  codigo: string;
  cliente: string;
  origem: string;
  destino: string;
  pesoKg: number;
  modalidade: string;
  taxa: number;
  prazoHoras: number;
  state: EncomendaState;
  criadoEm: string;
}

export interface EncomendaResposta {
  codigo: string;
  cliente: string;
  origem: string;
  destino: string;
  pesoKg: number;
  modalidade: string;
  taxa: number;
  prazoHoras: number;
  status: StatusEncomenda;
  criadoEm: string;
}

export class EncomendaService {
  private encomendas: EncomendaInterna[] = [];
  private strategies: Record<string, FreteStrategy>;
  private subject: EncomendaSubject;
  private auditoriaObserver: AuditoriaObserver;
  private sequencia = 100;

  constructor() {
    this.strategies = {
      PADRAO: new PadraoStrategy(),
      EXPRESSA: new ExpressaStrategy(),
      BALCAO: new RetiradaBalcaoStrategy(),
    };

    this.subject = new EncomendaSubject();
    this.auditoriaObserver = new AuditoriaObserver();
    this.subject.inscrever(this.auditoriaObserver);
    this.subject.inscrever(new NotificacaoObserver());
  }

  criar(dados: CriarEncomendaDTO): EncomendaResposta {
    if (!dados.cliente || !dados.origem || !dados.destino) {
      throw new Error("Cliente, origem e destino são obrigatórios.");
    }
    if (dados.pesoKg <= 0) {
      throw new Error("O peso deve ser maior que zero.");
    }

    const strategy = this.strategies[dados.modalidade];
    if (!strategy) {
      throw new Error("Modalidade de entrega inválida.");
    }

    const { taxa, prazoHoras } = strategy.calcular(dados.pesoKg);
    const agora = new Date().toLocaleString("pt-BR");
    const codigo = `RF-${++this.sequencia}`;
    const estadoInicial = new PendenteState();

    const nova: EncomendaInterna = {
      codigo,
      cliente: dados.cliente,
      origem: dados.origem,
      destino: dados.destino,
      pesoKg: dados.pesoKg,
      modalidade: strategy.modalidade,
      taxa,
      prazoHoras,
      state: estadoInicial,
      criadoEm: agora,
    };

    this.encomendas.unshift(nova);

    this.subject.notificar({
      tipo: "CRIACAO",
      codigo: nova.codigo,
      cliente: nova.cliente,
      statusAtual: estadoInicial.nome,
      dataHora: agora,
    });

    return this.serializar(nova);
  }

  listar(): EncomendaResposta[] {
    return this.encomendas.map((e) => this.serializar(e));
  }

  atualizarStatus(codigo: string, acao: "INICIAR_ROTA" | "CONCLUIR" | "CANCELAR"): EncomendaResposta {
    const encomenda = this.encomendas.find((e) => e.codigo === codigo);
    if (!encomenda) {
      throw new Error("Encomenda não encontrada.");
    }

    const statusAnterior = encomenda.state.nome;

    if (acao === "INICIAR_ROTA") {
      encomenda.state = encomenda.state.iniciarRota();
    } else if (acao === "CONCLUIR") {
      encomenda.state = encomenda.state.concluirEntrega();
    } else if (acao === "CANCELAR") {
      encomenda.state = encomenda.state.cancelar();
    } else {
      throw new Error("Ação de status inválida.");
    }

    this.subject.notificar({
      tipo: "MUDANCA_STATUS",
      codigo: encomenda.codigo,
      cliente: encomenda.cliente,
      statusAnterior,
      statusAtual: encomenda.state.nome,
      dataHora: new Date().toLocaleString("pt-BR"),
    });

    return this.serializar(encomenda);
  }

  consultarHistorico(codigo: string): RegistroAuditoria[] {
    return this.auditoriaObserver.listarPorCodigo(codigo);
  }

  private serializar(e: EncomendaInterna): EncomendaResposta {
    return {
      codigo: e.codigo,
      cliente: e.cliente,
      origem: e.origem,
      destino: e.destino,
      pesoKg: e.pesoKg,
      modalidade: e.modalidade,
      taxa: e.taxa,
      prazoHoras: e.prazoHoras,
      status: e.state.nome,
      criadoEm: e.criadoEm,
    };
  }
}