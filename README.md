# EB2 em Foco

Site estático com newsletter sobre o caso **CLINIC v. Rubio** (pausa de vistos EB2 para 75 países) e uma página de **recursos práticos** para imigrantes Brasil → EUA.

## Stack

- [Astro 5](https://astro.build)
- [Tailwind CSS 4](https://tailwindcss.com)
- Conteúdo em Markdown (Content Collections)

## Desenvolvimento local

```bash
cd ~/Dev/eb2-newsletter
npm install
npm run dev
```

Abra [http://localhost:4321](http://localhost:4321).

## Publicar um novo post

1. Crie um arquivo `.md` em `src/content/newsletter/`:

```markdown
---
title: "Título do post"
date: 2026-09-01
excerpt: "Resumo curto para a listagem."
tags: ["tag1", "tag2"]
---

Conteúdo em Markdown...
```

2. O site lista automaticamente na homepage (ordenado por data).

## Adicionar evento na linha do tempo

1. Crie um arquivo `.md` em `src/content/timeline/`:

```markdown
---
title: "Título do evento"
dateLabel: "1 Set 2026"
sortDate: 2026-09-01
excerpt: "Resumo curto na timeline."
side: br   # ou us
tags: ["tag"]
---

Conteúdo detalhado em Markdown...
```

2. Aparece automaticamente na timeline da homepage, com link **Ler detalhes →**.

## Adicionar links em Recursos

Edite `src/data/recursos.ts` — cada categoria tem um array de links com `nome`, `url`, `descricao` e opcionalmente `regiao`.

## Painel admin (colaboradores)

Edição via **[`/admin`](docs/ADMIN.md)** — Decap CMS com login GitHub. Guia completo: [docs/ADMIN.md](docs/ADMIN.md).

## Build

```bash
npm run build
npm run preview
```

## Deploy na Vercel

1. Crie um repositório Git e faça push do projeto.
2. Importe em [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Astro** (detectado automaticamente).
4. Cada push em `main` atualiza o site.

Alternativa via CLI:

```bash
npx vercel
```

## Estrutura

```
src/
├── content/newsletter/   # Posts (.md)
├── content/timeline/     # Eventos da linha do tempo (.md)
├── data/recursos.json    # Links (editável no /admin)
├── data/recursos.ts      # Tipos + import do JSON
├── components/           # Header, Footer, cards, timeline
├── layouts/              # BaseLayout
└── pages/                # /, /newsletter/[slug], /timeline/[slug], /dicas
```

## Aviso legal

Conteúdo informativo. Não substitui aconselhamento jurídico, consular ou financeiro profissional.
