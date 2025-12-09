# 🧪 Guia de Teste - API Local

## ✅ Configuração Concluída!

A aplicação web agora está configurada para se conectar à API local em **`http://localhost:8080`**

---

## 🚀 Como Testar

### 1️⃣ Certifique-se que a API Backend está rodando

```bash
# No diretório do backend (api-mobile)
cd /home/rafaelxsouto/workspace/correa/api-mobile
./mvnw spring-boot:run

# ou se já compilou:
java -jar target/estacionamento-0.0.1-SNAPSHOT.jar
```

A API deve estar rodando em: **http://localhost:8080**

### 2️⃣ O Frontend já está rodando

O servidor Vite está rodando em: **http://localhost:5173**

Você verá no console do navegador a mensagem:

```
🔌 API conectada em: http://localhost:8080
```

### 3️⃣ Fluxo de Teste Completo

#### Passo 1: Criar uma Conta

1. Acesse http://localhost:5173
2. Clique em "Não tem uma conta? Cadastre-se"
3. Preencha:
   - Nome: Seu Nome
   - Email: teste@email.com
   - Senha: 123456
   - Confirmar Senha: 123456
4. Clique em "Cadastrar"

**Esperado**: ✅ Mensagem de sucesso e redirecionamento para login

#### Passo 2: Fazer Login

1. Na tela de login, use:
   - Email: teste@email.com
   - Senha: 123456
2. Clique em "Entrar"

**Esperado**: ✅ Redirecionamento para o Dashboard

#### Passo 3: Dashboard (Verificar Lista Vazia)

1. Você deve ver:
   - Contador: "0" veículos
   - Mensagem: "Nenhum veículo estacionado no momento"

**Esperado**: ✅ Dashboard carrega sem erros

#### Passo 4: Registrar Entrada de Veículo

1. No menu lateral, clique em "Entrada de Veículo"
2. Digite uma placa: `ABC1234`
3. A máscara aplica automaticamente: `ABC-1234`
4. Clique em "Registrar Entrada"

**Esperado**:

- ✅ Modal verde de sucesso
- ✅ Mostra: Placa, Data e Horário corretos
- ✅ Campo limpa após fechar

#### Passo 5: Verificar no Dashboard

1. Volte para o Dashboard (menu lateral)
2. Ou clique em "Atualizar"

**Esperado**:

- ✅ Contador: "1" veículo
- ✅ Tabela mostra:
  - Placa: ABC-1234
  - Data de Entrada: 09/12/2024
  - Horário de Entrada: (hora atual)

#### Passo 6: Registrar Outra Entrada

1. Registre mais veículos:
   - `DEF5678` → `DEF-5678`
   - `GHI9012` → `GHI-9012`
   - `JKL3456` → `JKL-3456`

**Esperado**: ✅ Cada veículo aparece na lista

#### Passo 7: Registrar Saída

1. No menu lateral, clique em "Saída de Veículo"
2. Digite a placa: `ABC1234`
3. Clique em "Buscar Veículo"

**Esperado**:

- ✅ Encontra o veículo
- ✅ Mostra dados de entrada

4. Clique em "Registrar Saída"

**Esperado**:

- ✅ Modal verde de sucesso
- ✅ Recibo mostra:
  - Placa: ABC-1234
  - Entrada: Data e Hora
  - Saída: Data e Hora
  - Valor a Pagar: R$ XX,XX (calculado)

#### Passo 8: Verificar Remoção do Dashboard

1. Volte ao Dashboard
2. Clique em "Atualizar"

**Esperado**:

- ✅ Contador diminui para "3" veículos
- ✅ Veículo ABC-1234 não aparece mais
- ✅ Apenas DEF-5678, GHI-9012, JKL-3456 aparecem

---

## 🐛 Possíveis Erros e Soluções

### ❌ Erro: "Network Error" ou "ERR_CONNECTION_REFUSED"

**Causa**: Backend não está rodando

**Solução**:

```bash
cd /home/rafaelxsouto/workspace/correa/api-mobile
./mvnw spring-boot:run
```

Aguarde a mensagem: `Started EstacionamentoApplication in X seconds`

---

### ❌ Erro: "CORS policy: No 'Access-Control-Allow-Origin'"

**Causa**: CORS não configurado no backend

**Solução**: Verifique se o arquivo `SecurityConfig.java` tem:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.addAllowedOrigin("http://localhost:5173");
    configuration.addAllowedMethod("*");
    configuration.addAllowedHeader("*");
    configuration.setAllowCredentials(true);
    // ...
}
```

---

### ❌ Erro: "401 Unauthorized" após fazer login

**Causa**: Token não está sendo enviado

**Solução**:

1. Abra DevTools (F12)
2. Vá em "Application" > "Local Storage"
3. Verifique se tem a chave `token` com um valor
4. Se não, faça logout e login novamente

---

### ❌ Dashboard não mostra dados após registrar entrada

**Causa**: Pode ser cache ou problema de atualização

**Solução**:

1. Clique no botão "Atualizar"
2. Abra DevTools (F12) > Console
3. Verifique se tem erros vermelhos
4. Verifique a aba "Network" se a chamada `GET /api/veiculos` retornou 200

---

## 📊 Endpoints da API que serão Testados

| Método | Endpoint                | Descrição      | Status Esperado |
| ------ | ----------------------- | -------------- | --------------- |
| POST   | `/auth/register`        | Cadastro       | 201 Created     |
| POST   | `/auth/login`           | Login          | 200 OK          |
| GET    | `/auth/me`              | Usuário atual  | 200 OK          |
| GET    | `/api/veiculos`         | Lista veículos | 200 OK          |
| POST   | `/api/veiculos/entrada` | Entrada        | 201 Created     |
| PUT    | `/api/veiculos/saida`   | Saída          | 201 Created     |

---

## 🔍 Monitoramento

### Console do Navegador (DevTools - F12)

Você verá mensagens como:

```
🔌 API conectada em: http://localhost:8080
```

### Network Tab (DevTools - F12 > Network)

Verifique as requisições:

- ✅ Verde (200-299): Sucesso
- 🟡 Amarelo (400-499): Erro do cliente (validação, autenticação)
- 🔴 Vermelho (500-599): Erro do servidor

### Console do Backend (Terminal)

Verifique logs como:

```
INFO: POST /auth/login - 200 OK
INFO: GET /api/veiculos - 200 OK
INFO: POST /api/veiculos/entrada - 201 Created
```

---

## 🔄 Trocar Entre Local e Produção

### Para usar API Local (localhost:8080):

Arquivo `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

### Para usar API de Produção (Azure):

Arquivo `.env`:

```env
VITE_API_BASE_URL=https://api-correa.azurewebsites.net
```

**Importante**: Após mudar o `.env`, reinicie o servidor:

```bash
# Pressione Ctrl+C no terminal do Vite
# Depois execute:
npm run dev
```

---

## ✅ Checklist de Teste

- [ ] Backend rodando em http://localhost:8080
- [ ] Frontend rodando em http://localhost:5173
- [ ] Console mostra "🔌 API conectada em: http://localhost:8080"
- [ ] Cadastro de usuário funciona
- [ ] Login funciona
- [ ] Dashboard carrega (mesmo vazio)
- [ ] Entrada de veículo funciona
- [ ] Veículo aparece no dashboard
- [ ] Saída de veículo funciona
- [ ] Recibo mostra valor calculado
- [ ] Veículo sai da lista do dashboard

---

## 🎉 Tudo Funcionando?

Se todos os testes passaram, seu sistema está **100% operacional**!

Agora você pode:

1. Testar diferentes cenários
2. Registrar múltiplos veículos
3. Verificar cálculos de valores
4. Testar validações de placa

---

**Versão**: 1.0.1
**API Local**: http://localhost:8080
**Frontend**: http://localhost:5173
**Data**: 09/12/2024
