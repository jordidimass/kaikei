import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

const beige = "#DCD1C2"
const ink = "#212927"
const blue = "#3544D5"

function asset(...p: string[]) {
  return readFile(join(process.cwd(), "assets", ...p))
}

async function svgDataUri(file: string) {
  const svg = await asset(file)
  return `data:image/svg+xml;base64,${svg.toString("base64")}`
}

export async function renderOg({ title, note }: { title: string; note: string }) {
  const [excon, synonym, logo] = await Promise.all([
    asset("fonts", "Excon-700.ttf"),
    asset("fonts", "Synonym-500.ttf"),
    svgDataUri("kaikei-logo-primary-on-beige.svg"),
  ])

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: beige }}>
        <div style={{ width: 600, height: 630, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={380} height={380} alt="" />
        </div>
        <div
          style={{
            width: 600,
            height: 630,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: ink,
            color: beige,
            padding: "56px 56px 64px",
          }}
        >
          <div style={{ display: "flex", fontFamily: "Synonym", fontSize: 22 }}>kaikei.io</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontFamily: "Excon", fontSize: 60, lineHeight: 1.05, letterSpacing: -1.8 }}>{title}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 40 }}>
              <div style={{ width: 36, height: 36, background: blue }} />
              <div style={{ display: "flex", fontFamily: "Synonym", fontSize: 22 }}>{note}</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Excon", data: excon, weight: 700, style: "normal" },
        { name: "Synonym", data: synonym, weight: 500, style: "normal" },
      ],
    }
  )
}

export async function renderAppIcon(size: number) {
  const icon = await svgDataUri("kaikei-app-icon-square.svg")
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={icon} width={size} height={size} alt="" />
    ),
    { width: size, height: size }
  )
}
