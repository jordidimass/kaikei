import Link from "next/link"

import { copy } from "@/lib/copy"
import { site } from "@/lib/site"

export function SiteHeader() {
  return (
    <header className="mx-auto flex h-20 w-full max-w-[1296px] items-center justify-between px-5 md:px-8 lg:px-12">
      <Link href="/" aria-label={copy.nav.home} className="shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/kaikei-wordmark-primary.svg" alt="kaikei" width={113} height={30} className="h-[30px] w-auto" />
      </Link>
      <nav className="flex items-center gap-8 max-lg:gap-6">
        {copy.nav.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-medium text-ink/75 transition-colors duration-150 hover:text-ink max-lg:hidden"
          >
            {l.label}
          </a>
        ))}
        <a href={`${site.app}/signup`} className="btn btn-secondary h-10 px-4 text-[15px]">
          {copy.nav.signup}
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
          <p className="t-small text-ink/75">{copy.footer.tagline}</p>
        </div>
        <p className="t-small text-ink/75">
          kaikei.io <span className="px-2 text-ink/40">/</span> {site.version}
        </p>
      </div>
    </footer>
  )
}
