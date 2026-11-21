import Image from "next/image"

import { CtaButtons } from "@/components/cta-buttons"
import { LedgerFrame, LedgerRow } from "@/components/ledger"
import { SetupCard } from "@/components/setup-card"
import { Transcript } from "@/components/transcript"
import { copy } from "@/lib/copy"
import { cn } from "@/lib/utils"

export default function Home() {
  const { hero, how, assistants, principles, pricing, voice, start } = copy
  return (
    <LedgerFrame>
      <section className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_216px]">
        <aside className="hidden border-l-[3px] border-ink p-6 lg:order-2 lg:flex lg:flex-col lg:gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/kaikei-logo-primary.svg" alt="" width={168} height={168} className="h-auto w-full" />
          <p className="t-small font-semibold">{hero.aside}</p>
        </aside>
        <div className="reveal min-w-0 px-5 py-12 md:px-8 lg:order-1 lg:px-12 lg:py-20">
          <p className="t-label text-ink/75">{hero.label}</p>
          <h1 className="t-display mt-3 max-w-[48rem]">{hero.title}</h1>
          <p className="t-lead mt-6 max-w-[38rem] text-ink/80">{hero.lead}</p>
          <div className="mt-8">
            <CtaButtons />
          </div>
          <p className="t-small mt-4 text-ink/70">{copy.cta.note}</p>
        </div>
      </section>
      <div className="reveal border-t-[3px] border-ink p-3 [animation-delay:120ms] md:p-5 lg:p-8">
        <figure className="overflow-hidden border-[3px] border-ink bg-beige">
          <Image
            src="/product/dashboard.png"
            alt={hero.screenAlt}
            width={3226}
            height={1814}
            sizes="(min-width: 1296px) 1200px, 100vw"
            priority
            className="h-auto w-full"
          />
        </figure>
      </div>

      <LedgerRow id="como-funciona" n="02" title={how.side} note={how.note}>
        <h2 className="t-h2 max-w-[40rem]">{how.title}</h2>
        <p className="t-lead mt-4 max-w-[40rem] text-ink/80">{how.lead}</p>
        <ol className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-px border-[3px] border-ink bg-ink sm:grid-cols-2 xl:grid-cols-4">
          {how.steps.map((s, i) => (
            <li key={s.title} className="flex min-h-44 flex-col bg-beige p-5">
              <span className="font-display text-xl font-medium text-ink/60 tabular-nums">{`0${i + 1}`}</span>
              <p className="t-h3 mt-auto">{s.title}</p>
              <p className="t-small mt-2 text-ink/80">{s.body}</p>
            </li>
          ))}
        </ol>
      </LedgerRow>

      <LedgerRow id="asistentes" n="03" title={assistants.side} note={assistants.note}>
        <h2 className="t-h2 max-w-[40rem]">{assistants.title}</h2>
        <p className="t-lead mt-4 max-w-[44rem] text-ink/80">{assistants.lead}</p>
        <div className="mt-10 grid max-w-[52rem] grid-cols-[minmax(0,1fr)] gap-8">
          <SetupCard t={copy.setup} />
          <Transcript />
          <ul className="flex flex-wrap gap-2">
            {copy.mcp.tools.map((tool) => (
              <li key={tool} className="px-2 py-1 font-mono text-[12.5px] outline-1 -outline-offset-1 outline-ink">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </LedgerRow>

      <LedgerRow id="principios" n="04" title={principles.side} note={principles.note}>
        <h2 className="t-h2">{principles.title}</h2>
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2">
          {principles.items.map((v, i) => (
            <div key={v.title} className="relative min-h-48 p-6 outline-1 -outline-offset-1 outline-ink">
              <h3 className="t-h3">{v.title}</h3>
              <p className="t-body mt-3 max-w-[28rem] text-ink/80">{v.body}</p>
              {i === 0 && <span aria-hidden className="absolute right-0 bottom-0 size-10 bg-blue" />}
            </div>
          ))}
        </div>
      </LedgerRow>

      <LedgerRow id="precios" n="05" title={pricing.side} note={pricing.note}>
        <h2 className="t-h2">{pricing.title}</h2>
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-px border-[3px] border-ink bg-ink md:grid-cols-3">
          {pricing.plans.map((p) => {
            const featured = p.id === pricing.featured
            return (
              <div key={p.id} className={cn("flex flex-col gap-2 p-5", featured ? "bg-ink text-beige" : "bg-beige")}>
                <p className="t-sub">{p.name}</p>
                <p className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold">{p.price}</span>
                  <span className={cn("t-small", featured ? "text-beige/70" : "text-ink/70")}>{p.cadence}</span>
                </p>
                <p className={cn("t-small", featured ? "text-beige/80" : "text-ink/80")}>{p.blurb}</p>
              </div>
            )
          })}
        </div>
        <p className="t-small mt-4 text-ink/75">{copy.setup.free}</p>
      </LedgerRow>

      <LedgerRow id="palabras" n="06" title={voice.side} note={voice.note}>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <h2 className="t-h2">{voice.title}</h2>
            <p className="t-body mt-4 text-ink/80">{voice.body}</p>
            <p className="t-sub mt-6">{voice.quote}</p>
          </div>
          <table className="w-full border-collapse self-start text-left">
            <thead>
              <tr className="border-b border-ink">
                <th className="py-2 pr-6 font-semibold">{voice.say}</th>
                <th className="py-2 font-semibold">{voice.notSay}</th>
              </tr>
            </thead>
            <tbody>
              {voice.table.map(([say, not]) => (
                <tr key={say} className="border-b border-ink/40 align-top">
                  <td className="py-3 pr-6 font-medium">{say}</td>
                  <td className="py-3 text-ink/60">{not}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LedgerRow>

      <LedgerRow id="empezar" n="07" title={start.side} note={start.note}>
        <div className="max-w-[40rem]">
          <h2 className="t-h2">{start.title}</h2>
          <p className="t-lead mt-4 text-ink/80">{start.lead}</p>
          <div className="mt-8">
            <CtaButtons primary="blue" />
          </div>
        </div>
      </LedgerRow>
    </LedgerFrame>
  )
}
