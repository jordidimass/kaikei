import { cn } from "@/lib/utils"

type Tone = "ai" | "rule" | "you"

const toneLabel: Record<Tone, string> = {
  ai: "Suggested by AI",
  rule: "Flagged by rule",
  you: "Confirmed by you",
}

export function Tag({ tone, children }: { tone: Tone; children?: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center px-2 py-0.5 text-[11px] leading-4 font-medium",
        tone === "ai" && "outline-1 -outline-offset-1 outline-ink outline-dashed",
        tone === "rule" && "outline-1 -outline-offset-1 outline-ink",
        tone === "you" && "bg-blue text-white"
      )}
    >
      {children ?? toneLabel[tone]}
    </span>
  )
}

export function MockFrame({
  title,
  meta,
  children,
  className,
}: {
  title: string
  meta?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col border-[3px] border-ink bg-beige text-[13px] leading-5 max-sm:text-[12px]", className)}>
      <div className="flex items-baseline justify-between gap-4 border-b-[3px] border-ink px-4 py-3">
        <p className="truncate font-display text-base font-medium">{title}</p>
        {meta && <p className="shrink-0 text-xs text-ink/70">{meta}</p>}
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  )
}

const head = "text-xs font-medium text-ink/70"

export function ImportMock() {
  const rows = [
    { col: "fecha", value: "2026-11-18", field: "Date" },
    { col: "descripcion", value: "Transportes Rapidos - entrega…", field: "Description" },
    { col: "categoria", value: "Entregas", field: "Category: Deliveries", ai: true },
    { col: "monto", value: "-600.00", field: "Amount" },
    { col: "moneda", value: "GTQ", field: "Currency" },
  ]
  return (
    <MockFrame title="sample_actuals_nov.csv" meta="Actual transactions">
      <div className="grid grid-cols-[0.9fr_1.4fr_1.5fr] gap-3 border-b border-ink px-4 py-2">
        <span className={head}>Your column</span>
        <span className={head}>Your value</span>
        <span className={head}>Becomes</span>
      </div>
      {rows.map((r) => (
        <div key={r.col} className="grid grid-cols-[0.9fr_1.4fr_1.5fr] items-center gap-3 border-b border-ink/30 px-4 py-2">
          <span className="text-ink/70">{r.col}</span>
          <span className="truncate">{r.value}</span>
          <span className="flex min-w-0 items-center gap-2">
            <span className="truncate font-medium">{r.field}</span>
            {r.ai && <Tag tone="ai">AI</Tag>}
          </span>
        </div>
      ))}
      <div className="mt-auto grid grid-cols-3 border-t-[3px] border-ink">
        {[
          { n: "1", label: "new", fill: true },
          { n: "2", label: "already imported" },
          { n: "1", label: "we couldn't read" },
        ].map((s) => (
          <div key={s.label} className={cn("border-l border-ink px-4 py-3 first:border-l-0", s.fill && "bg-blue text-white")}>
            <p className="font-display text-2xl font-bold">{s.n}</p>
            <p className={cn("text-xs", s.fill ? "text-white" : "text-ink/70")}>{s.label}</p>
          </div>
        ))}
      </div>
    </MockFrame>
  )
}

const overview = [
  { cat: "Deliveries", budget: "3,000", actual: "3,300", variance: "300 over", changed: true },
  { cat: "Rent", budget: "4,500", actual: "4,500", variance: "on budget" },
  { cat: "Payroll", budget: "18,000", actual: "17,850", variance: "150 under" },
  { cat: "Supplies", budget: "6,200", actual: "5,980", variance: "220 under" },
  { cat: "Advertising", budget: "1,500", actual: "1,240", variance: "260 under" },
]

export function OverviewMock() {
  return (
    <MockFrame title="Overview, November 2026" meta="GTQ">
      <div className="grid grid-cols-[1.2fr_1fr_1fr_1.1fr_28px] gap-3 max-sm:grid-cols-[1.1fr_0.9fr_0.9fr_1.2fr_20px] max-sm:gap-2 border-b border-ink px-4 py-2">
        <span className={head}>Category</span>
        <span className={cn(head, "text-right")}>Budget</span>
        <span className={cn(head, "text-right")}>Actual</span>
        <span className={cn(head, "text-right")}>Variance</span>
        <span />
      </div>
      {overview.map((r) => (
        <div key={r.cat} className="grid grid-cols-[1.2fr_1fr_1fr_1.1fr_28px] items-center gap-3 border-b border-ink/30 px-4 py-2">
          <span className="truncate">{r.cat}</span>
          <span className="text-right text-ink/70">{r.budget}</span>
          <span className="text-right font-medium">{r.actual}</span>
          <span className={cn("text-right whitespace-nowrap", r.changed ? "font-semibold" : "text-ink/70")}>{r.variance}</span>
          <span className={cn("h-5 w-full", r.changed ? "bg-blue" : "outline-1 -outline-offset-1 outline-ink/40")} />
        </div>
      ))}
      <div className="mt-auto border-t-[3px] border-ink px-4 py-3">
        <p className="font-medium">What changed after your upload</p>
        <p className="mt-1 text-ink/80">
          Deliveries actual rose from Q 2,700 to <span className="font-semibold">Q 3,300</span>. That&apos;s Q 300 over the Q 3,000
          budget.
        </p>
      </div>
    </MockFrame>
  )
}

const deliveries = [
  { date: "18 Nov", desc: "Transportes Rápidos, bill attached", amount: "600.00", traced: true },
  { date: "12 Nov", desc: "Fletes Guate, ruta Mixco", amount: "900.00" },
  { date: "07 Nov", desc: "Mensajería Express, zona 10", amount: "600.00" },
  { date: "03 Nov", desc: "Fletes Guate, ruta centro", amount: "1,200.00" },
]

export function DrilldownMock() {
  return (
    <MockFrame title="Deliveries, November 2026" meta="4 transactions">
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)] sm:grid-cols-[minmax(0,1fr)_34%]">
        <div className="flex flex-col px-4 py-3">
          <p className="text-xs text-ink/70">Actual</p>
          <p className="font-display text-[28px] leading-9 font-bold tracking-[-0.02em]">Q 3,300.00</p>
          <p className="text-ink/80">Q 300 over budget (Q 3,000)</p>
          <div className="mt-3">
            {deliveries.map((t) => (
              <div
                key={t.date}
                className={cn(
                  "grid grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-2 border-b border-ink px-2 py-1.5",
                  t.traced && "bg-blue text-white"
                )}
              >
                <span className={t.traced ? "text-white" : "text-ink/70"}>{t.date}</span>
                <span className="truncate">{t.desc}</span>
                <span className="font-medium">Q {t.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-3 border-t-[3px] border-ink px-4 py-3 [overflow-wrap:anywhere] sm:border-t-0 sm:border-l-[3px]">
          <p className="font-semibold">Source</p>
          <p className="text-ink/80">
            sample_actuals_nov.csv
            <br />
            row 3
          </p>
          <p className="text-ink/80">
            bill_transportes_rapidos.pdf
            <br />
            confirmed by you
          </p>
        </div>
      </div>
    </MockFrame>
  )
}

export function EvidenceMock() {
  return (
    <MockFrame title="bill_transportes_rapidos.pdf" meta="page 1 of 1">
      <div className="grid min-h-0 flex-1 grid-cols-2">
        <div className="m-4 flex flex-col bg-white p-4 text-[11px] text-ink outline-1 outline-ink">
          <p className="text-[13px] font-semibold">Transportes Rápidos, S.A.</p>
          <p className="text-ink/60">NIT 8812347-5, Guatemala</p>
          <div className="mt-4 flex justify-between">
            <span>Factura</span>
            <span>18/11/2026</span>
          </div>
          <div className="mt-3 flex flex-col gap-1.5">
            <span className="h-1 bg-ink/15" />
            <span className="h-1 w-4/5 bg-ink/15" />
            <span className="h-1 w-3/5 bg-ink/15" />
          </div>
          <div className="mt-auto flex justify-between border-t border-ink pt-2 text-[13px] font-semibold">
            <span>Total</span>
            <span>Q 600.00</span>
          </div>
        </div>
        <div className="flex min-w-0 flex-col border-l-[3px] border-ink">
          {[
            ["Supplier", "Transportes Rápidos"],
            ["Date", "18 Nov 2026"],
            ["Currency", "GTQ"],
            ["Total", "Q 600.00"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-2 border-b border-ink/30 px-4 py-2">
              <span className="text-ink/70">{k}</span>
              <span className="truncate font-medium">{v}</span>
            </div>
          ))}
          <div className="px-4 py-2">
            <Tag tone="ai">Read by AI, you can edit</Tag>
          </div>
          <div className="mt-auto border-t-[3px] border-ink px-4 py-3">
            <p className="font-medium">Matches 18 Nov, Q 600.00</p>
            <p className="text-xs text-ink/70">Same amount, same date, supplier in description</p>
            <div className="mt-3 flex gap-2">
              <span className="bg-blue px-3 py-1.5 font-medium text-white">Confirm</span>
              <span className="px-3 py-1.5 font-medium outline-1 -outline-offset-1 outline-ink">Not this one</span>
            </div>
          </div>
        </div>
      </div>
    </MockFrame>
  )
}

const flags = [
  { title: "We couldn't read row 4", where: "sample_actuals_nov.csv, column monto", reason: "“Q 1,2O0” has a letter O instead of a zero. Fix it and re-upload." },
  { title: "No bill attached", where: "Fletes Guate, 03 Nov, Q 1,200.00", reason: "Expenses over Q 1,000 should have a bill." },
  { title: "Not sure which transaction", where: "bill_ferreteria_la_paz.pdf", reason: "No transaction is a close match. Pick one or leave it unlinked." },
  { title: "No budget for Maintenance", where: "November 2026", reason: "Q 450 spent with no budget line." },
]

export function ReviewMock() {
  return (
    <MockFrame title="Review" meta="4 open">
      {flags.map((f, i) => (
        <div key={f.title} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-ink/30 px-4 py-2.5 last:border-b-0">
          <div className="min-w-0">
            <p className="font-medium">{f.title}</p>
            <p className="truncate text-xs text-ink/70">{f.where}</p>
            <p className="mt-0.5 text-ink/80">{f.reason}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Tag tone="rule" />
            {i === 0 && <span className="bg-blue px-2 py-0.5 text-[11px] leading-4 font-medium text-white">Open row</span>}
          </div>
        </div>
      ))}
    </MockFrame>
  )
}
