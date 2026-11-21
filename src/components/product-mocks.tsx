import { CheckIcon, FileTextIcon, PaperclipIcon, TriangleAlertIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export function Frame({ children, className, path = "overview" }: { children: React.ReactNode; className?: string; path?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-[0_40px_120px_-50px_oklch(0.74_0.14_162/0.4)]",
        className
      )}
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-border px-3">
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="type-ui ml-3 truncate text-[11px] text-muted-foreground">kaikei.io/app/{path}</span>
      </div>
      {children}
    </div>
  )
}

type Tone = "ai" | "rule" | "you"

const toneClass: Record<Tone, string> = {
  ai: "border-amber/30 text-amber",
  rule: "border-over/30 text-over",
  you: "border-signal/30 text-signal",
}

const toneLabel: Record<Tone, string> = {
  ai: "Suggested by AI",
  rule: "Flagged by rule",
  you: "Confirmed by you",
}

export function Badge({ tone, children }: { tone: Tone; children?: React.ReactNode }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center rounded border px-1.5 py-0.5 text-[10px] leading-none", toneClass[tone])}>
      {children ?? toneLabel[tone]}
    </span>
  )
}

function Head({ title, meta }: { title: string; meta?: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border px-5 py-3.5">
      <p className="type-heading truncate">{title}</p>
      {meta && <div className="type-ui shrink-0 text-[11px] text-muted-foreground">{meta}</div>}
    </div>
  )
}

const shell = "flex h-full flex-col font-mono text-[12px] leading-snug"

export function ImportMock() {
  const rows = [
    { col: "fecha", sample: "2026-11-18", field: "Date", tone: null },
    { col: "descripcion", sample: "Transportes Rapidos - entrega…", field: "Description", tone: null },
    { col: "categoria", sample: "Entregas", field: "Category → Deliveries", tone: "ai" as const },
    { col: "monto", sample: "-600.00", field: "Amount", tone: null },
    { col: "moneda", sample: "GTQ", field: "Currency", tone: null },
  ]
  return (
    <div className={shell}>
      <Head title="Import · sample_actuals_nov.csv" meta="sha256 4be1…9c0a" />
      <div className="flex items-center gap-2 px-5 pt-4 text-[11px] text-muted-foreground">
        Type
        <span className="rounded border border-signal/40 bg-signal/10 px-2 py-0.5 text-signal">Actual transactions</span>
        <span className="rounded border border-border px-2 py-0.5">Budget</span>
      </div>
      <div className="mx-5 mt-4 overflow-hidden rounded-lg border border-border">
        <div className="grid grid-cols-[1fr_1.5fr_1.4fr] gap-3 border-b border-border bg-background/40 px-3 py-2 text-[10px] tracking-wider text-muted-foreground uppercase">
          <span>Column</span>
          <span>Your value</span>
          <span>Field</span>
        </div>
        {rows.map((r) => (
          <div key={r.col} className="grid grid-cols-[1fr_1.5fr_1.4fr] items-center gap-3 border-b border-border px-3 py-1.5 last:border-0">
            <span className="text-muted-foreground">{r.col}</span>
            <span className="truncate text-foreground/85">{r.sample}</span>
            <span className="flex min-w-0 items-center gap-2">
              <span className="truncate">{r.field}</span>
              {r.tone && <Badge tone={r.tone}>AI</Badge>}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-auto grid grid-cols-3 gap-2 p-5">
        {[
          { n: "1", label: "new", cls: "text-signal" },
          { n: "2", label: "already imported", cls: "text-muted-foreground" },
          { n: "1", label: "flagged", cls: "text-over" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-background/40 px-3 py-2.5">
            <p className={cn("text-xl font-medium", s.cls)}>{s.n}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const overview = [
  { cat: "Deliveries", budget: "3,000", actual: "3,300", was: "2,700", variance: "+300", over: true },
  { cat: "Rent", budget: "4,500", actual: "4,500", variance: "0" },
  { cat: "Payroll", budget: "18,000", actual: "17,850", variance: "−150" },
  { cat: "Supplies", budget: "6,200", actual: "5,980", variance: "−220" },
  { cat: "Advertising", budget: "1,500", actual: "1,240", variance: "−260" },
]

export function OverviewMock() {
  return (
    <div className={shell}>
      <Head title="Overview · Nov 2026" meta="GTQ · as_of imp_0412" />
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 p-5 sm:grid-cols-[1.6fr_1fr]">
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr] gap-2 border-b border-border bg-background/40 px-3 py-2 text-[10px] tracking-wider text-muted-foreground uppercase">
            <span>Category</span>
            <span className="text-right">Budget</span>
            <span className="text-right">Actual</span>
            <span className="text-right">Var.</span>
          </div>
          {overview.map((r) => (
            <div
              key={r.cat}
              className={cn(
                "grid grid-cols-[1.3fr_1fr_1fr_1fr] items-center gap-2 border-b border-border px-3 py-2 last:border-0",
                r.over && "bg-over/[0.06]"
              )}
            >
              <span className="truncate">{r.cat}</span>
              <span className="text-right text-muted-foreground">{r.budget}</span>
              <span className="text-right underline decoration-border underline-offset-4">{r.actual}</span>
              <span className={cn("text-right", r.over ? "text-over" : "text-muted-foreground")}>{r.variance}</span>
            </div>
          ))}
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          <div className="rounded-lg border border-signal/30 bg-signal/[0.06] p-3">
            <p className="text-[10px] tracking-wider text-signal uppercase">What changed</p>
            <p className="mt-2 text-[11px] text-muted-foreground">Deliveries · actual</p>
            <p className="mt-0.5">
              <span className="text-muted-foreground line-through decoration-muted-foreground/60">Q2,700</span>{" "}
              <span className="text-muted-foreground">→</span> Q3,300
            </p>
            <p className="mt-2 text-[11px] text-muted-foreground">Deliveries · variance</p>
            <p className="mt-0.5">
              <span className="text-muted-foreground">−Q300</span> <span className="text-muted-foreground">→</span>{" "}
              <span className="text-over">+Q300 over</span>
            </p>
          </div>
          <div className="rounded-lg border border-border p-3 max-sm:hidden">
            <p className="text-[10px] tracking-wider text-muted-foreground uppercase">Cash · Nov</p>
            <div className="mt-2.5 space-y-2 text-[11px]">
              <div>
                <div className="flex justify-between"><span>In</span><span>Q41,200</span></div>
                <div className="mt-1 h-1.5 rounded-full bg-signal/70" />
              </div>
              <div>
                <div className="flex justify-between"><span>Out</span><span>Q32,870</span></div>
                <div className="mt-1 h-1.5 w-[80%] rounded-full bg-foreground/25" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const deliveries = [
  { date: "2026-11-18", desc: "Transportes Rapidos - entrega lote 42", amount: "600.00", fresh: true },
  { date: "2026-11-12", desc: "Fletes Guate - ruta Mixco", amount: "900.00", bill: true },
  { date: "2026-11-07", desc: "Mensajeria Express - envios zona 10", amount: "600.00", bill: true },
  { date: "2026-11-03", desc: "Fletes Guate - ruta centro", amount: "1,200.00" },
]

export function DrilldownMock() {
  return (
    <div className={shell}>
      <Head title="Deliveries · actual · Nov 2026" meta="4 transactions" />
      <div className="px-5 pt-4">
        {deliveries.map((t) => (
          <div
            key={t.date}
            className={cn(
              "grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 border-b border-border py-2",
              t.fresh && "-mx-2 rounded-md border-transparent bg-signal/[0.07] px-2"
            )}
          >
            <span className="text-muted-foreground">{t.date.slice(5)}</span>
            <span className="truncate">{t.desc}</span>
            <span className="w-4 text-muted-foreground">{t.bill && <PaperclipIcon className="size-3.5" />}</span>
            <span className="text-right">Q{t.amount}</span>
          </div>
        ))}
        <div className="flex justify-between py-2.5 text-[12px]">
          <span className="text-muted-foreground">Sum = figure</span>
          <span className="font-medium">Q3,300.00</span>
        </div>
      </div>
      <div className="mx-5 mt-auto mb-5 rounded-lg border border-border bg-background/50 p-3">
        <p className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Original row · sample_actuals_nov.csv · row 3</span>
          <span className="text-signal">raw</span>
        </p>
        <pre className="mt-2 overflow-hidden text-[11px] leading-relaxed text-foreground/85">
{`{ "fecha": "2026-11-18",
  "descripcion": "Transportes Rapidos - entrega lote 42",
  "categoria": "Entregas", "monto": "-600.00", "moneda": "GTQ" }`}
        </pre>
      </div>
    </div>
  )
}

export function EvidenceMock() {
  return (
    <div className={shell}>
      <Head title="Bill · bill_transportes_rapidos.pdf" meta="page 1 / 1" />
      <div className="grid min-h-0 flex-1 grid-cols-[0.9fr_1.1fr] gap-4 p-5">
        <div className="flex flex-col rounded-md bg-[oklch(0.95_0.008_90)] p-4 text-[10px] text-[oklch(0.25_0.01_185)]">
          <p className="text-[12px] font-medium">Transportes Rápidos, S.A.</p>
          <p className="mt-0.5 opacity-60">NIT 8812347-5 · Guatemala</p>
          <div className="mt-4 flex justify-between opacity-70">
            <span>Factura</span>
            <span>18/11/2026</span>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="h-1 rounded bg-current opacity-15" />
            <div className="h-1 w-4/5 rounded bg-current opacity-15" />
            <div className="h-1 w-3/5 rounded bg-current opacity-15" />
          </div>
          <div className="mt-auto flex justify-between border-t border-current/15 pt-2 text-[12px] font-medium">
            <span>Total</span>
            <span className="rounded bg-[oklch(0.74_0.14_162/0.35)] px-1">Q600.00</span>
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          <div className="space-y-1.5">
            {[
              ["Supplier", "Transportes Rápidos"],
              ["Date", "2026-11-18"],
              ["Currency", "GTQ"],
              ["Total", "600.00"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-2 rounded border border-border px-2.5 py-1.5">
                <span className="text-[11px] text-muted-foreground">{k}</span>
                <span className="truncate">{v}</span>
              </div>
            ))}
            <div className="pt-0.5">
              <Badge tone="ai">Extracted by AI · editable</Badge>
            </div>
          </div>
          <div className="mt-auto rounded-lg border border-signal/30 bg-signal/[0.06] p-3">
            <p className="text-[10px] tracking-wider text-signal uppercase">Suggested match</p>
            <p className="mt-1.5 truncate">Q600.00 · Nov 18 · Transportes Rapidos…</p>
            <p className="mt-1 text-[10px] text-muted-foreground">amount exact · same date · supplier in description</p>
            <div className="mt-2.5 flex gap-1.5">
              <span className="flex items-center gap-1 rounded bg-signal px-2 py-1 text-[11px] text-background">
                <CheckIcon className="size-3" /> Confirm
              </span>
              <span className="rounded border border-border px-2 py-1 text-[11px] text-muted-foreground">Not this one</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const flags = [
  { rule: "parse_error", where: "sample_actuals_nov.csv · row 4 · monto", reason: '"Q 1,2O0" is not a number. Row not counted.' },
  { rule: "missing_evidence", where: "Fletes Guate · Q1,200.00 · Nov 3", reason: "Expense over Q1,000 with no bill attached." },
  { rule: "uncertain_match", where: "bill_ferreteria_la_paz.pdf", reason: "Best candidate scored 0.41. Pick one or leave unlinked." },
  { rule: "budget_missing", where: "Maintenance · Nov 2026", reason: "Q450 spent, no budget line for the period." },
]

export function ReviewMock() {
  return (
    <div className={shell}>
      <Head title="Review queue" meta="4 open" />
      <div className="flex flex-col gap-1.5 px-5 py-4">
        {flags.map((f) => (
          <div key={f.rule} className="rounded-lg border border-border bg-background/40 px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-2">
                <TriangleAlertIcon className="size-3.5 shrink-0 text-over" />
                <span className="truncate">{f.rule}</span>
              </span>
              <Badge tone="rule" />
            </div>
            <p className="mt-1.5 flex items-center gap-1.5 truncate text-[11px] text-muted-foreground">
              <FileTextIcon className="size-3 shrink-0" />
              {f.where}
            </p>
            <p className="mt-1 text-[11px] text-foreground/80">{f.reason}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
