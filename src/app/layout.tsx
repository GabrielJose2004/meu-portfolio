import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
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
  title: {
    default: 'Gabriel José de Souza',
    template: '%s — Gabriel José de Souza',
  },
  description:
    'Portfólio de Gabriel José de Souza. Estudante de ADS, Operador de Produção na Saint-Gobain. Disciplina industrial aplicada ao desenvolvimento de software.',
  openGraph: {
    title: 'Gabriel José de Souza',
    description: 'Disciplina de chão de fábrica. Código de produção.',
    type: 'website',
    locale: 'pt_BR',
  },
  robots: {
    index: true,
    follow: true,
  },
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
      className={`${inter.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-void text-snow font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
