'use client'

import { useState, type CSSProperties } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { submitContact } from '@/app/actions/contact'
import type { ContactFormInput } from '@/app/actions/contact'

/* ── Schema de validação (CLIENT-SIDE) ──────────────────────────
   Mirror do server schema para validação imediata no cliente.
   ─────────────────────────────────────────────────────────────── */
const ClientContactSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome não pode exceder 100 caracteres')
    .regex(/^[a-záéíóúãõâêç\s'-]+$/i, 'Nome contém caracteres inválidos'),

  email: z
    .string()
    .email('Email inválido')
    .max(255, 'Email não pode exceder 255 caracteres'),

  subject: z
    .string()
    .min(3, 'Assunto deve ter pelo menos 3 caracteres')
    .max(200, 'Assunto não pode exceder 200 caracteres')
    .regex(/^[a-záéíóúãõâêç0-9\s.,'-]+$/i, 'Assunto contém caracteres inválidos'),

  message: z
    .string()
    .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
    .max(5000, 'Mensagem não pode exceder 5000 caracteres'),
})

/* ── Configuração de animações ────────────────────────────────────
   Padrão reutilizado de HeroSection e ProjectsSection.
   ─────────────────────────────────────────────────────────────── */
const STAGGER_STEP_MS = 140

function stagger(index: number): CSSProperties {
  return { animationDelay: `${index * STAGGER_STEP_MS}ms` }
}

const FI = 'will-animate animate-fade-up' as const

/* ── Social links ─────────────────────────────────────────────── */
interface SocialLink {
  name: string
  icon: string
  href: string
  label: string
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'LinkedIn',
    icon: 'in',
    href: 'https://linkedin.com/in/gabriel-jose-de-souza',
    label: 'Conectar no LinkedIn',
  },
  {
    name: 'GitHub',
    icon: 'gh',
    href: 'https://github.com/GabrielJose2004',
    label: 'Ver projetos no GitHub',
  },
  {
    name: 'WhatsApp',
    icon: 'wa',
    href: 'https://wa.me/5511999999999',
    label: 'Enviar mensagem via WhatsApp',
  },
]

/* ── Componente Input ──────────────────────────────────────────── */
interface InputFieldProps {
  label: string
  id: string
  type?: string
  error?: string
  multiline?: boolean
  register: any
  className?: string
}

function InputField({
  label,
  id,
  type = 'text',
  error,
  multiline = false,
  register,
  className = '',
}: InputFieldProps) {
  const Component = multiline ? 'textarea' : 'input'

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-mono text-xs text-ghost uppercase tracking-[0.1em]">
        {label}
      </label>
      <Component
        id={id}
        type={type}
        placeholder=""
        {...register(id)}
        className={`
          font-sans text-sm text-snow
          bg-void border-b-2 border-wire
          focus:border-signal focus:outline-none
          transition-colors duration-150
          py-2 px-0
          placeholder:text-muted
          ${error ? 'border-red-500' : ''}
          ${multiline ? 'resize-none' : ''}
          ${className}
        `}
      />
      {error && (
        <span className="font-mono text-xs text-red-400">
          {error}
        </span>
      )}
    </div>
  )
}

/* ── Componente Principal ──────────────────────────────────────── */
export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error'
    message?: string
  }>({ type: 'idle' })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(ClientContactSchema),
    mode: 'onBlur',
  })

  async function onSubmit(data: ContactFormInput) {
    setIsSubmitting(true)
    setSubmitStatus({ type: 'loading' })

    try {
      const response = await submitContact(data)

      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: response.message,
        })
        reset()
        // Auto-reset mensagem após 5s
        setTimeout(() => setSubmitStatus({ type: 'idle' }), 5000)
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Erro ao enviar. Verifique os campos.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Erro de conexão. Tente novamente.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      aria-label="Entre em contato"
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
      {/* ── Grid 2 colunas (desktop) ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Lado A: Texto + Redes Sociais */}
        <div className="flex flex-col gap-8">
          {/* Headline */}
          <div className="flex flex-col gap-3">
            <p
              className={`font-mono text-[0.65rem] sm:text-xs tracking-[0.2em] text-ghost uppercase ${FI}`}
              style={stagger(0)}
              aria-label="Tipo de seção"
            >
              Entre em contato
            </p>
            <h2
              className={`
                font-mono font-light leading-[1.06] text-snow
                text-[clamp(1.5rem,5vw,2.5rem)]
                ${FI}
              `}
              style={stagger(1)}
            >
              Abrir canal de comunicação.
            </h2>
          </div>

          {/* Subheadline */}
          <p
            className={`
              font-sans text-sm sm:text-[0.9375rem] leading-[1.7]
              text-silver max-w-md
              ${FI}
            `}
            style={stagger(2)}
          >
            Seja para projetos full-stack ou consultoria técnica, respondo em até 24h.
          </p>

          {/* Social Links */}
          <div className={`flex flex-col gap-2 pt-4 ${FI}`} style={stagger(3)}>
            <p className="font-mono text-xs text-ghost uppercase tracking-[0.1em]">
              Redes
            </p>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="
                    font-mono text-xs px-3 py-1.5
                    border border-wire text-ghost
                    hover:border-signal hover:text-signal
                    transition-colors duration-200
                    rounded-sm
                  "
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Lado B: Formulário */}
        <div className={`flex flex-col gap-6 ${FI}`} style={stagger(4)}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Campo: Nome */}
            <InputField
              label="Nome"
              id="name"
              type="text"
              error={errors.name?.message}
              register={register}
            />

            {/* Campo: Email */}
            <InputField
              label="Email"
              id="email"
              type="email"
              error={errors.email?.message}
              register={register}
            />

            {/* Campo: Assunto */}
            <InputField
              label="Assunto"
              id="subject"
              type="text"
              error={errors.subject?.message}
              register={register}
            />

            {/* Campo: Mensagem */}
            <InputField
              label="Mensagem"
              id="message"
              type="text"
              multiline
              error={errors.message?.message}
              register={register}
              className="min-h-28"
            />

            {/* Submit Button com feedback visual */}
            <button
              type="submit"
              disabled={isSubmitting || submitStatus.type === 'success'}
              className={`
                font-mono text-xs uppercase tracking-[0.1em]
                px-5 py-2.5 sm:px-6 sm:py-3
                border border-signal
                transition-all duration-200
                mt-2
                ${
                  submitStatus.type === 'success'
                    ? 'bg-signal text-void cursor-default'
                    : isSubmitting
                      ? 'border-wire text-ghost bg-void cursor-wait'
                      : 'text-signal hover:bg-signal hover:text-void'
                }
              `}
            >
              {isSubmitting && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-1 w-1 rounded-full bg-current animate-cursor-blink" />
                  Enviando
                </span>
              )}
              {!isSubmitting && submitStatus.type === 'success' && '✓ Enviado'}
              {!isSubmitting && submitStatus.type !== 'success' && 'Enviar'}
            </button>

            {/* Feedback message */}
            {submitStatus.message && (
              <p
                className={`
                  font-mono text-xs px-3 py-2 rounded-sm mt-2
                  ${
                    submitStatus.type === 'success'
                      ? 'bg-signal/10 text-signal'
                      : 'bg-red-500/10 text-red-400'
                  }
                `}
              >
                {submitStatus.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
