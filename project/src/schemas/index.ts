import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Informe seu nome completo'),
    email:z.email({ error: 'E-mail inválido' }),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirme sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const accountSettingsSchema = z.object({
  name: z.string().min(2, 'Informe seu nome completo'),
  email: z.email({ error: 'E-mail inválido' }),
});

export type AccountSettingsFormValues = z.infer<typeof accountSettingsSchema>;
