'use client'

import type { CSSProperties } from 'react'

/* ── Configuração de animações ───────────────────────────────────
   Mesmo padrão da HeroSection: stagger declarativo.
   ─────────────────────────────────────────────────────────────── */
const STAGGER_STEP_MS = 140

function stagger(index: number): CSSProperties {
  return { animationDelay: `${index * STAGGER_STEP_MS}ms` }
}

const FI = 'will-animate animate-fade-up' as const

/* ── Data: Projetos ────────────────────────────────────────────── */
interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  role: string
  context: string
  href?: string
  imageUrl?: string
}

const PROJECTS: Project[] = [
  {
    id: 'music-connect',
    title: 'Music Connect',
    description:
      'Plataforma Full Stack desenvolvida para conectar o ecossistema musical. Premiado como o melhor projeto de extensão do semestre na USCS.',
    technologies: ['React', 'Fastify', 'Prisma', 'PostgreSQL'],
    role: 'Full-stack Developer',
    context: 'Projeto acadêmico — USCS',
    href: 'https://github.com/Music-Connect',
    imageUrl: undefined, // Placeholder será renderizado
  },
  {
    id: 'calculadora-java',
    title: 'Calculadora Java',
    description:
      'Aplicação robusta focada em lógica de programação pura e conceitos estritos de Orientação a Objetos.',
    technologies: ['Java', 'OOP'],
    role: 'Developer',
    context: 'Projeto educacional',
    href: 'https://github.com/GabrielJose2004/Calculadora--Java.git',
    imageUrl: undefined, // Placeholder será renderizado
  },
]

/* ── Componente ────────────────────────────────────────────────── */
export function ProjectsSection() {
  return (
    <section
      id="projetos"
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

      {/* ── Grid de cards (Bento Box) ────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {PROJECTS.map((project, index) => (
          <a
            key={project.id}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full"
          >
            <article
              className={`
                relative h-full flex flex-col
                bg-white/5 border border-white/10
                rounded-xl overflow-hidden
                transition-all duration-300
                hover:border-signal hover:shadow-[0_0_15px_rgba(0,255,135,0.1)]
                cursor-pointer
                ${FI}
              `}
              style={stagger(index + 2)}
            >
              {/* ── Área de Mockup (Topo) ──────────────────────── */}
              <div className="relative h-48 sm:h-56 bg-surface overflow-hidden border-b border-white/5">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={`Mockup de ${project.title}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  /* Placeholder industrial */
                  <div className="w-full h-full flex items-center justify-center bg-[linear-gradient(135deg,_var(--tw-gradient-stops))] from-wire via-surface to-wire">
                    <div className="text-center">
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 border border-ghost/50 rounded-sm flex items-center justify-center">
                          <span className="font-mono text-lg text-ghost/50">&gt;</span>
                        </div>
                      </div>
                      <p className="font-mono text-xs text-ghost/50 tracking-[0.1em]">
                        {project.context}
                      </p>
                    </div>
                  </div>
                )}
                {/* Overlay hover sutil */}
                <div
                  className="
                    absolute inset-0 bg-signal/0 group-hover:bg-signal/5
                    transition-colors duration-300
                  "
                  aria-hidden="true"
                />
              </div>

              {/* ── Área de Conteúdo (Base) ────────────────────── */}
              <div className="flex-1 flex flex-col gap-4 p-6 sm:p-8">
                {/* Título + Contexto */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-mono font-light text-lg sm:text-xl text-snow leading-tight">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-ghost/70">
                      {project.context}
                    </p>
                  </div>
                  {/* Role pill */}
                  <span className="shrink-0 font-mono text-xs px-2.5 py-1 border border-wire text-ghost rounded-sm group-hover:border-signal group-hover:text-signal transition-colors duration-200 whitespace-nowrap">
                    {project.role}
                  </span>
                </div>

                {/* Descrição */}
                <p className="font-sans text-sm sm:text-[0.9375rem] leading-[1.6] text-silver">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="
                        font-mono text-xs px-2.5 py-1
                        bg-wire/50 text-ghost/80 rounded-sm
                        group-hover:bg-signal/20 group-hover:text-signal
                        transition-colors duration-200 border border-wire/30
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Spacer para empurrar link para baixo */}
                <div className="flex-1" />

                {/* Link indicator */}
                <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                  <span className="font-mono text-xs text-ghost/50 group-hover:text-signal transition-colors duration-200">
                    Abrir repositório
                  </span>
                  <span
                    className="text-signal/0 group-hover:text-signal transition-all duration-200"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              </div>
            </article>
          </a>
        ))}
      </div>
    </section>
  )
}
