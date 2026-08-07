# Chaia Finance

Aplicativo web de **controle financeiro familiar**, feito para usar no celular. Interface em português e inglês, com tema claro/escuro, instalável como aplicativo (PWA) e publicável em qualquer hospedagem estática.

## Funcionalidades

- **Acesso privado**: somente usuários autorizados da família entram (cada um com sua própria conta)
- **Dashboard de saúde financeira**: saldo em caixa, dívida total, vencimentos do mês (por banco), vencidos em aberto e saldo por banco
- **Bancos**: contas, cartões de crédito e investimentos, com saldo, dívida e dia da fatura — na aba **Contas**, cada cartão tem **Faturas de cartão** com botão **Marcar como pago** (pode desfazer depois); faturas pagas não geram alertas
- **Registro de Contas**: aba **Registros** com as contas que se repetem todo mês (Luz, Aluguel...) — com **valor fixo** (valor, categoria e banco) ou sem valor definido. A mesma aba tem **Recebimentos**: rendas fixas do mês (Salário, aluguéis recebidos...) e recebimentos pontuais com data. **7 dias antes do vencimento**, cada conta vira um lançamento na aba **Contas** e um lembrete na página inicial (Atenção necessária). O lembrete e o lançamento só somem quando você edita o valor e marca como pago
- **Contas e vencimentos**: lançamentos do mês (criados automaticamente pelo Registro de Contas), contas únicas (**Edição** — algo que já aconteceu) e **Recebimentos** (renda fixa e pontual), com alertas de vencimento (hoje, amanhã, em breve, vencida)
- **Importação de extratos** em **CSV** ou **PDF** (cartão/banco), com seleção do banco e mapeamento de colunas
- **Renomear empresas**: razão social → nome pessoal, aplicado automaticamente em todos os extratos
- **Transações** com edição manual, categorias, filtros e busca
- **Insights inteligentes**: assinaturas recorrentes, cortes de custo, investimentos, reserva de emergência e mais
- **Conquistas** e meta diária de orçamento
- Design mobile-first com animações suaves

## Como usar

1. Acesse o link do site publicado
2. Entre com o usuário e a senha fornecidos pelo administrador da família
3. Comece cadastrando seus **bancos** (saldo atual de cada um) e depois as contas mensais no **Registro de Contas** (valor fixo ou sem valor definido)
4. Importe extratos (CSV/PDF) para registrar os lançamentos automaticamente

Dica: use **Mais → Ajustes → Exportar tudo (JSON)** para baixar uma cópia de segurança dos dados.

## Configuração do Supabase (1ª vez)

1. Entre no painel: https://supabase.com/dashboard
2. **Authentication → Users → Add user**: `evelyn.chaia@chaia.finance` / `010319` e `celso.chaia@chaia.finance` / `1982734650`
3. **SQL Editor → New query** → cole o conteúdo do **`install.sql`** desta pasta → **Run**
4. No app, entre com `evelyn.chaia` ou `celso.chaia` (o app completa o `@chaia.finance`)

> O script é seguro para rodar quantas vezes quiser (`if not exists`). **Sempre que o app ganhar atualizações que mexam no banco, rode o `install.sql` atualizado de novo** — ele adiciona colunas novas (ex.: `kind` e `due_date` em contas) sem apagar nada.

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
