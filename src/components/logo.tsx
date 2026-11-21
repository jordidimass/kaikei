import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden>
      <rect x="2.5" y="3" width="19" height="18" rx="4" className="fill-foreground" />
      <path d="M7 8.5h10M7 12h6" className="stroke-background" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 15.5h4" className="stroke-signal" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16" cy="15.5" r="1.6" className="fill-signal" />
    </svg>
  )
}
