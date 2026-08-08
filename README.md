# Chaia Finance

Aplicativo web de **controle financeiro familiar**, feito para usar no celular. Interface em portuguÃªs e inglÃªs, com tema claro/escuro, instalÃ¡vel como aplicativo (PWA) e publicÃ¡vel em qualquer hospedagem estÃ¡tica.

## Funcionalidades

- **Acesso privado**: somente usuÃ¡rios autorizados da famÃ­lia entram (cada um com sua prÃ³pria conta)
- **Dashboard de saÃºde financeira**: saldo em caixa, dÃ­vida total, vencimentos do mÃªs (por banco), vencidos em aberto e saldo por banco
- **Bancos**: contas, cartÃµes de crÃ©dito e investimentos, com saldo, dÃ­vida e dia da fatura â€” na aba **Saldos**, cada cartÃ£o tem **Faturas de cartÃ£o** com botÃ£o **Marcar como pago** (pode desfazer depois); faturas pagas nÃ£o geram alertas
- **Registro de Contas**: aba **Registros** com as contas que se repetem todo mÃªs (Luz, Aluguel...) â€” com **valor fixo** (valor, categoria e banco) ou sem valor definido. A mesma aba tem **Recebimentos**: rendas fixas do mÃªs (SalÃ¡rio, aluguÃ©is recebidos...) e recebimentos pontuais com data. **7 dias antes do vencimento**, cada conta vira um lanÃ§amento na aba **Saldos** e um lembrete na pÃ¡gina inicial (AtenÃ§Ã£o necessÃ¡ria). O lembrete e o lanÃ§amento sÃ³ somem quando vocÃª edita o valor e marca como pago
- **Saldos**: visão **Vencimentos** (lanÃ§amentos do mÃªs (criados automaticamente pelo Registro de Contas), contas Ãºnicas (**EdiÃ§Ã£o** â€” algo que jÃ¡ aconteceu) e **Recebimentos** (renda fixa e pontual)) e visão **Extrato** (mês a mês, dia a dia, de tudo que foi marcado como pago ou recebido), com alertas de vencimento (hoje, amanhÃ£, em breve, vencida)
- **ImportaÃ§Ã£o de extratos** em **CSV** ou **PDF** (cartÃ£o/banco), com seleÃ§Ã£o do banco e mapeamento de colunas
- **Renomear empresas**: razÃ£o social â†’ nome pessoal, aplicado automaticamente em todos os extratos
- **TransaÃ§Ãµes** com ediÃ§Ã£o manual, categorias, filtros e busca
- **Insights inteligentes**: assinaturas recorrentes, cortes de custo, investimentos, reserva de emergÃªncia e mais
- **Conquistas** e meta diÃ¡ria de orÃ§amento
- Design mobile-first com animaÃ§Ãµes suaves

## Como usar

1. Acesse o link do site publicado
2. Entre com o usuÃ¡rio e a senha fornecidos pelo administrador da famÃ­lia
3. Comece cadastrando seus **bancos** (saldo atual de cada um) e depois as contas mensais no **Registro de Contas** (valor fixo ou sem valor definido)
4. Importe extratos (CSV/PDF) para registrar os lanÃ§amentos automaticamente

Dica: use **Mais â†’ Ajustes â†’ Exportar tudo (JSON)** para baixar uma cÃ³pia de seguranÃ§a dos dados.

## ConfiguraÃ§Ã£o do Supabase (1Âª vez)

1. Entre no painel: https://supabase.com/dashboard
2. **Authentication â†’ Users â†’ Add user**: `evelyn.chaia@chaia.finance` / `010319` e `celso.chaia@chaia.finance` / `1982734650`
3. **SQL Editor â†’ New query** â†’ cole o conteÃºdo do **`install.sql`** desta pasta â†’ **Run**
4. No app, entre com `evelyn.chaia` ou `celso.chaia` (o app completa o `@chaia.finance`)

> O script Ã© seguro para rodar quantas vezes quiser (`if not exists`). **Sempre que o app ganhar atualizaÃ§Ãµes que mexam no banco, rode o `install.sql` atualizado de novo** â€” ele adiciona colunas novas (ex.: `kind` e `due_date` em contas) sem apagar nada.

## Tecnologia

- **Front-end**: HTML, CSS e JavaScript puros (sem frameworks), PWA instalÃ¡vel
- **Dados**: sincronizados na nuvem com autenticaÃ§Ã£o por conta; cada sessÃ£o dura 30 dias
- **GrÃ¡ficos**: desenhados em canvas, sem bibliotecas externas

## Estrutura do projeto

```
financial_chaia/
â”œâ”€â”€ index.html          # estrutura do app
â”œâ”€â”€ manifest.json       # PWA (instalÃ¡vel no celular)
â”œâ”€â”€ css/style.css       # estilos (temas claro/escuro)
â”œâ”€â”€ js/
â”‚   â”œâ”€â”€ config.js       # configuraÃ§Ã£o do app (nÃ£o contÃ©m credenciais)
â”‚   â”œâ”€â”€ utils.js        # datas, moeda, utilitÃ¡rios
â”‚   â”œâ”€â”€ i18n.js         # traduÃ§Ãµes PT/EN
â”‚   â”œâ”€â”€ particles.js    # fundo animado
â”‚   â”œâ”€â”€ charts.js       # grÃ¡ficos em canvas
â”‚   â”œâ”€â”€ supabaseClient.js
â”‚   â”œâ”€â”€ importers.js    # leitura de CSV/PDF
â”‚   â”œâ”€â”€ insights.js     # motor de insights
â”‚   â””â”€â”€ app.js          # lÃ³gica principal
â””â”€â”€ icons/              # Ã­cones do PWA
```

## Privacidade

- O acesso Ã© restrito a usuÃ¡rios cadastrados; a autenticaÃ§Ã£o Ã© feita pelo servidor, **sem senhas armazenadas no cÃ³digo-fonte**
- Os dados da famÃ­lia sÃ£o protegidos por polÃ­ticas de acesso por usuÃ¡rio
- Este repositÃ³rio Ã© pÃºblico: **nÃ£o inclua senhas, chaves, URLs de projeto ou dados financeiros reais**

## Desenvolvimento

Para testar localmente, sirva a pasta em um servidor estÃ¡tico simples:

```bash
python -m http.server 8080
# ou qualquer outro servidor estÃ¡tico
```

> O app precisa de autenticaÃ§Ã£o configurada para carregar dados; ela Ã© mantida pelo administrador do projeto e nÃ£o faz parte deste repositÃ³rio.
