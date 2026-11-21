import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"

import { LedgerField } from "@/components/ledger-field"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { Toaster } from "@/components/ui/sonner"
import { site } from "@/lib/site"
import "./globals.css"

const sentient = localFont({
  variable: "--font-sans",
  src: [
    { path: "./fonts/Sentient-Variable.woff2", style: "normal", weight: "200 700" },
    { path: "./fonts/Sentient-VariableItalic.woff2", style: "italic", weight: "200 700" },
  ],
})

const jetbrains = localFont({
  variable: "--font-mono",
  src: [
    { path: "./fonts/JetBrainsMono-Regular.woff2", style: "normal", weight: "400" },
    { path: "./fonts/JetBrainsMono-Medium.woff2", style: "normal", weight: "500" },
  ],
})

const title = "Kaikei · Budget vs actual you can trace to the row"
const description =
  "Kaikei turns your CSV exports and PDF bills into budget vs actual and cash flow, where every figure opens down to the row and the receipt behind it. Your AI assistant reads the same numbers over MCP."

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s · Kaikei" },
  description,
  openGraph: {
    title,
    description: "Every number opens down to the row. Ask Grok, Claude or ChatGPT and get the same answer.",
    url: site.url,
    siteName: "Kaikei",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  themeColor: "#0f1514",
  colorScheme: "dark",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`dark ${sentient.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="relative isolate flex min-h-dvh flex-col overflow-x-clip">
        <LedgerField />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] overflow-hidden">
          <div className="absolute -top-48 left-1/2 h-[420px] w-[min(900px,120vw)] -translate-x-1/2 rounded-full bg-signal/12 blur-[120px]" />
        </div>
        <SiteHeader />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 sm:px-8">{children}</main>
        <SiteFooter />
        <Toaster theme="dark" position="bottom-center" />
      </body>
    </html>
  )
}
