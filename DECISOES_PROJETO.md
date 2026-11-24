# Decisões de Projeto — RotaFácil

## 1. Funcionalidades Implementadas
- [x] Cadastro de encomendas
- [x] Listagem / consulta de encomendas
- [x] Atualização de status
- [x] Regras / ações implementadas: Cálculo dinâmico de frete e prazo por modalidade de entrega; validação de transições permitidas entre status; registro automático de histórico de auditoria e disparo de notificação simulada ao criar ou atualizar uma encomenda.

## 2. Padrões de Projeto Escolhidos (3 padrões)

### Padrão 1: Strategy (Comportamental)
- **Onde foi aplicado:** `api/src/domain/strategies/` (`FreteStrategy.ts`, `PadraoStrategy.ts`, `ExpressaStrategy.ts`, `RetiradaBalcaoStrategy.ts`) e consumido em `EncomendaService.ts` (Camada: API).
- **Problema / variação que resolve:** As regras de cálculo de taxa e prazo variam conforme a modalidade escolhida e tendem a receber novas modalidades no futuro.
- **Por que essa escolha (e não um `if/else` ou código direto)?:** Concentrar regras de precificação em condicionais `if/else` dentro do serviço viola o princípio Aberto/Fechado (OCP) e dificulta testes isolados. Com o Strategy, cada modalidade fica encapsulada em sua própria classe.

### Padrão 2: State (Comportamental)
- **Onde foi aplicado:** `api/src/domain/states/` (`EncomendaState.ts`, `PendenteState.ts`, `EmRotaState.ts`, `EntregueState.ts`, `CanceladaState.ts`) e `EncomendaService.ts` (Camada: API).
- **Problema / variação que resolve:** O controle de quais transições de status são válidas ao longo do dia (ex.: impedir que uma encomenda `ENTREGUE` seja cancelada ou volte para rota).
- **Por que essa escolha:** Validar combinações de status atual vs. próximo status via `if/else` gera código frágil e espalhado. O padrão State delega a transição ao estado atual e lança erro explícito para transições inválidas.

### Padrão 3: Observer (Comportamental)
- **Onde foi aplicado:** `api/src/observers/` (`EncomendaSubject.ts`, `AuditoriaObserver.ts`, `NotificacaoObserver.ts`) e acionado por `EncomendaService.ts` (Camada: API).
- **Problema / variação que resolve:** Disparar ações secundárias (registrar log de auditoria e simular notificação ao cliente) toda vez que uma encomenda é criada ou muda de status.
- **Por que essa escolha:** Acoplar logs e notificações diretamente nos métodos de negócio torna o serviço rígido. O Observer desacopla a emissão do evento das ações que reagem a ele.