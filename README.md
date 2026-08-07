# Chaia Finance

Aplicativo web de **controle financeiro familiar**, feito para usar no celular. Interface em português e inglês, com tema claro/escuro, instalável como aplicativo (PWA) e publicável em qualquer hospedagem estática.

## Funcionalidades

- **Acesso privado**: somente usuários autorizados da família entram (cada um com sua própria conta)
- **Dashboard de saúde financeira**: saldo em caixa, dívida total, vencimentos do mês (por banco), vencidos em aberto e saldo por banco
- **Bancos**: contas, cartões de crédito e investimentos, com saldo, dívida e dia da fatura
- **Contas e vencimentos**: contas **mensais** ou **únicas (edição de valores passados)**, com alertas de vencimento (hoje, amanhã, em breve, vencida)
- **Importação de extratos** em **CSV** ou **PDF** (cartão/banco), com seleção do banco e mapeamento de colunas
- **Renomear empresas**: razão social → nome pessoal, aplicado automaticamente em todos os extratos
- **Transações** com edição manual, categorias, filtros e busca
- **Insights inteligentes**: assinaturas recorrentes, cortes de custo, investimentos, reserva de emergência e mais
- **Conquistas** e meta diária de orçamento
- Design mobile-first com animações suaves

## Como usar

1. Acesse o link do site publicado
2. Entre com o usuário e a senha fornecidos pelo administrador da família
3. Comece cadastrando seus **bancos** (saldo atual de cada um) e depois suas **contas** (mensais ou únicas)
4. Importe extratos (CSV/PDF) para registrar os lançamentos automaticamente

Dica: use **Mais → Ajustes → Exportar tudo (JSON)** para baixar uma cópia de segurança dos dados.

## Tecnologia

- **Front-end**: HTML, CSS e JavaScript puros (sem frameworks), PWA instalável
- **Dados**: sincronizados na nuvem com autenticação por conta; cada sessão dura 30 dias
- **Gráficos**: desenhados em canvas, sem bibliotecas externas

## Estrutura do projeto

```
financial_chaia/
├── index.html          # estrutura do app
├── manifest.json       # PWA (instalável no celular)
├── css/style.css       # estilos (temas claro/escuro)
├── js/
│   ├── config.js       # configuração do app (não contém credenciais)
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

## Privacidade

- O acesso é restrito a usuários cadastrados; a autenticação é feita pelo servidor, **sem senhas armazenadas no código-fonte**
- Os dados da família são protegidos por políticas de acesso por usuário
- Este repositório é público: **não inclua senhas, chaves, URLs de projeto ou dados financeiros reais**

## Desenvolvimento

Para testar localmente, sirva a pasta em um servidor estático simples:

```bash
python -m http.server 8080
# ou qualquer outro servidor estático
```

> O app precisa de autenticação configurada para carregar dados; ela é mantida pelo administrador do projeto e não faz parte deste repositório.
