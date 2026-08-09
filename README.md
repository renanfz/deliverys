

# 📦 Controle de Entregas - MVP

## Objetivo
Desenvolver um aplicativo web mobile-first para entregadores gerenciarem suas rotas do dia. O foco deste MVP (Mínimo Produto Viável) é validar o fluxo de trabalho de um motorista — desde a visualização da sequência de paradas até a conferência de Notas Fiscais (NFe) e confirmação de entrega. 

Do ponto de vista técnico, o projeto demonstra boas práticas de arquitetura no frontend, destacando a separação clara entre estado armazenado (dados brutos da API) e estado derivado (cálculos de progresso feitos localmente), além de consumo eficiente de APIs RESTful e roteamento dinâmico.

---

## Requisitos Funcionais (RF)
Ações que o sistema deve permitir ao usuário realizar:

- [RF01] Listagem de Rotas: O sistema deve listar as rotas disponíveis do dia, informando a cidade e a data.
- [RF02] Progresso da Rota: Ao abrir uma rota, o sistema deve calcular e exibir o progresso em tempo real (ex: "7 de 12 entregas concluídas").
- [RF03] Sequência de Paradas: O sistema deve listar as entregas de uma rota respeitando estritamente a ordem de parada configurada.
- [RF04] Identificação da Entrega Atual: O sistema deve identificar e destacar visualmente qual é a "entrega atual" (a primeira entrega     pendente na sequência).
- [RF05] Detalhes da Entrega: O sistema deve exibir os dados da entrega selecionada, incluindo cliente, endereço completo e o resumo da NFe (número e valor total).
- [RF06] Visualização de Itens da NFe: O sistema deve permitir que o usuário visualize a lista detalhada de produtos de uma NFe (nome e quantidade) através de um modal.
- [RF07] Integração com GPS: O sistema deve permitir abrir o endereço do cliente no aplicativo de mapas nativo do dispositivo (ex: Google Maps, Waze).
- [RF08] Confirmação de Entrega: O sistema deve permitir que o usuário marque uma entrega pendente como "concluída".

---

## 🛠️ Requisitos Não Funcionais (RNF)
Restrições técnicas, de usabilidade e arquitetura do sistema:

- [RNF01] Stack Tecnológica: O frontend deve ser desenvolvido utilizando React e TypeScript.
- [RNF02] Roteamento: A navegação deve utilizar React Router, garantindo URLs amigáveis e independentes para acessar as rotas (/rota/:id) e os detalhes da entrega (/rota/:routeId/entrega/:deliveryId).
- [RNF03] Interface: O design deve ser estritamente mobile-first, otimizado para uso em telas pequenas com uma das mãos.
- [RNF04] Autenticação: O MVP não possuirá sistema de login ou controle de usuários (fluxo simplificado).
- [RNF05] Integração de API: O app deve consumir uma API RESTful mockada (ex: MockAPI), realizando leitura de recursos aninhados e mutação de status via método PATCH.
- [RNF06] Arquitetura de Estado: Contadores de progresso e definição de "entrega atual" devem ser estados derivados no frontend (calculados via código), não podendo ser armazenados no banco de dados para evitar dessincronização.
- [RNF07] Mapas Nativos: O aplicativo não deve carregar SDKs pesados de mapas na interface. A navegação externa deve ser feita nativamente via chamadas de intenção (ex: geo:latitude,longitude).
- [RNF08] Feedback Visual e Tratamento de Erros: Telas de leitura (GET) devem exibir estados de Loading iniciais e opção de tentar novamente em caso de falha. Ações de escrita (PATCH) devem travar o botão com um Loading interno e, em caso de erro, exibir um alerta visual (Toast) mantendo o usuário na tela para uma nova tentativa.

## Usuarios do sistema
- Entregador
- json-viewer