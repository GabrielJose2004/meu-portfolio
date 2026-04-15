'use client'

import type { CSSProperties } from 'react'
import { TechBadge } from '../ui/TechBadge'

/* ── Helpers de animação ───────────────────────────────────────────
   Stagger declarativo: cada elemento recebe um índice (0-based)
   e calcula seu próprio delay. Nenhum número mágico espalhado no JSX.
   ─────────────────────────────────────────────────────────────── */
const STAGGER_STEP_MS = 140

function stagger(index: number): CSSProperties {
  return { animationDelay: `${index * STAGGER_STEP_MS}ms` }
}

/** Classes base para todo elemento que entra com fade-up */
const FI = 'will-animate animate-fade-up' as const

/* ── Tech Stack para display ────────────────────────────────────── */
const TECH_STACK = [
  'TypeScript',
  'Next.js',
  'React',
  'Tailwind CSS',
  'Node.js',
  'Java',
  'SQL',
  'PostgreSQL',
  'Zod',
  'Prisma',
]

/* ── Componente ────────────────────────────────────────────────── */
export function HeroSection() {
  return (
    <section
      aria-label="Introdução"
      className="
        relative flex min-h-svh flex-col justify-between
        px-5 py-10
        xs:px-6 xs:py-12
        sm:px-12 sm:py-14
        lg:px-20 lg:py-16
        xl:px-28
        2k:px-40 2k:py-20
        bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00ff87]/10 via-void to-void
      "
    >
      {/* ── Top bar ────────────────────────────────────────────── */}
      <div
        className={`flex items-center justify-between ${FI}`}
        style={stagger(0)}
      >
        {/* Identidade — namespace do portfólio */}
        <span
          className="font-mono text-xs tracking-[0.2em] text-ghost uppercase"
          aria-label="Gabriel José de Souza — portfólio"
        >
          GJS.DEV
        </span>

        {/* Indicador de disponibilidade */}
        <div
          className="flex items-center gap-2"
          aria-label="Status: disponível para oportunidades"
        >
          <span
            className="block h-1.5 w-1.5 rounded-full bg-signal animate-cursor-blink"
            aria-hidden="true"
          />
          <span className="font-mono text-xs text-ghost">disponível</span>
        </div>
      </div>

      {/* ── Conteúdo principal — embrulhado em Glassmorphism ───── */}
      <div className="flex flex-col gap-7 sm:gap-8 max-w-5xl 2k:max-w-7xl">
        {/* Container Glassmorphic */}
        <div
          className={`
            bg-white/5 border border-white/10
            rounded-xl backdrop-blur-sm
            p-6 sm:p-8 lg:p-10
            ${FI}
          `}
          style={stagger(1)}
        >
          {/* Stack de contexto — função e formação */}
          <p
            className="font-mono text-[0.65rem] sm:text-xs tracking-[0.18em] text-ghost uppercase"
            aria-label="Contexto: ADS, Saint-Gobain, White Belt 5S"
          >
            ADS · Saint-Gobain · White Belt 5S
          </p>

          {/* Headline — proposição central */}
          <h1
            className="
              mt-6 mb-6 sm:mb-8
              font-mono font-light leading-[1.06] text-snow
              text-[clamp(2rem,8vw,4.5rem)]
              2k:text-[5.5rem]
            "
          >
            <span className="block">Disciplina de chão de fábrica.</span>
            <span className="block">
              Código de produção.
              {/* Cursor piscante — identidade visual terminal */}
              <span
                className="
                  ml-[0.15em] inline-block
                  h-[0.78em] w-[0.055em]
                  bg-signal align-bottom
                  animate-cursor-blink
                "
                aria-hidden="true"
              />
            </span>
          </h1>

          {/* Corpo — expansão da tese */}
          <p
            className="
              max-w-md sm:max-w-lg
              font-sans text-sm sm:text-[0.9375rem] leading-[1.8]
              text-silver
            "
          >
            Operador que aprendeu que zero defeito não é meta — é método.
            <br />
            Esse princípio migrou para cada commit.
          </p>

          {/* CTAs */}
          <nav
            aria-label="Navegação primária da hero"
            className="flex flex-wrap items-center gap-4 sm:gap-5 mt-8"
          >
            {/* CTA primário — destaque com borda signal */}
            <a
              href="#projetos"
              className="
                group inline-flex items-center gap-2
                border border-signal
                px-5 sm:px-6 py-2.5 sm:py-3
                font-mono text-xs sm:text-sm text-signal
                transition-colors duration-150
                hover:bg-signal hover:text-void
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-signal
                focus-visible:ring-offset-2 focus-visible:ring-offset-void
              "
            >
              ver projetos
              <span
                aria-hidden="true"
                className="transition-transform duration-150 group-hover:translate-x-1"
              >
                →
              </span>
            </a>

            {/* CTA secundário — discreto, sem borda */}
            <a
              href="#sobre"
              className="
                font-mono text-xs sm:text-sm text-ghost
                underline-offset-4
                transition-colors duration-150
                hover:text-silver hover:underline
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-signal
                focus-visible:ring-offset-2 focus-visible:ring-offset-void
              "
            >
              sobre mim
            </a>

            {/* CTA terciário — contato */}
            <a
              href="#contato"
              className="
                font-mono text-xs sm:text-sm text-ghost
                underline-offset-4
                transition-colors duration-150
                hover:text-silver hover:underline
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-signal
                focus-visible:ring-offset-2 focus-visible:ring-offset-void
              "
            >
              contato
            </a>
          </nav>
        </div>

        {/* Tech Stack — Dashboard visual ────────────────────────── */}
        <div className={`flex flex-col gap-4 ${FI}`} style={stagger(2)}>
          <p className="font-mono text-xs tracking-[0.1em] text-ghost uppercase">
            Tecnologias
          </p>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map((tech, index) => (
              <TechBadge
                key={tech}
                label={tech}
                className={`${FI}`}
                style={stagger(index + 3)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Rodapé da seção — metadados de sistema ─────────────── */}
      <footer
        className={`flex items-center gap-5 ${FI}`}
        style={stagger(5)}
        aria-hidden="true" /* decorativo — sem valor semântico para SR */
      >
        {/* Linha com fade lateral */}
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-wire to-transparent" />

        {/* Versão e ano — referência de sistema */}
        <span className="font-mono text-[0.65rem] text-muted whitespace-nowrap">
          v1.0.0 · 2026
        </span>
      </footer>
    </section>
  )
}
