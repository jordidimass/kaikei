import Link from "next/link"

import { site } from "@/lib/site"

const links = [
  { href: "#how", label: "How it works" },
  { href: "#assistants", label: "AI assistants" },
  { href: "#principles", label: "Principles" },
]

export function SiteHeader() {
  return (
    <header className="mx-auto flex h-20 w-full max-w-[1296px] items-center justify-between px-5 md:px-8 lg:px-12">
      <Link href="/" aria-label="kaikei home" className="shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/kaikei-wordmark-primary.svg" alt="kaikei" width={113} height={30} className="h-[30px] w-auto" />
      </Link>
      <nav className="flex items-center gap-8 max-md:gap-6">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-medium text-ink/75 transition-colors duration-150 hover:text-ink max-md:hidden"
          >
            {l.label}
          </a>
        ))}
        <a href={site.samples[1].href} download className="btn btn-secondary h-10 px-4 text-[15px]">
          Get the sample
        </a>
      </nav>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-[1296px] px-5 py-12 md:px-8 lg:px-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/kaikei-wordmark-primary.svg" alt="kaikei" width={90} height={24} className="h-6 w-auto self-start" />
          <p className="t-small text-ink/75">会計 is Japanese for accounting. If we can&apos;t trace it, we don&apos;t show it.</p>
        </div>
        <p className="t-small text-ink/75">
          kaikei.io <span className="px-2 text-ink/40">/</span> {site.version}
        </p>
      </div>
    </footer>
  )
}
