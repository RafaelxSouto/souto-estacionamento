# Guia de Deploy - Sistema de Estacionamento

Este documento fornece instruções para fazer o deploy da aplicação em diferentes plataformas.

## 📦 Preparação para Deploy

### 1. Build de Produção

Antes de fazer o deploy, crie uma versão otimizada da aplicação:

```bash
npm run build
```

Isso criará uma pasta `dist/` com os arquivos otimizados.

### 2. Testar o Build Localmente

```bash
npm run preview
```

Acesse `http://localhost:4173` para testar o build.

## 🚀 Opções de Deploy

### Opção 1: Vercel (Recomendado)

A Vercel oferece deploy gratuito e automático para projetos Vite/React.

#### Método 1: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel
```

#### Método 2: Via GitHub

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "Import Project"
4. Selecione seu repositório
5. Configure:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Clique em "Deploy"

### Opção 2: Netlify

#### Via CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

Quando solicitado:

- **Publish directory**: `dist`

#### Via Interface Web

1. Acesse [netlify.com](https://netlify.com)
2. Arraste a pasta `dist` para o upload
3. Configure domínio (opcional)

### Opção 3: GitHub Pages

1. Instale o pacote gh-pages:

```bash
npm install --save-dev gh-pages
```

2. Adicione ao `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://seu-usuario.github.io/nome-do-repo"
}
```

3. Configure `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/nome-do-repo/',
})
```

4. Execute o deploy:

```bash
npm run deploy
```

### Opção 4: Firebase Hosting

1. Instale o Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Faça login:

```bash
firebase login
```

3. Inicialize o projeto:

```bash
firebase init hosting
```

Configure:

- **Public directory**: `dist`
- **Single-page app**: `Yes`
- **Automatic builds**: `No`

4. Faça o build:

```bash
npm run build
```

5. Deploy:

```bash
firebase deploy
```

### Opção 5: Azure Static Web Apps

1. Acesse o [Portal do Azure](https://portal.azure.com)
2. Crie um novo "Static Web App"
3. Conecte ao seu repositório GitHub
4. Configure:
   - **Build Preset**: `Vite`
   - **App location**: `/`
   - **Output location**: `dist`
5. Clique em "Review + Create"

## 🔧 Configurações Importantes

### Variáveis de Ambiente

Se você usar variáveis de ambiente, configure-as na plataforma:

**Vercel/Netlify:**

- Acesse configurações do projeto
- Adicione as variáveis em "Environment Variables"

**Exemplo:**

```
VITE_API_BASE_URL=https://api-correa.azurewebsites.net/
```

### CORS

Certifique-se de que a API backend permite requisições do domínio de deploy:

- `https://seu-app.vercel.app`
- `https://seu-app.netlify.app`
- etc.

### Redirecionamentos (SPA)

Para aplicações SPA, configure redirecionamentos:

**Vercel** - `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Netlify** - `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Ou crie `public/_redirects`:

```
/*    /index.html   200
```

## 📊 Monitoramento

### Analytics

Adicione Google Analytics ou similar editando `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', 'GA_MEASUREMENT_ID')
</script>
```

### Sentry (Erro Tracking)

```bash
npm install @sentry/react
```

Configure em `main.jsx`:

```javascript
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
})
```

## ✅ Checklist de Deploy

Antes de fazer o deploy, verifique:

- [ ] Todas as dependências estão instaladas
- [ ] Build local funciona (`npm run build`)
- [ ] Preview local funciona (`npm run preview`)
- [ ] Variáveis de ambiente configuradas
- [ ] API backend está acessível
- [ ] CORS configurado no backend
- [ ] Redirecionamentos SPA configurados
- [ ] Favicon e meta tags atualizados
- [ ] README atualizado com URL de produção

## 🔒 Segurança

### Headers de Segurança

Configure headers de segurança na plataforma:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### HTTPS

Todas as plataformas mencionadas fornecem HTTPS automaticamente.

## 🐛 Troubleshooting

### Erro 404 ao recarregar página

**Causa**: Redirecionamento SPA não configurado

**Solução**: Configure os redirecionamentos conforme seção "Redirecionamentos (SPA)"

### API não responde

**Causa**: CORS ou URL incorreta

**Solução**:

1. Verifique a URL da API
2. Configure CORS no backend
3. Verifique variáveis de ambiente

### Build falha

**Causa**: Erros no código ou dependências faltando

**Solução**:

1. Execute `npm install`
2. Corrija erros de lint (`npm run lint`)
3. Teste localmente antes do deploy

## 📚 Recursos Adicionais

- [Vite Deploy Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)

## 🎉 Pós-Deploy

Após o deploy bem-sucedido:

1. ✅ Teste todas as funcionalidades
2. ✅ Verifique responsividade
3. ✅ Teste em diferentes navegadores
4. ✅ Configure domínio customizado (opcional)
5. ✅ Configure SSL/HTTPS
6. ✅ Adicione monitoramento
7. ✅ Compartilhe a URL!

---

**Seu app está pronto para o mundo! 🚀**
