import { ArrowDownIcon, ArrowDownToLineIcon, ArrowRightIcon } from "lucide-react"

import { McpSection } from "@/components/mcp-section"
import { clients } from "@/lib/clients"
import { ProductShowcase } from "@/components/product-showcase"
import { site } from "@/lib/site"

const principles = [
  {
    title: "AI proposes. Rules verify. You approve.",
    body: "AI reads files, suggests column mappings, extracts bill fields and phrases answers. It never writes a figure, accepts a record or confirms a link.",
  },
  {
    title: "Same numbers with AI on or off.",
    body: "Every figure comes from one deterministic function. Turn the AI off and the dashboard, the variance and the MCP answers don't move.",
  },
  {
    title: "Your files stay as you sent them.",
    body: "Each upload is stored unchanged with its SHA-256 hash, and every row is kept raw. Accepted records point back to the row they came from.",
  },
  {
    title: "Each transaction counts once.",
    body: "Re-upload the same file or a newer export that overlaps the last one and only the new rows are added. A bill adds proof, not an amount.",
  },
  {
    title: "Nothing uncertain slips through.",
    body: "Ambiguous mappings, low-confidence extractions and unsure matches wait in review. Rows that can't be read are flagged where they are.",
  },
  {
    title: "Money is exact.",
    body: "Amounts are stored as integer cents with a currency code. No floats, and no summing across currencies without a recorded rate.",
  },
]

function SampleLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      {site.samples.map((s, i) => (
        <a
          key={s.href}
          href={s.href}
          download
          className={
            i === 0
              ? "pressable type-ui flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-signal px-5 font-medium text-background hover:bg-signal/90"
              : "pressable type-ui flex h-11 flex-1 items-center justify-center gap-2 rounded-md border border-border bg-background/70 px-5 text-foreground backdrop-blur hover:border-foreground/25"
          }
        >
          <ArrowDownToLineIcon className="size-4" />
          {s.label}
        </a>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <>
      <section className="relative mx-auto flex min-h-[calc(100dvh-7.5rem)] w-full max-w-3xl flex-col items-center justify-center py-12 text-center max-md:min-h-[calc(100dvh-6.5rem)] max-md:py-[2dvh]">
        <p className="reveal type-ui text-muted-foreground">
          <span className="text-signal">●</span> budget vs actual <span className="text-border">/</span> bills{" "}
          <span className="text-border">/</span> MCP
        </p>
        <h1 className="reveal type-display mt-6 max-md:mt-[2.5dvh] max-md:text-[min(10.5vw,6.4dvh)] [animation-delay:60ms]">
          Every number opens down to the row.
        </h1>
        <p className="reveal type-body mt-6 max-w-[36rem] max-md:mt-[2.5dvh] max-md:text-[13px] max-md:leading-[1.6] [animation-delay:120ms]">
          Kaikei turns the CSVs and PDF bills your business already has into budget vs actual and cash flow. Click any
          figure to reach the exact row and receipt behind it. Your AI assistant reads the same numbers.
        </p>

        <div className="reveal mt-10 flex w-full max-w-md flex-col gap-2 max-md:mt-[4dvh] [animation-delay:180ms]">
          <SampleLinks className="flex gap-2 max-[400px]:flex-col" />
          <p className="type-small text-[12px]">Sample files from a small delivery business, Nov 2026, in GTQ.</p>
        </div>

        <div className="reveal mt-12 flex flex-col items-center gap-4 max-md:mt-[4.5dvh] max-md:gap-3 [animation-delay:240ms]">
          <p className="type-label text-muted-foreground">Ask from your assistant</p>
          <div className="flex flex-wrap justify-center gap-2">
            {clients.map((c) => (
              <a
                key={c.name}
                href="#mcp"
                className="pressable type-ui flex h-10 items-center gap-2.5 rounded-md border border-border bg-background/70 px-3.5 text-foreground backdrop-blur max-sm:h-9 max-sm:gap-1.5 max-sm:px-2.5 max-sm:text-xs [@media(hover:hover)]:hover:border-foreground/25"
              >
                <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
                  <path d={c.path} />
                </svg>
                {c.name}
              </a>
            ))}
          </div>
        </div>

        <a
          href="#how"
          className="type-label absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 text-muted-foreground transition-colors duration-150 hover:text-foreground max-md:hidden"
        >
          See how it works
          <ArrowDownIcon className="scroll-cue size-3.5" />
        </a>
      </section>

      <ProductShowcase />

      <McpSection />

      <section id="principles" className="scroll-mt-8 pb-28">
        <div className="fade-up max-w-xl">
          <p className="type-label flex items-center gap-2 text-muted-foreground">
            <span className="text-signal">07</span>
            Principles
          </p>
          <h2 className="type-title mt-4 text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)]">
            If we can&apos;t trace it, we don&apos;t show it.
          </h2>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.title} className="fade-up bg-background/90 p-6 backdrop-blur">
              <p className="type-label text-signal tabular-nums">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="type-heading mt-4 text-[15px]">{p.title}</h3>
              <p className="type-small mt-2">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto flex w-full max-w-md flex-col items-center gap-4 pb-24 text-center">
        <h2 className="type-title">Why did this number change?</h2>
        <p className="type-body">
          Grab the sample files and follow one upload from CSV row to dashboard to assistant.
        </p>
        <SampleLinks className="mt-2 flex w-full gap-2 max-[400px]:flex-col" />
        <a
          href="#how"
          className="type-ui mt-2 flex items-center gap-1.5 text-muted-foreground transition-colors duration-150 hover:text-foreground"
        >
          Walk through it again <ArrowRightIcon className="size-3.5" />
        </a>
      </section>
    </>
  )
}
