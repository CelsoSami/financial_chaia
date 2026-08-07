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
2. Abra **SQL Editor → New query**
3. Cole todo o conteúdo do arquivo **`install.sql`** (presente nesta pasta) e clique em **Run**
4. Pronto. O aplicativo lê/escreve usando a chave publicável já embutida no código.

> O script cria as tabelas (`banks`, `transactions`, `aliases`, `bills`, `bill_payments`, `settings`), desativa RLS e libera acesso para a chave anônima/publicável.

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

As senhas ficam armazenadas como hash SHA-256 no código (não em texto puro), e a sessão dura 30 dias no aparelho.

## Estrutura

```
financial_chaia/
├── index.html          # estrutura do app
├── install.sql         # criação do banco no Supabase (rodar 1x)
├── manifest.json       # PWA (instalável no celular)
├── css/style.css       # estilos (temas claro/escuro)
├── js/
│   ├── config.js       # URL/chave Supabase + logins (hash)
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

- **Segurança**: o app roda 100% no navegador. Qualquer pessoa com o link do site e as credenciais poderia ler o código e as senhas (mesmo com hash). Recomendações: não publique dados sensíveis além dos extratos já importados, e se quiser mais segurança no futuro, troque o login fixo por autenticação real do Supabase (Auth) com RLS ativo.
- **PDF**: apenas faturas com texto extraível funcionam (não escaneadas). Para banco escaneado, use o CSV.
- **Backup**: em **Mais → Ajustes → Exportar tudo (JSON)** você baixa uma cópia completa dos dados.
