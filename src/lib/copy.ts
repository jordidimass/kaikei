import { site } from "@/lib/site"

const MCP_URL = site.mcpUrl

export const copy = {
  meta: {
    title: "kaikei · Cada cifra se abre hasta la fila",
    description:
      "kaikei consolida el presupuesto de cada empresa en una moneda de reporte, elimina las operaciones entre empresas, marca cada problema antes de que llegue a un total y abre cada cifra hasta la celda de origen.",
    ogNote: "Contabilidad que puedes rastrear hasta la fila.",
  },
  nav: {
    links: [
      { href: "#como-funciona", label: "Cómo funciona" },
      { href: "#asistentes", label: "Asistentes de IA" },
      { href: "#principios", label: "Principios" },
      { href: "#precios", label: "Precios" },
    ],
    signup: "Crear cuenta gratis",
    home: "Inicio de kaikei",
  },
  cta: { primary: "Crear una cuenta gratis", secondary: "Ver precios", note: "Gratis para un grupo. Sin tarjeta." },
  footer: { tagline: "会計 significa contabilidad en japonés. Si no podemos rastrearlo, no lo mostramos." },
  hero: {
    label: "Consolidación de presupuestos para grupos de empresas",
    aside: "会計: contabilidad. Lo que planeó cada empresa y lo que suma el grupo.",
    title: "Cada cifra se abre hasta la fila.",
    lead: "Sube el presupuesto de cada empresa tal como llega. kaikei convierte cada moneda al tipo del grupo, elimina las operaciones entre empresas y abre cualquier cifra hasta la celda de origen.",
    screenAlt: "Panel de kaikei: estado de resultados consolidado del Grupo AG para el año fiscal 2027",
  },
  how: {
    side: "Cómo funciona",
    note: "Del archivo a la cifra de grupo",
    title: "¿Por qué cambió la cifra del grupo? Respóndelo en un solo lugar.",
    lead: "Tus archivos se quedan tal como los enviaste. kaikei los lee, pregunta cuando no está seguro y mantiene una línea desde cada cifra hasta su celda.",
    steps: [
      { title: "Subir", body: "El archivo de cada empresa, en el formato que llegue. Originales guardados, celda por celda." },
      { title: "Revisar", body: "Cada problema se convierte en un hallazgo con la regla, el archivo y la celda." },
      { title: "Eliminar", body: "Las operaciones entre empresas se emparejan y se eliminan con asientos cuadrados." },
      { title: "Publicar", body: "Un run inmutable. Cada cifra se abre hasta la celda de origen." },
    ],
  },
  assistants: {
    side: "Asistentes de IA",
    note: "Solo lectura, por MCP, gratis en todos los planes",
    title: "Pregúntale a tu asistente. Obtén la misma cifra.",
    lead: "Cada grupo tiene una dirección MCP de solo lectura, incluida en todos los planes. Claude, ChatGPT, Cursor o Grok leen el mismo run publicado que el panel y responden con la cifra, el periodo, la moneda y el rastro hasta la celda.",
  },
  setup: {
    title: "Configura kaikei con tu asistente",
    copy: "Copiar el prompt de configuración",
    copied: "Copiado",
    pasteIn: "Pega esto en",
    free: "El conector MCP es gratis en todos los planes.",
    token: "Tu token está en kaikei, en Configuración del grupo → Conectar IA.",
    steps: {
      claude: "En Claude: Configuración → Conectores → Añadir conector personalizado, pega la dirección y luego este prompt.",
      chatgpt: "En ChatGPT: Configuración → Conectores → Crear, pega la dirección y luego este prompt.",
      cursor: "En Cursor: pega este prompt en el agente y él añade kaikei a tu mcp.json.",
      grok: "En Grok: añade la dirección como servidor MCP remoto y luego pega este prompt.",
    },
    chatPrompt: `Ya conecté kaikei como servidor MCP remoto de solo lectura (${MCP_URL}).
1. Llama a get_run_status y dime qué run está publicado, de qué grupo y periodo.
2. A partir de ahora responde mis preguntas de presupuesto solo con cifras que devuelvan las herramientas de kaikei (get_facts, get_findings, get_reconciliations, get_fact_lineage).
3. En cada respuesta indica el run, el periodo, la moneda y la celda de origen.
4. Nunca calcules, estimes ni redondees cifras por tu cuenta. Si algo no está en kaikei, dímelo.`,
    cursorPrompt: `Añade kaikei como servidor MCP remoto de solo lectura en ~/.cursor/mcp.json (crea el archivo si no existe, no borres otros servidores):
{ "mcpServers": { "kaikei": { "url": "${MCP_URL}" } } }
Luego llama a get_run_status y dime qué run está publicado.
Desde ahí responde solo con cifras que devuelvan las herramientas de kaikei, indica el run, la moneda y la celda de origen, y nunca calcules cifras por tu cuenta.`,
  },
  mcp: {
    client: "Claude, conectado a kaikei",
    readOnly: "solo lectura",
    asked: "Preguntaste",
    question: "¿Cuánto vendió el grupo en enero de 2027 después de eliminar las ventas entre empresas?",
    answered: "Claude respondió",
    answer:
      "En enero de 2027 el Grupo AG vendió USD 1,374,143.23 consolidados. Las empresas reportaron USD 1,508,901.29 y se eliminaron USD 134,758.06 de ventas y cargos entre empresas del grupo.",
    source: "Origen",
    sources: ["run #3, publicado", "01_AG_Distribucion_GT.csv!D2", "ELIM-0001, IC-ELIM-01"],
    run: "#3, el mismo que la app",
    calls: [
      { name: "get_facts", args: "account: REVENUE, period: 2027-01", result: "USD, run #3" },
      { name: "get_fact_lineage", args: "fact: REVENUE 2027-01", result: "6 / 6" },
    ],
    tools: ["get_run_status", "get_facts", "get_findings", "get_reconciliations", "get_fact_lineage"],
  },
  principles: {
    side: "Principios",
    note: "En lo que nos apoyamos",
    title: "Cuatro principios, un sistema.",
    items: [
      { title: "Rastreable", body: "Cada cifra de grupo se abre a sus aportes, el tipo usado, el asiento de eliminación y la celda de donde salió." },
      { title: "Exacto", body: "El dinero es un decimal con su moneda, nunca un flotante. Las monedas solo se suman tras convertirlas a un tipo registrado." },
      { title: "Nada en silencio", body: "Ni filas perdidas, ni celdas reparadas, ni vacíos leídos como cero, ni eliminaciones a ojo. Los problemas son hallazgos que tú decides." },
      { title: "Reproducible", body: "Los runs son inmutables. Los mismos archivos, mapeos y tipos dan la misma huella y cifras. Una corrección crea un run nuevo." },
    ],
  },
  pricing: {
    side: "Precios",
    note: "Empieza gratis, crece con él",
    title: "Empieza gratis. Paga cuando el grupo crezca.",
    featured: "group",
    plans: [
      { id: "free", name: "Gratis", price: "$0", cadence: "para siempre", blurb: "Un grupo pequeño, consolidado de punta a punta." },
      { id: "group", name: "Grupo", price: "$20", cadence: "al mes", blurb: "Para el equipo de finanzas que cierra cada mes." },
      { id: "holding", name: "Holding", price: "A medida", cadence: "anual", blurb: "Varios grupos, auditoría y soporte dedicado." },
    ],
  },
  voice: {
    side: "Palabras claras",
    note: "Cómo te habla kaikei",
    title: "Palabras claras. Cifras exactas.",
    body: "kaikei escribe como un contralor sereno y preciso: qué está mal, por cuánto y de dónde viene. Cada hallazgo dice cómo corregirlo.",
    quote: "“Si no podemos rastrearlo, no lo mostramos.”",
    say: "Decimos",
    notSay: "No decimos",
    table: [
      ["El balance de AG España no cuadra por € 50,000.", "Excepción de integridad VAL-023"],
      ["Distribución compró Q 472,500; Manufactura vendió Q 427,500.", "Variación de conciliación IC detectada"],
      ["3 filas retenidas: no pudimos leerlas.", "Filas omitidas"],
      ["Convertido a 7.75 GTQ por USD, promedio del grupo 2027.", "FX aplicado"],
      ["Mapeo sugerido, esperando tu aprobación.", "Auto-mapeado"],
    ],
  },
  start: {
    side: "Empezar",
    note: "Seis archivos, una cifra",
    title: "Sube los archivos. Obtén una cifra que puedes defender.",
    lead: "Crea una cuenta, nombra tu grupo y sube el primer archivo. Cada cifra que veas se abrirá hasta la celda de donde salió.",
  },
}
