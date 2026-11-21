import { ogContentType, ogSize, renderOg } from "@/lib/og"

export const alt = "kaikei: every number opens down to the row"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOg({ title: "Every number opens down to the row.", note: "Accounting you can trace back to the row." })
}
