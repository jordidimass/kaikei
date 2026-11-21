"use client"

import { useEffect, useRef, useState } from "react"
import { clients } from "@/lib/clients"
import { cn } from "@/lib/utils"

const tools = [
  "get_overview",
  "get_budget_variance",
  "search_transactions",
  "get_transaction",
  "get_document",
  "list_review_flags",
  "what_changed",
]

type Line =
  | { kind: "user"; text: string }
  | { kind: "tool"; name: string; args: string; result: string }
  | { kind: "answer"; text: string; cites: string[] }

const transcript: Line[] = [
  { kind: "user", text: "¿Cuánto nos pasamos del presupuesto de entregas y qué comprobante respalda el último gasto?" },
  { kind: "tool", name: "get_budget_variance", args: '{ "category": "entregas" }', result: "Deliveries · Nov 2026 · GTQ" },
  { kind: "tool", name: "get_transaction", args: '{ "id": "txn_7f3a" }', result: "1 confirmed document" },
  {
    kind: "answer",
    text: "En noviembre van Q3,300 en Entregas contra un presupuesto de Q3,000: Q300 por encima. El último gasto es de Q600 a Transportes Rápidos el 18 de noviembre, respaldado por la factura bill_transportes_rapidos.pdf.",
    cites: ["txn_7f3a", "sample_actuals_nov.csv:3", "doc_0193", "as_of imp_0412"],
  },
]

function Transcript() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -25% 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_40px_120px_-50px_oklch(0.74_0.14_162/0.4)]">
      <div className="flex h-8 items-center gap-1.5 border-b border-border px-3">
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="type-ui ml-3 text-[11px] text-muted-foreground">grok · kaikei mcp</span>
      </div>
      <ol className="space-y-4 p-5 font-mono text-[13px] leading-relaxed sm:p-6">
        {transcript.map((line, i) => (
          <li
            key={i}
            style={{ transitionDelay: shown ? `${i * 380}ms` : "0ms" }}
            className={cn(
              "transition-[opacity,transform] duration-500 ease-[var(--ease-out)] motion-reduce:translate-y-0",
              shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            )}
          >
            {line.kind === "user" && (
              <p className="text-foreground">
                <span className="text-signal">›</span> {line.text}
              </p>
            )}
            {line.kind === "tool" && (
              <p className="flex flex-wrap items-baseline gap-x-2 text-muted-foreground">
                <span className="text-signal">●</span>
                <span className="text-foreground">{line.name}</span>
                <span>{line.args}</span>
                <span className="text-muted-foreground/70">→ {line.result}</span>
              </p>
            )}
            {line.kind === "answer" && (
              <div className="border-l border-border pl-4 text-foreground/90">
                <p>{line.text}</p>
                <p className="mt-3 flex flex-wrap gap-1.5">
                  {line.cites.map((id) => (
                    <span key={id} className="rounded border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                      {id}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export function McpSection() {
  return (
    <section id="mcp" className="scroll-mt-8 pb-28">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] lg:items-center lg:gap-16">
        <div className="fade-up">
          <p className="type-label flex items-center gap-2 text-muted-foreground">
            <span className="text-signal">06</span>
            MCP
          </p>
          <h2 className="type-title mt-4 text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)]">Ask your assistant. Get the same number.</h2>
          <p className="type-body mt-4 max-w-sm">
            Each workspace has one read-only MCP endpoint. Grok, Claude or ChatGPT call the same code the dashboard
            uses and get back figures, the period, the currency and links to the rows and bills behind them. The
            assistant phrases the answer. It never does the math.
          </p>
          <ul className="mt-6 flex max-w-sm flex-wrap gap-1.5">
            {tools.map((tool) => (
              <li key={tool} className="type-ui rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground">
                {tool}
              </li>
            ))}
          </ul>
        </div>
        <div className="fade-up min-w-0">
          <Transcript />
        </div>
      </div>

      <div className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] lg:gap-16">
        <div className="fade-up">
          <h3 className="type-heading text-base">One URL, any assistant</h3>
          <p className="type-small mt-3 max-w-sm">
            Copy the endpoint from <span className="text-foreground">Settings → Connect AI</span> and paste it into
            your client. Every answer carries an <span className="text-foreground">as_of</span> stamp, so you can check
            it read the same data you see in the app.
          </p>
          <p className="type-small mt-4 max-w-sm">
            <span className="text-foreground">Read-only.</span> No tool can import a file, confirm a match or change a
            figure. Those stay with you.
          </p>
        </div>
        <div className="fade-up min-w-0 overflow-hidden rounded-xl border border-border bg-background/60">
          <div className="border-b border-border px-5 py-3.5">
            <code className="type-ui block truncate text-foreground">
              <span className="text-signal">https://</span>kaikei.io/api/mcp/
              <span className="text-muted-foreground">&lt;workspace-token&gt;</span>
            </code>
          </div>
          <ul className="divide-y divide-border">
            {clients.map((c) => (
              <li key={c.name} className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:gap-6">
                <span className="type-ui flex shrink-0 items-center gap-2.5 text-foreground sm:w-28">
                  <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
                    <path d={c.path} />
                  </svg>
                  {c.name}
                </span>
                <span className="type-small text-[13px]">{c.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
