"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type RowProps = {
  id?: string
  n: string
  title: string
  note: string
  aside?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function LedgerRow({ id, n, title, note, aside, children, className }: RowProps) {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: "-50% 0px -50% 0px",
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id={id}
      className="grid scroll-mt-6 grid-cols-[minmax(0,1fr)] border-t-[3px] border-ink first:border-t-0 lg:grid-cols-[minmax(0,1fr)_216px]"
    >
      <aside className="flex items-stretch justify-between border-b border-ink lg:order-2 lg:flex-col lg:border-b-0 lg:border-l-[3px]">
        <div className="flex flex-col gap-2 px-5 py-4 lg:sticky lg:top-0 lg:p-6">
          <p className="t-h3 max-lg:text-xl">{title}</p>
          <p className="t-small font-semibold max-lg:hidden">{note}</p>
          {aside && <div className="mt-4 max-lg:hidden">{aside}</div>}
        </div>
        <div
          aria-hidden
          className={cn(
            "flex w-16 shrink-0 items-end justify-end border-l border-ink p-3 transition-colors duration-500 ease-[var(--ease-out)] lg:aspect-square lg:w-auto lg:border-t-[3px] lg:border-l-0 lg:p-6",
            active ? "bg-blue text-beige" : "text-ink"
          )}
        >
          <span className="font-display text-xl font-medium tabular-nums lg:text-2xl">{n}</span>
        </div>
      </aside>
      <div className={cn("min-w-0 px-5 py-12 md:px-8 lg:order-1 lg:px-12 lg:py-16", className)}>{children}</div>
    </section>
  )
}

export function LedgerFrame({ children }: { children: React.ReactNode }) {
  return <div className="border-[3px] border-ink">{children}</div>
}
