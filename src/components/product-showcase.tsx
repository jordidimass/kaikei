"use client"

import { useEffect, useRef, useState } from "react"

import {
  DrilldownMock,
  EvidenceMock,
  Frame,
  ImportMock,
  OverviewMock,
  ReviewMock,
} from "@/components/product-mocks"
import { cn } from "@/lib/utils"

type Step = {
  label: string
  title: string
  body: string
  path: string
  View: () => React.ReactNode
}

const steps: Step[] = [
  {
    label: "Import",
    title: "Drop in the CSV you already export.",
    body: "Kaikei proposes which column is the date, the amount and the category, with your own values next to each guess. You confirm. Rows it can't read become flags with a row and column, never silent drops.",
    path: "import",
    View: ImportMock,
  },
  {
    label: "What changed",
    title: "See what one upload moved.",
    body: "Budget, actual and variance by category, plus cash in and out. After each upload the figures it touched light up with before and after, so you don't have to hunt for the difference.",
    path: "overview",
    View: OverviewMock,
  },
  {
    label: "Drilldown",
    title: "Click a number. Get the rows.",
    body: "Every figure opens into the transactions that add up to it, and every transaction opens into the original CSV row, file name and row number. Re-uploading an overlapping export adds nothing twice.",
    path: "deliveries/2026-11",
    View: DrilldownMock,
  },
  {
    label: "Evidence",
    title: "Attach the bill. Count it once.",
    body: "Upload a PDF and see the page beside the supplier, date and total. Kaikei suggests the matching transaction and why. Only your confirmation links it, and a bill never adds to your spending.",
    path: "documents/doc_0193",
    View: EvidenceMock,
  },
  {
    label: "Review",
    title: "Exceptions first, not buried.",
    body: "Unreadable amounts, expenses without a bill, uncertain matches and spending with no budget land in one queue, each with the file, row and reason. Resolve or dismiss.",
    path: "review",
    View: ReviewMock,
  },
]

export function ProductShowcase() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )
    for (const el of refs.current) if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="how" className="scroll-mt-8 pb-24">
      <div className="tilt-in mx-auto max-w-4xl">
        <Frame path="overview">
          <div className="aspect-[16/10] max-sm:aspect-auto">
            <OverviewMock />
          </div>
        </Frame>
      </div>

      <div className="mt-24 grid grid-cols-[minmax(0,1fr)] gap-10 lg:mt-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] lg:gap-16">
        <ol className="flex flex-col">
          {steps.map((step, i) => (
            <li
              key={step.label}
              ref={(el) => {
                refs.current[i] = el
              }}
              data-index={i}
              className="flex flex-col justify-center py-10 lg:min-h-[72vh] lg:py-0"
            >
              <div className={cn("transition-opacity duration-300 ease-out", active === i ? "lg:opacity-100" : "lg:opacity-35")}>
                <p className="type-label flex items-center gap-2 text-muted-foreground">
                  <span className="text-signal tabular-nums">0{i + 1}</span>
                  {step.label}
                </p>
                <h2 className="type-title mt-4 text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)]">{step.title}</h2>
                <p className="type-body mt-4 max-w-sm">{step.body}</p>
              </div>
              <div className="fade-up mt-8 lg:hidden">
                <Frame path={step.path}>
                  <div className="aspect-[4/3] max-sm:aspect-auto max-sm:min-h-[24rem]">
                    <step.View />
                  </div>
                </Frame>
              </div>
            </li>
          ))}
        </ol>

        <div className="hidden lg:block">
          <div className="sticky top-[calc(50vh-17rem)]">
            <Frame path={steps[active].path}>
              <div className="relative aspect-[4/3]">
                {steps.map((step, i) => (
                  <div
                    key={step.label}
                    aria-hidden={active !== i}
                    className={cn(
                      "absolute inset-0 transition-[opacity,transform,filter] duration-500 ease-[var(--ease-out)]",
                      active === i ? "scale-100 opacity-100 blur-0" : "pointer-events-none scale-[0.985] opacity-0 blur-[4px]"
                    )}
                  >
                    <step.View />
                  </div>
                ))}
              </div>
            </Frame>
            <div className="mt-5 flex gap-1.5">
              {steps.map((step, i) => (
                <span
                  key={step.label}
                  className={cn("h-0.5 flex-1 rounded-full transition-colors duration-300", i <= active ? "bg-signal" : "bg-border")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
