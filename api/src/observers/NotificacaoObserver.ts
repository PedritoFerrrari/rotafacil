import { EncomendaEvento, EncomendaObserver } from "./EncomendaSubject";

export class NotificacaoObserver implements EncomendaObserver {
  atualizar(evento: EncomendaEvento): void {
    const mensagem =
      evento.tipo === "CRIACAO"
        ? `Olá ${evento.cliente}, seu pedido ${evento.codigo} foi registrado!`
        : `Olá ${evento.cliente}, seu pedido ${evento.codigo} agora está: ${evento.statusAtual}.`;

    console.log(`[NOTIFICAÇÃO CLIENTE] -> ${mensagem}`);
  }
}