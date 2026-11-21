import { ArrowRightIcon } from "lucide-react"

import { copy } from "@/lib/copy"
import { site } from "@/lib/site"

export function CtaButtons({ primary = "ink" }: { primary?: "ink" | "blue" }) {
  return (
    <div className="flex flex-wrap gap-3">
      <a href={`${site.app}/signup`} className={primary === "blue" ? "btn btn-primary" : "btn btn-ink"}>
        {copy.cta.primary} <ArrowRightIcon className="size-4" aria-hidden />
      </a>
      <a href="#precios" className="btn btn-secondary">
        {copy.cta.secondary}
      </a>
    </div>
  )
}
