import { ogContentType, ogSize, renderOg } from "@/lib/og"

export const alt = "Kaikei: every number opens down to the row"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOg({ eyebrow: "budget vs actual / bills / MCP", title: "Every number opens down to the row." })
}
