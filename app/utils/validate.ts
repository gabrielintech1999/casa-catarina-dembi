import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    address: z.string().min(5, "O endereço deve ter pelo menos 5 caracteres"),
    phone: z.string().regex(/^\d{9}$/, "Número de telefone inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
    acceptedTerms: z.boolean().refine((val) => val === true, {
      message: "Você deve aceitar os termos de uso e condições",
    }), // Add this validation
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });


  export const userSchema = z.object({
    phone: z
      .string()
      .nonempty("O número de telefone é obrigatório.")
      .regex(/^\d{9}$/, "Número de telefone inválido. Deve ter 9 dígitos."),
    password: z
      .string()
      .nonempty("A senha é obrigatória.")
      .min(6, "A senha deve ter pelo menos 6 caracteres."),
  });
  