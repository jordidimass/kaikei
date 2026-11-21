import Link from "next/link"

import { Logo } from "@/components/logo"
import { site } from "@/lib/site"

const links = [
  { href: "#how", label: "How it works" },
  { href: "#mcp", label: "MCP" },
  { href: "#principles", label: "Principles" },
]

export function SiteHeader() {
  return (
    <header className="mx-auto flex h-16 w-full max-w-6xl shrink-0 items-center justify-between px-4 max-md:h-14 sm:px-8">
      <Link href="/" className="flex items-center gap-2" aria-label="Kaikei home">
        <Logo />
        <span className="font-mono text-[15px] font-medium tracking-[-0.03em]">kaikei</span>
      </Link>
      <nav className="flex items-center gap-6 max-sm:gap-4">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="type-ui text-muted-foreground transition-colors duration-150 hover:text-foreground max-sm:last:hidden"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="type-ui mx-auto flex h-14 w-full max-w-6xl shrink-0 items-center justify-between px-4 text-muted-foreground max-md:h-12 max-md:text-xs sm:px-8">
      <span>{site.version}</span>
      <span>
        会計 <span className="text-border">/</span> kaikei.io
      </span>
    </footer>
  )
}
