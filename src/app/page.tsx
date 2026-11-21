import { ArrowDownToLineIcon } from "lucide-react"

import { LedgerFrame, LedgerRow } from "@/components/ledger"
import { McpSection } from "@/components/mcp-section"
import { DrilldownMock } from "@/components/product-mocks"
import { ProductShowcase } from "@/components/product-showcase"
import { cn } from "@/lib/utils"

const values = [
  {
    title: "Traceable",
    body: "Every figure points to its source: the file, the row, the bill. Click a number and you land on the records that add up to it.",
    filled: true,
  },
  {
    title: "Exact",
    body: "Money is stored in whole cents with its currency, and each transaction counts once, however many times you upload an export.",
  },
  {
    title: "Owner-first",
    body: "We speak your language: over budget, bill attached, Deliveries. Never ledger jargon.",
  },
  {
    title: "Honest about uncertainty",
    body: "AI suggests, rules check, you approve. The figures are the same with AI on or off, and anything unsure waits for you.",
  },
]

const voice = [
  ["Over budget", "Negative variance"],
  ["Bill attached", "Supporting document linked to journal entry"],
  ["1 new, 2 already imported", "Import completed successfully"],
  ["We couldn't read row 4: the amount has a letter in it.", "Error: parse failure"],
  ["Suggested by AI, waiting for you", "Auto-categorised"],
]

function SampleButtons({ primary = "ink" }: { primary?: "ink" | "blue" }) {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href="/samples/sample_actuals_nov.csv"
        download
        className={cn("btn", primary === "blue" ? "btn-primary" : "btn-ink")}
      >
        <ArrowDownToLineIcon className="size-4" aria-hidden />
        Actuals CSV
      </a>
      <a href="/samples/sample_budget_nov.csv" download className="btn btn-secondary">
        <ArrowDownToLineIcon className="size-4" aria-hidden />
        Budget CSV
      </a>
    </div>
  )
}

export default function Home() {
  return (
    <LedgerFrame>
      <section className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_216px]">
        <aside className="hidden border-l-[3px] border-ink p-6 lg:order-2 lg:flex lg:flex-col lg:gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/kaikei-logo-primary.svg" alt="" width={168} height={168} className="h-auto w-full" />
          <p className="t-small font-semibold">会計: accounting. What came in, what went out and why.</p>
        </aside>
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-12 px-5 py-12 md:px-8 lg:order-1 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-center lg:px-12 lg:py-24">
          <div className="reveal">
            <p className="t-label text-ink/75">Budget vs actual for small businesses</p>
            <h1 className="t-display mt-3">Every number opens down to the row.</h1>
            <p className="t-lead mt-6 max-w-[34rem] text-ink/80">
              Upload the CSVs and PDF bills you already have. kaikei shows budget, actual and cash, and every figure opens
              to the exact row and bill behind it. Your AI assistant reads the same numbers.
            </p>
            <div className="mt-8">
              <SampleButtons />
            </div>
            <p className="t-small mt-4 text-ink/70">
              Sample files from a small delivery business in Guatemala, November 2026.
            </p>
          </div>
          <div className="reveal [animation-delay:120ms]">
            <DrilldownMock />
          </div>
        </div>
      </section>

      <LedgerRow id="how" n="02" title="How it works" note="From file to figure to row">
        <h2 className="t-h2 max-w-[40rem]">Why did this number change? Answer it in one place.</h2>
        <p className="t-lead mt-4 max-w-[40rem] text-ink/80">
          Your files stay exactly as you sent them. kaikei reads them, asks when it isn&apos;t sure, and keeps a line from
          every figure back to its source.
        </p>
        <ProductShowcase />
      </LedgerRow>

      <LedgerRow id="assistants" n="03" title="AI assistants" note="Read-only, over MCP">
        <McpSection />
      </LedgerRow>

      <LedgerRow id="principles" n="04" title="Principles" note="What we stand on">
        <h2 className="t-h2">Four principles, one system.</h2>
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="relative min-h-48 p-6 outline-1 -outline-offset-1 outline-ink">
              <h3 className="t-h3">{v.title}</h3>
              <p className="t-body mt-3 max-w-[28rem] text-ink/80">{v.body}</p>
              {v.filled && <span aria-hidden className="absolute right-0 bottom-0 size-10 bg-blue" />}
            </div>
          ))}
        </div>
      </LedgerRow>

      <LedgerRow id="voice" n="05" title="Plain words" note="How kaikei talks to you">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <h2 className="t-h2">Plain words. Exact numbers.</h2>
            <p className="t-body mt-4 text-ink/80">
              kaikei writes like a sharp, calm bookkeeper: what changed, by how much, and where it came from. Errors say how
              to fix them.
            </p>
            <p className="t-sub mt-6">&ldquo;If we can&apos;t trace it, we don&apos;t show it.&rdquo;</p>
          </div>
          <table className="w-full border-collapse self-start text-left">
            <thead>
              <tr className="border-b border-ink">
                <th className="py-2 pr-6 font-semibold">We say</th>
                <th className="py-2 font-semibold">We don&apos;t say</th>
              </tr>
            </thead>
            <tbody>
              {voice.map(([say, not]) => (
                <tr key={say} className="border-b border-ink/40 align-top">
                  <td className="py-3 pr-6 font-medium">{say}</td>
                  <td className="py-3 text-ink/60">{not}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LedgerRow>

      <LedgerRow id="try" n="06" title="Try it" note="Two files, one walkthrough">
        <div className="max-w-[40rem]">
          <h2 className="t-h2">Follow one upload from row to answer.</h2>
          <p className="t-lead mt-4 text-ink/80">
            The sample has a Q 3,000 Deliveries budget, Q 2,700 spent, and one new Q 600 expense that tips it over. Watch
            where it goes.
          </p>
          <div className="mt-8">
            <SampleButtons primary="blue" />
          </div>
        </div>
      </LedgerRow>
    </LedgerFrame>
  )
}
