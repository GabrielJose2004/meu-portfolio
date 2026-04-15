'use client'

import type { CSSProperties } from 'react'

/* ── Configuração de animações ────────────────────────────────────
   Padrão reutilizado de HeroSection, ProjectsSection e ContactSection.
   ─────────────────────────────────────────────────────────────── */
const STAGGER_STEP_MS = 140

function stagger(index: number): CSSProperties {
  return { animationDelay: `${index * STAGGER_STEP_MS}ms` }
}

const FI = 'will-animate animate-fade-up' as const

/* ── Componente Principal ──────────────────────────────────────── */
export function AboutSection() {
  return (
    <section
      aria-label="Sobre mim"
      className={`
        relative flex flex-col gap-12
        px-5 py-20
        xs:px-6 xs:py-24
        sm:px-12 sm:py-28
        lg:px-20 lg:py-32
        xl:px-28
        2k:px-40 2k:py-40
      `}
    >
      {/* ── Container com border e estrutura wireframe ──────────────────── */}
      <div
        className={`
          border border-wire rounded-sm
          bg-void px-6 py-8
          sm:px-8 sm:py-10
          lg:px-10 lg:py-12
          ${FI}
        `}
        style={stagger(0)}
      >
        {/* Headline */}
        <div className="flex flex-col gap-4 mb-8 lg:mb-10">
          <p
            className={`font-mono text-[0.65rem] sm:text-xs tracking-[0.2em] text-ghost uppercase ${FI}`}
            style={stagger(1)}
            aria-label="Tipo de seção"
          >
            Jornada
          </p>
          <h2
            className={`
              font-mono font-light leading-[1.06] text-snow
              text-[clamp(1.5rem,5vw,2.5rem)]
              ${FI}
            `}
            style={stagger(2)}
          >
            Transição planejada.
          </h2>
        </div>

        {/* Conteúdo narrativo */}
        <div className={`flex flex-col gap-6 text-sm sm:text-[0.9375rem] leading-[1.7] ${FI}`} style={stagger(3)}>
          {/* Parágrafo 1: Antes */}
          <p className="text-silver">
            <span className="text-ghost font-mono uppercase tracking-[0.1em] text-xs block mb-2">
              Antes
            </span>
            Operador de Produção na Saint-Gobain Sekurit, responsável pela manufatura de vidros de segurança automotivos. Um
            ambiente de tolerância zero a erros, onde cada desvio de processo impactava a qualidade final. Certificado White
            Belt 5S — treinamento prático em Lean Manufacturing.
          </p>

          {/* Divisor visual */}
          <div className="h-px bg-wire my-2" aria-hidden="true" />

          {/* Parágrafo 2: Hoje */}
          <p className="text-silver">
            <span className="text-ghost font-mono uppercase tracking-[0.1em] text-xs block mb-2">
              Hoje
            </span>
            Graduando em Análise e Desenvolvimento de Sistemas na USCS, aplicando a disciplina do chão de fábrica na construção
            de software. A prova técnica dessa transição é a plataforma Music Connect, premiada como o melhor projeto de
            extensão do semestre.
          </p>

          {/* Divisor visual */}
          <div className="h-px bg-wire my-2" aria-hidden="true" />

          {/* Parágrafo 3: Oportunidade */}
          <p className="text-silver">
            <span className="text-ghost font-mono uppercase tracking-[0.1em] text-xs block mb-2">
              Realidade
            </span>
            Embora eu esteja em busca da minha primeira oportunidade corporativa na área, não escrevo código de rascunho. Meus
            projetos seguem padrões reais de produção: TypeScript em strict mode, validação de ponta a ponta e arquitetura
            limpa.
          </p>

          {/* Parágrafo 4: Síntese */}
          <p className="text-silver pt-2">
            <span className="text-signal font-mono uppercase tracking-[0.1em] text-xs block mb-2">
              Síntese
            </span>
            Isso não é apenas uma mudança de área. É engenharia com rigor industrial.
          </p>
        </div>
      </div>
    </section>
  )
}
