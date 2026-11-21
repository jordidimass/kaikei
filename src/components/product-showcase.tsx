"use client"

import { useEffect, useRef, useState } from "react"

import { EvidenceMock, ImportMock, OverviewMock, ReviewMock } from "@/components/product-mocks"
import { cn } from "@/lib/utils"

const steps = [
  {
    title: "Upload the CSV you already export.",
    body: "kaikei suggests which column is the date, the amount and the category, with your own values beside each guess. You confirm. Rows it can't read are listed with the row and the reason, never dropped.",
    View: ImportMock,
  },
  {
    title: "See what one upload changed.",
    body: "Budget, actual and variance by category, plus cash in and out. After each upload, the figures it moved show before and after. Re-uploading an overlapping export counts nothing twice.",
    View: OverviewMock,
  },
  {
    title: "Attach the bill. Count it once.",
    body: "Upload a PDF and see the page beside the supplier, date and total. kaikei suggests the matching transaction and says why. Only your confirmation links it, and a bill never adds to spending.",
    View: EvidenceMock,
  },
  {
    title: "Review what needs you.",
    body: "Rows we couldn't read, expenses without a bill, unsure matches and spending with no budget wait in one list, each with the file, row and reason.",
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
    <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
      <ol className="flex flex-col">
        {steps.map((step, i) => (
          <li
            key={step.title}
            ref={(el) => {
              refs.current[i] = el
            }}
            data-index={i}
            className="flex flex-col justify-center border-t border-ink py-8 lg:min-h-[60vh] lg:py-0"
          >
            <div className={cn("transition-opacity duration-300", active === i ? "lg:opacity-100" : "lg:opacity-40")}>
              <p className="t-label text-ink/70 tabular-nums">Step {i + 1} of {steps.length}</p>
              <h3 className="t-h3 mt-2">{step.title}</h3>
              <p className="t-body mt-3 max-w-[30rem] text-ink/80">{step.body}</p>
            </div>
            <div className="mt-6 lg:hidden">
              <step.View />
            </div>
          </li>
        ))}
      </ol>

      <div className="hidden lg:block">
        <div className="sticky top-[calc(50vh-12.5rem)]">
          <div className="relative h-[25rem]">
            {steps.map((step, i) => (
              <div
                key={step.title}
                aria-hidden={active !== i}
                className={cn(
                  "absolute inset-0 flex flex-col transition-[opacity,transform] duration-500 ease-[var(--ease-out)] [&>*]:flex-1",
                  active === i ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
                )}
              >
                <step.View />
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {steps.map((step, i) => (
              <span key={step.title} className={cn("h-[3px] transition-colors duration-300", i <= active ? "bg-ink" : "bg-ink/20")} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
