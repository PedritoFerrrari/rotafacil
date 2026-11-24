## Como Executar e Testar
- **Passos para rodar a API:**
  1. Acesse a pasta da API: `cd api`
  2. Instale as dependências: `npm install`
  3. Inicie o servidor: `npm run dev` (disponível em `http://localhost:3333`)

- **Passos para rodar a Web:**
  - Faça o mesmo que foi feito para a API

- **Roteiro rápido de teste (2 a 3 passos para validar o fluxo):**
  1. Envie um `POST /encomendas` com cliente, origem, destino, peso e modalidade (`PADRAO`, `EXPRESSA` ou `BALCAO`) e valide o retorno `201` com `taxa`, `prazoHoras` e `status: "PENDENTE"`.
  2. Envie `PATCH /encomendas/RF-101/status` com `{"acao":"INICIAR_ROTA"}` e depois `{"acao":"CONCLUIR"}`, conferindo em `GET /encomendas` a evolução do status e em `GET /encomendas/RF-101/historico` os registros de auditoria.
  3. Tente enviar `{"acao":"CANCELAR"}` após `ENTREGUE` e confirme o retorno `400` bloqueando a transição inválida, além das mensagens de notificação/auditoria no console da API.
