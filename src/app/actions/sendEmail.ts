'use server'

import { Resend } from 'resend'
import { ContactFormSchema, type ContactFormInput } from './contact'

/**
 * Server Action: sendEmail via Resend
 *
 * ARQUITETURA:
 * - Reutiliza schema de validação do contact.ts
 * - Envia email para josegabriel13112004@gmail.com
 * - Retorna sucesso ou erro estruturado
 *
 * SEGURANÇA:
 * - Validação com Zod antes de envio
 * - API key via env var (RESEND_API_KEY)
 * - Sem exposição de detalhes internos em erro
 */

const RECIPIENT_EMAIL = 'josegabriel13112004@gmail.com'

export type SendEmailResponse =
  | { success: true; message: string; messageId: string }
  | { success: false; errors: Record<string, string[]> }

export async function sendEmail(
  data: unknown,
): Promise<SendEmailResponse> {
  // Validação rigorosa com mesmo schema do cliente
  const validationResult = ContactFormSchema.safeParse(data)

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten()
        .fieldErrors as Record<string, string[]>,
    }
  }

  const { name, email, subject, message } = validationResult.data

  try {
    // Verificar se API key está configurada
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY not configured')
      return {
        success: false,
        errors: {
          submit: [
            'Serviço de email não configurado. Por favor, tente novamente mais tarde.',
          ],
        },
      }
    }

    const resend = new Resend(apiKey)

    // Construir email HTML com identidade visual
    const emailHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="background-color: #000000; color: #ededed; font-family: ui-monospace, monospace;">
    <table style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <tr>
        <td style="border-bottom: 1px solid #141414; padding-bottom: 20px;">
          <h1 style="margin: 0; font-size: 16px; letter-spacing: 0.2em; color: #6b6b6b;">GJS.DEV</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 40px 0;">
          <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #ededed;">${subject}</h2>
          <p style="margin: 0 0 20px 0; color: #a1a1a1; line-height: 1.6;">
            <strong>De:</strong> ${name} (${email})<br />
            <strong>Assunto:</strong> ${subject}
          </p>
          <div style="background-color: #0a0a0a; border: 1px solid #141414; padding: 20px; margin: 20px 0;">
            <p style="margin: 0; color: #ededed; white-space: pre-wrap; line-height: 1.6; word-wrap: break-word;">${message}</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="border-top: 1px solid #141414; padding-top: 20px; color: #6b6b6b; font-size: 12px;">
          <p style="margin: 0;">Mensagem enviada via formulário de contato em gjs.dev</p>
        </td>
      </tr>
    </table>
  </body>
</html>
    `

    // Enviar email via Resend
    const response = await resend.emails.send({
      from: 'contato@gjs.dev',
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `[GJS.DEV] ${subject}`,
      html: emailHtml,
    })

    if (response.error) {
      console.error('Resend error:', response.error)
      return {
        success: false,
        errors: {
          submit: [
            'Erro ao enviar email. Por favor, tente novamente mais tarde.',
          ],
        },
      }
    }

    // TODO: Integrar com Sentry/Datadog para logging de submissões bem-sucedidas
    return {
      success: true,
      message:
        'Mensagem enviada com sucesso! Responderei em até 24 horas.',
      messageId: response.data?.id || 'unknown',
    }
  } catch (error) {
    // TODO: Integrar com Sentry/Datadog
    console.error('Error sending email:', error)
    return {
      success: false,
      errors: {
        submit: [
          'Erro inesperado ao enviar. Por favor, tente novamente mais tarde.',
        ],
      },
    }
  }
}
