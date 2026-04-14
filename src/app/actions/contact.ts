'use server'

import { z } from 'zod'

/**
 * Schema de validação para formulário de contato.
 * SEGURANÇA: Validação rigorosa no servidor para evitar XSS e injection.
 */
export const ContactFormSchema = z.object({
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

export type ContactFormInput = z.infer<typeof ContactFormSchema>

export type ContactFormResponse = 
  | { success: true; message: string }
  | { success: false; errors: Record<string, string[]> }

/**
 * Server Action: submitContact
 * 
 * SEGURANÇA:
 * 1. Validação com Zod no servidor (nunca confiar no cliente)
 * 2. Rate limiting via middleware necessário (Future ADR)
 * 3. Sanitização de inputs (regex whitelist)
 * 4. Sem exposição de detalhes internos em erro
 */
export async function submitContact(
  data: unknown
): Promise<ContactFormResponse> {
  // Validação rigorosa
  const result = ContactFormSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const { name, email, subject, message } = result.data

  try {
    // TODO: Implementar envio de email (SendGrid, Resend, etc.)
    // Por enquanto, simular sucesso com log
    console.log('📧 Contact form submission:', { name, email, subject })

    return {
      success: true,
      message: 'Mensagem enviada com sucesso! Responderei em até 24h.',
    }
  } catch (error) {
    console.error('Error submitting contact:', error)
    return {
      success: false,
      errors: { submit: ['Erro ao enviar. Tente novamente mais tarde.'] },
    }
  }
}
