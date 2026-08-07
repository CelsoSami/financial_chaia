# Chaia Finance

Aplicativo web de **controle financeiro familiar** — 100% HTML, CSS e JavaScript, feito para uso no celular, com dados na nuvem **Supabase**. Deploy gratuito via **GitHub Pages**.

## Funcionalidades

- **Login fixo** para 2 usuários da família (sem criação de novos usuários)
- **Dashboard de saúde financeira**: saldo em caixa, dívida total, vencimentos do mês, vencidos em aberto, saldo por banco
- **Insights inteligentes**: investimentos, cortes de custo, assinaturas recorrentes, contas a vencer, reserva de emergência e mais
- **Importação de extratos** em **CSV** ou **PDF** (cartão/banco) com seleção do banco e mapeamento automático de colunas
- **Renomear empresas** (razão social → nome pessoal): vale para todos os extratos automaticamente
- **Bancos** com saldo, dívida atual editável e dia do vencimento da fatura
- **Contas e vencimentos** com alertas visuais: vence hoje, amanhã, em breve ou vencida
- **Transações** com edição manual, categorias e filtros
- **Tema claro/escuro** e idioma **PT-BR / EN**
- Design mobile-first, animações de partículas, conquistas e meta diária de orçamento

## Configuração do Supabase (1ª vez, obrigatória)

1. Acesse o painel do seu projeto: https://supabase.com/dashboard
2. **Crie os 2 usuários**: menu **Authentication → Users → Add user**
   - `evelyn.chaia@chaia.finance` com senha `010319`
   - `celso.chaia@chaia.finance` com senha `1982734650`
3. Abra **SQL Editor → New query**, cole todo o conteúdo do **`install.sql`** e clique em **Run** (pode rodar novamente com segurança)
4. Pronto — o login do app agora usa a autenticação real do Supabase.

> No app você digita apenas `evelyn.chaia` ou `celso.chaia` (sem o `@chaia.finance` — o app completa automaticamente).

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie o conteúdo da pasta `financial_chaia` (a pasta raiz deve conter `index.html`)
2. Vá em **Settings → Pages**
3. Em *Build and deployment*, escolha **Deploy from a branch** → branch `main` → pasta `/ (root)` → **Save**
4. O site ficará disponível em `https://SEU-USUARIO.github.io/financial_chaia/`

## Logins (únicos, fixos)

| Usuário        | Senha       |
|----------------|-------------|
| evelyn.chaia   | 010319      |
| celso.chaia    | 1982734650  |

As senhas **não existem no código-fonte**: ficam apenas no Supabase Auth, e a sessão é um token JWT gerenciado pelo próprio Supabase (30 dias).

## Segurança (importante)

O app roda 100% no navegador, então **qualquer pessoa com o link do site consegue ler o código-fonte** (HTML/JS) — inclusive a URL e a chave publicável do Supabase. Isso não é um problema porque:

- As **senhas não estão no código** — estão no Supabase Auth (servidor)
- Com **RLS ativo**, a chave publicável **sem login não enxerga nenhum dado**: todas as tabelas exigem usuário autenticado
- Para entrar, a pessoa precisa da senha real — tentativas erradas são rejeitadas pelo servidor

Ambos os usuários compartilham os mesmos dados (controle da família). Se um dia quiser separar os dados por pessoa, basta adicionar uma coluna `owner_id` nas tabelas e trocar as políticas por `auth.uid() = owner_id` — me chame que eu faço essa atualização.

**Bom hábito**: não publique capturas de tela com dados reais, e use o **Mais → Ajustes → Exportar tudo (JSON)** como backup.

## Estrutura

```
financial_chaia/
├── index.html          # estrutura do app
├── install.sql         # criação do banco no Supabase (rodar 1x)
├── manifest.json       # PWA (instalável no celular)
├── css/style.css       # estilos (temas claro/escuro)
├── js/
│   ├── config.js       # URL/chave Supabase + domínio de e-mail do Auth
│   ├── utils.js        # datas, moeda, utilitários
│   ├── i18n.js         # traduções PT/EN
│   ├── particles.js    # fundo animado
│   ├── charts.js       # gráficos em canvas
│   ├── supabaseClient.js
│   ├── importers.js    # leitura de CSV/PDF
│   ├── insights.js     # motor de insights
│   └── app.js          # lógica principal
└── icons/              # ícones do PWA
```

## Observações importantes

- **PDF**: apenas faturas com texto extraível funcionam (não escaneadas). Para banco escaneado, use o CSV.
- **Backup**: em **Mais → Ajustes → Exportar tudo (JSON)** você baixa uma cópia completa dos dados.
- **Sessão**: depois do login, o app mantém você conectado por 30 dias (token de refresh do Supabase). Para sair, use **Mais → Sair**.
