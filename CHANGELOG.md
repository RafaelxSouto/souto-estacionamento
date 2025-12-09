# 📝 Changelog - Sistema de Estacionamento Web

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

---

## [1.0.1] - 2024-12-09

### 🐛 Correções Críticas

#### Dashboard

- **Corrigido**: Dados não apareciam na tabela
  - Problema: API retorna `dataEntrada` e `horarioEntrada` separados (arrays)
  - Solução: Criadas funções que suportam arrays `[2024, 12, 9]` e `[14, 30, 0]`
  - Corrigido uso de `horarioEntrada` separado na coluna de horário

#### Entrada de Veículos

- **Adicionado**: Máscara automática de placa brasileira (ABC-1234 ou ABC1D23)
- **Corrigido**: Validação de formato de placa antes de enviar
- **Corrigido**: Modal mostrava dados incorretos (acessava `response.data` em vez de `response.data.veiculo`)
- **Corrigido**: Formatação de data e horário separados no modal
- **Melhorado**: Mensagens de erro mais claras

#### Saída de Veículos

- **Corrigido**: Erro ao buscar veículo (comparação de placas com/sem hífen)
- **Corrigido**: Erro ao registrar saída (acesso incorreto à resposta da API)
- **Corrigido**: Modal de recibo usava `valorAPagar` (não existe) em vez de `valorPago`
- **Corrigido**: Formatação incorreta de horários de entrada e saída no recibo
- **Adicionado**: Máscara automática de placa no campo de busca
- **Adicionado**: Validação de formato de placa

#### Backend

- **Corrigido**: Import faltante de `LocalDateTime` em `VeiculosService.java`

### ✨ Novos Recursos

- **Criado**: `/src/utils/formatters.js` - Biblioteca de utilitários
  - `formatDate()` - Formata arrays de data da API
  - `formatTime()` - Formata arrays de hora da API
  - `formatCurrency()` - Formata valores em BRL
  - `formatPlaca()` - Aplica máscara ABC-1234
  - `cleanPlaca()` - Remove caracteres especiais
  - `isValidPlaca()` - Valida formato

### 📚 Documentação

- **Criado**: `CORRECOES.md` - Documento detalhado de todas as correções
- **Atualizado**: Este CHANGELOG com versão 1.0.1

### 🎯 Impacto

Todas as funcionalidades principais agora funcionam corretamente:

- ✅ Dashboard exibe veículos estacionados
- ✅ Entrada registra e valida placas corretamente
- ✅ Saída busca, calcula valor e exibe recibo correto
- ✅ Máscaras de placa aplicadas automaticamente
- ✅ Validações impedem dados inválidos

---

## [1.0.0] - 2024-12-09

### 🎉 Lançamento Inicial

Primeira versão completa da aplicação web de gerenciamento de estacionamento.

### ✨ Adicionado

#### Autenticação & Segurança

- Sistema completo de autenticação com JWT
- Página de login com validação
- Página de registro de usuário
- Context API para gerenciamento de estado de autenticação
- Hook customizado `useAuth` para fácil acesso ao contexto
- Interceptor axios para adicionar token automaticamente
- Proteção de rotas com componente `ProtectedRoute`
- Logout com limpeza de token
- Redirecionamento automático quando token expira

#### Interface & Layout

- Layout responsivo com drawer lateral usando Material-UI
- AppBar com título e menu mobile
- Navegação entre páginas
- Ícones Material Icons para melhor UX
- Tema Material-UI customizável
- Design totalmente responsivo (mobile-first)

#### Dashboard

- Página principal com visão geral do estacionamento
- Tabela de veículos estacionados com:
  - Placa do veículo
  - Data de entrada
  - Horário de entrada
- Card com contador de veículos estacionados
- Botão de atualização manual da lista
- Estados de loading durante requisições
- Mensagem quando não há veículos
- Formatação de data e hora em português (pt-BR)

#### Entrada de Veículos

- Formulário para registrar entrada de veículos
- Campo de placa com conversão automática para maiúsculas
- Validação de campo obrigatório
- Modal de confirmação após registro bem-sucedido
- Exibição de detalhes do veículo registrado:
  - Placa
  - Data e horário de entrada
- Feedback visual de erros
- Loading spinner durante requisição

#### Saída de Veículos

- Fluxo em duas etapas (busca e confirmação)
- **Etapa 1**: Busca de veículo por placa
- **Etapa 2**: Confirmação com exibição de dados
- Card com informações do veículo encontrado
- Botão de cancelar para nova busca
- Modal de recibo após saída registrada
- Cálculo e exibição de valor a pagar
- Formatação de moeda em Real (R$)

#### Serviços & API

- Cliente axios configurado com baseURL
- Interceptor de requisições para adicionar token
- Interceptor de respostas para tratamento de erros
- Timeout configurado (10 segundos)
- Headers padrão (Content-Type: application/json)

#### Documentação

- `README.md` - Documentação técnica completa
- `GUIA_DE_USO.md` - Manual do usuário
- `DEPLOY.md` - Guia de deployment
- `PROJECT_SUMMARY.md` - Resumo do projeto
- `CHANGELOG.md` - Histórico de mudanças
- `.env.example` - Template de variáveis de ambiente
- Comentários inline no código

#### Dependências

- React 19.2.0
- React DOM 19.2.0
- React Router DOM (latest)
- Material-UI (@mui/material)
- Emotion (styled components)
- Material Icons (@mui/icons-material)
- Axios
- Vite 7.2.4

#### Componentes Reutilizáveis

- `LoadingSpinner` - Componente de loading padrão
- `ProtectedRoute` - Higher-Order Component para proteção de rotas
- `ResponsiveDrawer` - Layout principal com navegação

#### Configurações

- Vite configurado para React
- ESLint configurado
- Tema Material-UI
- Fonte Roboto do Google
- Favicon e meta tags

### 🔒 Segurança

- Autenticação baseada em JWT
- Armazenamento seguro de token em localStorage
- Limpeza automática de token inválido
- Rotas protegidas por autenticação
- Validação de formulários
- Tratamento de erros de API

### 📱 Responsividade

- Mobile-first design
- Drawer responsivo (temporary em mobile, permanent em desktop)
- Tabelas scrolláveis em mobile
- Formulários otimizados para touch
- Breakpoints Material-UI

### 🎨 UI/UX

- Design moderno e limpo
- Feedback visual para todas as ações
- Loading states consistentes
- Mensagens de erro amigáveis
- Ícones intuitivos
- Cores e tipografia Material-UI
- Animações suaves
- Modais para confirmações importantes

### 🌐 Internacionalização

- Interface em português brasileiro
- Formatação de datas em pt-BR
- Formatação de moeda em BRL (R$)
- Mensagens de erro em português

### 📦 Build & Deploy

- Build otimizado com Vite
- Code splitting automático
- Assets otimizados
- Suporte para múltiplas plataformas de deploy:
  - Vercel
  - Netlify
  - GitHub Pages
  - Firebase Hosting
  - Azure Static Web Apps

### 🐛 Correções

- N/A (primeira versão)

### 🔄 Mudanças

- N/A (primeira versão)

### ❌ Removido

- N/A (primeira versão)

---

## Planejamento Futuro

### [1.1.0] - Melhorias Planejadas

- [ ] Histórico completo de veículos
- [ ] Relatórios e estatísticas
- [ ] Busca avançada com filtros
- [ ] Exportação de dados (PDF, Excel)
- [ ] Dark mode
- [ ] Notificações em tempo real

### [2.0.0] - Recursos Avançados

- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Múltiplos idiomas
- [ ] Perfis de usuário (admin, operador)
- [ ] Dashboard com gráficos
- [ ] Integração com sistemas de pagamento

### [3.0.0] - Escalabilidade

- [ ] TypeScript migration
- [ ] Testes unitários completos
- [ ] Testes E2E
- [ ] CI/CD pipeline
- [ ] Monitoramento e logs
- [ ] Performance optimization

---

## Formato

Este changelog segue o padrão [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

### Tipos de Mudanças

- **Adicionado** - para novas funcionalidades
- **Modificado** - para mudanças em funcionalidades existentes
- **Depreciado** - para funcionalidades que serão removidas
- **Removido** - para funcionalidades removidas
- **Corrigido** - para correção de bugs
- **Segurança** - para vulnerabilidades

---

**Mantido por**: Equipe de Desenvolvimento
**Data de Início**: 09 de Dezembro de 2024
**Status**: ✅ Em Produção
