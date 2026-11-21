import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"

import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { site } from "@/lib/site"
import "./globals.css"

const excon = localFont({
  variable: "--font-excon",
  src: [
    { path: "./fonts/Excon-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Excon-700.woff2", weight: "700", style: "normal" },
  ],
})

const synonym = localFont({
  variable: "--font-synonym",
  src: [
    { path: "./fonts/Synonym-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Synonym-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Synonym-600.woff2", weight: "600", style: "normal" },
  ],
})

const title = "kaikei · Every number opens down to the row"
const description =
  "kaikei turns your CSV exports and PDF bills into budget vs actual and cash flow. Every figure opens down to the row and the bill behind it, and your AI assistant reads the same numbers."

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s · kaikei" },
  description,
  openGraph: {
    title,
    description: "Accounting you can trace back to the row. Ask Grok, Claude or ChatGPT and get the same answer.",
    url: site.url,
    siteName: "kaikei",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  themeColor: "#dcd1c2",
  colorScheme: "light",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${excon.variable} ${synonym.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-[1296px] flex-1 px-5 md:px-8 lg:px-12">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
