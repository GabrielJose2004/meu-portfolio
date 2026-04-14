'use client'

import type { CSSProperties } from 'react'

/* ── Configuração de animações ───────────────────────────────────
   Mesmo padrão da HeroSection: stagger declarativo.
   ─────────────────────────────────────────────────────────────── */
const STAGGER_STEP_MS = 140

function stagger(index: number): CSSProperties {
  return { animationDelay: `${index * STAGGER_STEP_MS}ms` }
}

const FI = '' as const

/* ── Data: Projetos ────────────────────────────────────────────── */
interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  role: string
  context: string
  href?: string
}

const PROJECTS: Project[] = [
  {
    id: 'music-connect',
    title: 'Music Connect',
    description:
      'Plataforma full-stack de gerenciamento de eventos musicais. Interface moderna construída com React + Next.js, backend robusto em Java com SQL.',
    technologies: ['Java', 'JavaScript', 'React', 'Next.js', 'SQL'],
    role: 'Full-stack Developer',
    context: 'Projeto acadêmico — USCS',
  },
]

/* ── Componente ────────────────────────────────────────────────── */
export function ProjectsSection() {
  return (
    <section
      aria-label="Projetos"
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
      {/* ── Headline da seção ──────────────────────────────────── */}
      <div className="flex flex-col gap-3 max-w-2xl">
        <p
          className={`font-mono text-[0.65rem] sm:text-xs tracking-[0.2em] text-ghost uppercase ${FI}`}
          style={stagger(0)}
          aria-label="Tipo de seção"
        >
          Seleção de Projetos
        </p>
        <h2
          className={`
            font-mono font-light leading-[1.06] text-snow
            text-[clamp(1.5rem,5vw,3rem)]
            ${FI}
          `}
          style={stagger(1)}
        >
          Disciplina aplicada ao código.
        </h2>
      </div>

      {/* ── Grid de cards ──────────────────────────────────────── */}
      <div className="grid gap-6 sm:gap-8">
        {PROJECTS.map((project, index) => (
          <article
            key={project.id}
            className={`
              group relative border border-wire rounded-sm
              bg-surface px-6 py-7 sm:px-8 sm:py-9
              transition-all duration-200
              hover:border-signal hover:bg-void
              ${FI}
            `}
            style={stagger(index + 2)}
          >
            {/* ── Conteúdo do card ──────────────────────────────── */}
            <div className="flex flex-col gap-4">
              {/* Título + Contexto */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-mono font-light text-lg sm:text-xl text-snow leading-tight">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-ghost">
                    {project.context}
                  </p>
                </div>
                {/* Role pill */}
                <span className="shrink-0 font-mono text-xs px-3 py-1.5 border border-wire text-ghost rounded-sm group-hover:border-signal group-hover:text-signal transition-colors duration-200">
                  {project.role}
                </span>
              </div>

              {/* Descrição */}
              <p className="font-sans text-sm sm:text-[0.9375rem] leading-[1.7] text-silver max-w-3xl">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="
                      font-mono text-xs px-2.5 py-1
                      bg-wire text-ghost rounded-sm
                      group-hover:bg-signal group-hover:text-void
                      transition-colors duration-200
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Indicador de hover (linha accent) ──────────────── */}
            <div
              className="
                absolute inset-x-0 bottom-0 h-px bg-signal
                scale-x-0 group-hover:scale-x-100 origin-left
                transition-transform duration-300
              "
              aria-hidden="true"
            />
          </article>
        ))}
      </div>
    </section>
  )
}
