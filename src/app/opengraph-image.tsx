import { ogContentType, ogSize, renderOg } from "@/lib/og"

export const alt = "kaikei: cada cifra se abre hasta la fila"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOg({ title: "Cada cifra se abre hasta la fila.", note: "Contabilidad que puedes rastrear hasta la fila." })
}
