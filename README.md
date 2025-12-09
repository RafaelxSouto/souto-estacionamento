# Sistema de Gerenciamento de Estacionamento - Web App

Uma aplicação web React completa para gerenciamento de veículos em estacionamento, com autenticação JWT e interface Material-UI.

## 🚀 Tecnologias

- **React 19.2** - Framework frontend
- **Vite** - Build tool e dev server
- **Material-UI (MUI)** - Biblioteca de componentes UI
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP para API
- **Context API** - Gerenciamento de estado global

## 📋 Funcionalidades

- ✅ Sistema de autenticação (Login/Cadastro)
- ✅ Dashboard com listagem de veículos estacionados
- ✅ Registro de entrada de veículos
- ✅ Registro de saída de veículos com cálculo de valor
- ✅ Interface responsiva e moderna
- ✅ Navegação com drawer lateral
- ✅ Proteção de rotas autenticadas
- ✅ Tratamento de erros com feedback visual

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ProtectedRoute.jsx
│   └── ResponsiveDrawer.jsx
├── contexts/           # Contextos React
│   └── AuthContext.jsx
├── hooks/              # Hooks customizados
│   └── useAuth.js
├── pages/              # Páginas da aplicação
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── EntradaPage.jsx
│   └── SaidaPage.jsx
├── services/           # Serviços e APIs
│   └── api.js
├── App.jsx            # Componente principal com rotas
└── main.jsx           # Ponto de entrada
```

## 🔧 Instalação e Execução

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

### Passos

1. **Instale as dependências**:

```bash
npm install
```

2. **Inicie o servidor de desenvolvimento**:

```bash
npm run dev
```

3. **Acesse a aplicação**:
   Abra seu navegador em `http://localhost:5173`

## 🔐 API Backend

A aplicação se conecta à API backend em:

- **Base URL**: `https://api-correa.azurewebsites.net/`

### Endpoints Utilizados:

- `POST /auth/login` - Autenticação
- `POST /auth/register` - Registro de usuário
- `GET /auth/me` - Dados do usuário autenticado
- `GET /api/veiculos` - Lista de veículos estacionados
- `POST /api/veiculos/entrada` - Registrar entrada
- `PUT /api/veiculos/saida` - Registrar saída

## 🎨 Temas e Estilo

A aplicação utiliza Material-UI com tema customizável. O tema padrão usa:

- Primary Color: `#1976d2` (Azul)
- Secondary Color: `#dc004e` (Rosa)

## 📱 Páginas

### 1. Login (`/login`)

- Formulário de autenticação
- Link para cadastro

### 2. Cadastro (`/register`)

- Formulário de registro de novo usuário
- Validação de senhas

### 3. Dashboard (`/dashboard`)

- Tabela com veículos estacionados
- Contador de veículos
- Botão de atualização

### 4. Entrada (`/entrada`)

- Formulário para registrar entrada de veículo
- Modal de confirmação

### 5. Saída (`/saida`)

- Busca de veículo por placa
- Confirmação de dados
- Modal com recibo e valor a pagar

## 🛡️ Segurança

- Token JWT armazenado em `localStorage`
- Interceptor axios para adicionar token automaticamente
- Rotas protegidas com `ProtectedRoute`
- Redirecionamento automático em caso de token inválido

## 🔨 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa linter

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

---

**Desenvolvido com ❤️ usando React + Vite + Material-UI**
