import { z } from "zod";

/**
 * Schema de validação para formulário de contato.
 * SEGURANÇA: Validação rigorosa para evitar XSS e injection.
 *
 * NOTA: Este arquivo NÃO possui "use server" e é importável
 * tanto no cliente quanto no servidor.
 */
export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome não pode exceder 100 caracteres")
    .regex(/^[a-záéíóúãõâêç\s'-]+$/i, "Nome contém caracteres inválidos"),

  email: z
    .string()
    .email("Email inválido")
    .max(255, "Email não pode exceder 255 caracteres"),

  subject: z
    .string()
    .min(3, "Assunto deve ter pelo menos 3 caracteres")
    .max(200, "Assunto não pode exceder 200 caracteres")
    .regex(
      /^[a-záéíóúãõâêç0-9\s.,'-]+$/i,
      "Assunto contém caracteres inválidos",
    ),

  message: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(5000, "Mensagem não pode exceder 5000 caracteres"),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

export type ContactFormResponse =
  | { success: true; message: string }
  | { success: false; errors: Record<string, string[]> };
