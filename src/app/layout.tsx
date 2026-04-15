import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { MatrixBackground } from '@/components/ui/MatrixBackground'
import './globals.css'

/* ── Fontes ────────────────────────────────────────────────────────
   Inter: corpo de texto — legibilidade em qualquer tamanho
   Geist Mono: headlines e labels — identidade de terminal
   ─────────────────────────────────────────────────────────────── */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500'],
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  weight: ['300', '400', '500'],
})

/* ── Metadata ──────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Gabriel José | Engenharia de Software',
  description:
    'Portfólio profissional. Transição da manufatura industrial para o desenvolvimento de software. Disciplina de chão de fábrica. Código de produção.',
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

/* ── Layout Raiz ───────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`scroll-smooth ${inter.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-void text-snow font-sans antialiased min-h-screen">
        <MatrixBackground />
        {children}
      </body>
    </html>
  )
}
