import { clients } from "@/lib/clients"

const tools = [
  "get_overview",
  "get_budget_variance",
  "search_transactions",
  "get_transaction",
  "get_document",
  "list_review_flags",
  "what_changed",
]

const calls = [
  { name: "get_budget_variance", args: "category: entregas", result: "Deliveries, Nov 2026, GTQ" },
  { name: "get_transaction", args: "id: txn_7f3a", result: "1 bill, confirmed" },
]

const sources = ["txn_7f3a", "sample_actuals_nov.csv, row 3", "bill_transportes_rapidos.pdf"]

function Transcript() {
  return (
    <div className="border-[3px] border-ink text-[15px] leading-6">
      <div className="flex items-baseline justify-between gap-4 border-b-[3px] border-ink px-4 py-3">
        <p className="font-display text-base font-medium">Grok, connected to kaikei</p>
        <p className="text-xs text-ink/70">read-only</p>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_34%]">
        <div className="min-w-0">
          <div className="border-b border-ink px-4 py-3">
            <p className="text-xs text-ink/70">You asked</p>
            <p className="mt-1 font-medium">
              ¿Cuánto nos pasamos del presupuesto de entregas y qué comprobante respalda el último gasto?
            </p>
          </div>
          {calls.map((c) => (
            <div key={c.name} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-ink/30 px-4 py-2 text-[13px]">
              <span className="truncate">
                <span className="font-medium">{c.name}</span> <span className="text-ink/70">{c.args}</span>
              </span>
              <span className="text-ink/70">{c.result}</span>
            </div>
          ))}
          <div className="px-4 py-3">
            <p className="text-xs text-ink/70">Grok answered</p>
            <p className="mt-1">
              En noviembre van Q 3,300 en Entregas contra un presupuesto de Q 3,000: Q 300 por encima. El último gasto es
              de Q 600 a Transportes Rápidos el 18 de noviembre, respaldado por la factura bill_transportes_rapidos.pdf.
            </p>
          </div>
        </div>
        <div className="flex flex-col border-t-[3px] border-ink md:border-t-0 md:border-l-[3px]">
          <div className="flex flex-col gap-2 px-4 py-3 text-[13px] [overflow-wrap:anywhere]">
            <p className="font-semibold">Source</p>
            {sources.map((s) => (
              <p key={s} className="text-ink/80">
                {s}
              </p>
            ))}
          </div>
          <div className="mt-auto border-t-[3px] border-ink bg-blue px-4 py-3 text-white">
            <p className="text-xs">as_of</p>
            <p className="font-medium">imp_0412, same as the app</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function McpSection() {
  return (
    <>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <h2 className="t-h2">Ask your assistant. Get the same number.</h2>
          <p className="t-lead mt-4 text-ink/80">
            Each workspace has one read-only MCP address. Grok, Claude or ChatGPT call the same code as the dashboard and
            get back the figure, the period, the currency and links to the rows and bills behind it.
          </p>
          <p className="t-body mt-4 text-ink/80">
            The assistant writes the sentence. It never does the maths, and it can&apos;t import a file, confirm a match or
            change a figure.
          </p>
        </div>
        <Transcript />
      </div>

      <div className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <h3 className="t-h3">One address, any assistant.</h3>
          <p className="t-body mt-3 text-ink/80">
            Copy it from Settings, Connect AI. Every answer carries an <span className="font-medium">as_of</span> stamp so you
            can check it read what you see in the app.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {tools.map((t) => (
              <li key={t} className="px-2 py-1 text-[13px] outline-1 -outline-offset-1 outline-ink">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="self-start border-[3px] border-ink">
          <p className="truncate border-b-[3px] border-ink px-4 py-3 font-medium">
            https://kaikei.io/api/mcp/<span className="text-ink/60">your-workspace-token</span>
          </p>
          <ul>
            {clients.map((c) => (
              <li
                key={c.name}
                className="grid grid-cols-[minmax(0,1fr)] gap-1 border-b border-ink/30 px-4 py-3 last:border-b-0 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-6"
              >
                <span className="flex items-center gap-2 font-medium">
                  <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
                    <path d={c.path} />
                  </svg>
                  {c.name}
                </span>
                <span className="t-small text-ink/80">{c.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
