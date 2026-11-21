import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"

import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { copy } from "@/lib/copy"
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

const title = copy.meta.title
const description = copy.meta.description

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s · kaikei" },
  description,
  openGraph: {
    title,
    description: copy.meta.ogNote,
    url: site.url,
    siteName: "kaikei",
    type: "website",
    locale: "es_GT",
  },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  themeColor: "#dcd1c2",
  colorScheme: "light",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${excon.variable} ${synonym.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-[1296px] flex-1 px-5 md:px-8 lg:px-12">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
