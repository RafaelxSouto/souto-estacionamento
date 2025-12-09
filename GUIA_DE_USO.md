# Guia de Uso - Sistema de Estacionamento Web

## 🎯 Objetivo

Este guia ajudará você a usar todas as funcionalidades do sistema de gerenciamento de estacionamento.

## 📝 Primeiros Passos

### 1. Acessar a Aplicação

1. Certifique-se de que o servidor está rodando (`npm run dev`)
2. Abra seu navegador em `http://localhost:5173`
3. Você será redirecionado para a página de login

### 2. Criar uma Conta

Se você ainda não tem uma conta:

1. Na tela de login, clique em **"Não tem uma conta? Cadastre-se"**
2. Preencha o formulário com:
   - **Nome Completo**: Seu nome
   - **Email**: Um email válido
   - **Senha**: Mínimo 6 caracteres
   - **Confirmar Senha**: Repita a senha
3. Clique em **"Cadastrar"**
4. Você será redirecionado automaticamente para o login

### 3. Fazer Login

1. Na tela de login, insira:
   - **Email**: O email cadastrado
   - **Senha**: Sua senha
2. Clique em **"Entrar"**
3. Você será redirecionado para o Dashboard

## 🎮 Funcionalidades

### Dashboard (Página Inicial)

Após fazer login, você verá:

- **Contador de Veículos**: Número total de veículos estacionados
- **Tabela de Veículos**: Lista de todos os veículos no estacionamento
  - Placa
  - Data de Entrada
  - Horário de Entrada
- **Botão Atualizar**: Clique para recarregar a lista

### Registrar Entrada de Veículo

1. No menu lateral, clique em **"Entrada de Veículo"**
2. Digite a **placa do veículo** (ex: ABC-1234)
3. Clique em **"Registrar Entrada"**
4. Um modal aparecerá confirmando:
   - Placa registrada
   - Data e horário de entrada
5. Clique em **"Fechar"** para continuar

**Dica**: A placa será automaticamente convertida para maiúsculas.

### Registrar Saída de Veículo

A saída de veículos é feita em dois passos:

#### Passo 1: Buscar o Veículo

1. No menu lateral, clique em **"Saída de Veículo"**
2. Digite a **placa do veículo**
3. Clique em **"Buscar Veículo"**

#### Passo 2: Confirmar Saída

1. Revise as informações do veículo:
   - Placa
   - Data de entrada
   - Horário de entrada
2. Clique em **"Registrar Saída"** para confirmar
   - OU clique em **"Cancelar"** para fazer nova busca

#### Recibo

Após registrar a saída, um modal exibirá:

- **Placa**: Do veículo
- **Entrada**: Data e horário
- **Saída**: Data e horário
- **Valor a Pagar**: Calculado automaticamente

**Importante**: Anote o valor antes de fechar o modal!

## 🔐 Segurança

### Logout

Para sair do sistema:

1. No menu lateral, clique em **"Sair"**
2. Você será desconectado e redirecionado para o login

### Sessão

- Sua sessão é mantida por um token JWT
- Se o token expirar, você será automaticamente desconectado
- Faça login novamente para continuar usando o sistema

## ⚠️ Mensagens de Erro

### Possíveis Erros e Soluções

#### "Erro ao fazer login"

- **Causa**: Email ou senha incorretos
- **Solução**: Verifique suas credenciais e tente novamente

#### "Erro ao carregar veículos"

- **Causa**: Problema de conexão com o servidor
- **Solução**: Clique em "Atualizar" ou recarregue a página

#### "Veículo não encontrado"

- **Causa**: A placa não está no sistema
- **Solução**: Verifique se digitou a placa corretamente

#### "Estacionamento lotado"

- **Causa**: Não há mais vagas disponíveis
- **Solução**: Aguarde até que um veículo saia

## 💡 Dicas de Uso

1. **Formato de Placa**: Use o padrão brasileiro (ex: ABC-1234 ou ABC1D23)
2. **Atualização Automática**: O dashboard não atualiza sozinho, use o botão "Atualizar"
3. **Navegação**: Use o menu lateral para navegar entre as páginas
4. **Responsividade**: A aplicação funciona em desktop, tablet e celular
5. **Internet**: É necessária conexão com internet para usar o sistema

## 📱 Atalhos de Teclado

- **Tab**: Navegar entre campos
- **Enter**: Submeter formulários
- **Esc**: Fechar modais

## 🆘 Problemas Comuns

### A página não carrega

- Verifique se o servidor está rodando (`npm run dev`)
- Verifique sua conexão com internet
- Tente recarregar a página (F5)

### Não consigo fazer login

- Verifique se você criou uma conta
- Confirme se está usando o email correto
- Verifique se o caps lock está desativado

### Os dados não aparecem

- Clique no botão "Atualizar"
- Faça logout e login novamente
- Limpe o cache do navegador

## 📞 Suporte

Para mais ajuda, consulte:

- README.md - Informações técnicas
- Documentação da API - Detalhes sobre endpoints

## ✨ Recursos Visuais

### Ícones no Sistema

- 🚗 **Carro**: Entrada de veículo
- 🚪 **Porta**: Saída de veículo
- 📊 **Dashboard**: Visão geral
- 👤 **Pessoa**: Área do usuário
- 🚪 **Sair**: Logout

### Cores

- **Azul**: Ações principais
- **Verde**: Sucesso
- **Vermelho**: Erros
- **Cinza**: Informações

---

**Desenvolvido para facilitar o gerenciamento de estacionamento** 🎯
