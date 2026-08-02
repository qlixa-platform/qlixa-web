export async function loadPDFScripts(): Promise<void> {
  const loadScript = (src: string) => new Promise<void>(resolve => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve()
    document.head.appendChild(s)
  })
  await Promise.all([
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'),
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'),
  ])
}

export async function fetchLogoAsDataUrl(): Promise<string> {
  try {
    const res = await fetch('/logos/logo-name-slogan_planets_black.svg')
    const svgText = await res.text()
    const svgBlob = new Blob([svgText], { type: 'image/svg+xml' })
    const svgUrl = URL.createObjectURL(svgBlob)
    return new Promise<string>((resolve) => {
      const img = new Image()
      img.onload = () => {
        // Точні пропорції логотипу з viewBox="0 0 479 143" — не покладаємось на
        // img.width/height (браузер ненадійно визначає натуральний розмір SVG
        // з width="100%"), рендеримо у 3x для чіткості на екрані з PPI.
        const LOGO_VB_WIDTH = 479
        const LOGO_VB_HEIGHT = 143
        const SCALE = 3
        const canvas = document.createElement('canvas')
        canvas.width = LOGO_VB_WIDTH * SCALE
        canvas.height = LOGO_VB_HEIGHT * SCALE
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const dataUrl = canvas.toDataURL('image/png')
        URL.revokeObjectURL(svgUrl)
        resolve(dataUrl)
      }
      img.onerror = () => {
        URL.revokeObjectURL(svgUrl)
        resolve('')
      }
      img.src = svgUrl
    })
  } catch {
    return ''
  }
}

export function getJsPDF() {
  return (window as any).jspdf?.jsPDF
}

export function getHtml2Canvas() {
  return (window as any).html2canvas
}
