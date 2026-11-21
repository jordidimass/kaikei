<p align="center">
  <a href="https://kaikei.io"><img src="https://kaikei.io/opengraph-image" alt="Kaikei: every number opens down to the row" width="720"></a>
</p>

# Kaikei

**Every number opens down to the row.**

Kaikei is a budget-vs-actual workspace for small-business owners. Upload the CSVs and PDF bills you already have, and answer "why did this number change?" in one place, then click through to the exact CSV row, the bill, and the match between them. Your AI assistant gets the same answer from the same records over MCP.

**Website:** [kaikei.io](https://kaikei.io)

> This repository hosts the kaikei.io landing page.

## How it works

```
CSV / PDF ─▶ stored unchanged (sha256) ─▶ raw rows ─▶ proposed mapping / extraction / match ─▶ you confirm
                                                                                              │
                                    App dashboard ◀── one metrics module ──▶ MCP (Grok · Claude · ChatGPT)
```

1. **Import.** Kaikei proposes the column mapping with your original values beside each guess. You confirm.
2. **What changed.** Budget, actual, variance and cash by category, with before → after for every figure an upload touched.
3. **Drilldown.** Figure → contributing transactions → original CSV row, file name and row number.
4. **Evidence.** A PDF bill sits beside its extracted fields and a suggested match. Only your confirmation links it, and a bill never adds to spending.
5. **Review.** Unreadable rows, missing bills, uncertain matches and unbudgeted spending, each with its location and reason.
6. **MCP.** One read-only endpoint per workspace. Assistants phrase answers; they never compute figures.

## Principles

- AI proposes. Rules verify. The owner approves. The engine calculates.
- Figures are identical with AI on or off.
- Originals are never mutated. Each transaction counts once.
- Money is exact: integer minor units plus an ISO currency code.

## Develop

```bash
pnpm install
pnpm dev
```

Next.js (App Router) · Tailwind CSS 4 · shadcn/ui · deployed on Vercel.

Sample files live in `public/samples/`.

Website typefaces: [Sentient](https://www.fontshare.com/fonts/sentient) (ITF Free Font License) and [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (OFL). Brand icons from [simple-icons](https://simpleicons.org) (CC0) and [LobeHub Icons](https://github.com/lobehub/lobe-icons) (MIT).
