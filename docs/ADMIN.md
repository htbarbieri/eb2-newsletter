# Painel Admin (`/admin`)

Edição colaborativa via **[Decap CMS](https://decapcms.org/)** — alterações vão para o GitHub e a Vercel republica o site automaticamente.

**URL:** [https://eb2emfoco.com.br/admin/](https://eb2emfoco.com.br/admin/)

## O que dá para editar

| Seção | Arquivos |
|-------|----------|
| **Newsletter** | `src/content/newsletter/*.md` |
| **Linha do tempo** | `src/content/timeline/*.md` |
| **Imigrei - Primeiros Passos** | `src/data/recursos.json` |

## 1. Convidar colaboradores

No GitHub → repo **htbarbieri/eb2-newsletter** → **Settings → Collaborators** → adicione a conta GitHub de cada pessoa com permissão **Write**.

Sem acesso ao repo, o login no admin falha mesmo com OAuth ok.

## 2. Criar GitHub OAuth App

1. [github.com/settings/developers](https://github.com/settings/developers) → **OAuth Apps** → **New OAuth App**
2. Preencha:
   - **Application name:** EB2 em Foco Admin
   - **Homepage URL:** `https://eb2emfoco.com.br/admin/`
   - **Authorization callback URL:** `https://eb2emfoco.com.br/api/callback`
3. Gere o **Client Secret** e guarde.

Para preview na Vercel antes do domínio customizado, crie um segundo OAuth App ou use temporariamente:
- Homepage: `https://SEU-PROJETO.vercel.app/admin/`
- Callback: `https://SEU-PROJETO.vercel.app/api/callback`

## 3. Variáveis na Vercel

Projeto → **Settings → Environment Variables**:

| Variável | Valor |
|----------|--------|
| `SITE_URL` | `https://eb2emfoco.com.br` |
| `GITHUB_CLIENT_ID` | do OAuth App |
| `GITHUB_CLIENT_SECRET` | do OAuth App |
| `ADMIN_BASIC_USER` | login/senha extra para abrir `/admin` (recomendado) |
| `ADMIN_BASIC_PASSWORD` | senha do basic auth |

Redeploy após salvar.

## 4. Proteção em camadas

| Camada | O que protege | Obrigatório? |
|--------|---------------|--------------|
| **HTTP Basic Auth** | Quem pode **abrir** `/admin` | Opcional (`ADMIN_BASIC_*` na Vercel) |
| **Login GitHub (Decap)** | Quem pode **publicar** alterações | Sim — precisa de acesso **Write** no repo |
| **noindex** | Busca Google indexar o painel | Automático |

Sem `ADMIN_BASIC_USER` / `ADMIN_BASIC_PASSWORD`, o painel abre para qualquer visitante — mas **só colaboradores do GitHub** conseguem salvar. Com basic auth, aparece popup de usuário/senha **antes** da tela do CMS.

Compartilhe user/senha do basic auth só com colaboradores de confiança (canal privado, 1Password, etc.).

## 5. Usar o admin

1. Acesse `/admin`
2. **Login with GitHub**
3. Edite posts, eventos da timeline ou links
4. **Publish** → commit no `main` → Vercel rebuild (~1 min)

## Desenvolvimento local

Terminal 1 — site:

```bash
npm run dev
```

Terminal 2 — proxy do CMS (edita arquivos locais sem GitHub):

```bash
npm run cms
```

Abra [http://localhost:4321/admin/](http://localhost:4321/admin/) — o `local_backend: true` no config usa o proxy local.

## Segurança

- `/admin` com **noindex** (robots.txt + header)
- **Basic Auth** opcional via `middleware.js` (Vercel Edge)
- **GitHub OAuth** — apenas contas com **write** no repo publicam
- Não compartilhe `GITHUB_CLIENT_SECRET` nem `ADMIN_BASIC_PASSWORD`
- Revogue acesso de colaboradores que saírem do projeto

## Limitações

- Não edita código/layout — só conteúdo (markdown + JSON)
- Imagens vão para `public/uploads/` (commitadas no repo)
- Cada publish dispara rebuild completo na Vercel (normal para site estático)
