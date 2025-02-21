import {z} from 'zod';

export const personSchema = z.object({
    name: z.string().max(255, {message: "O nome deve ter no máximo 255 caracteres"}).min(3, {message: "O nome deve ter no mínimo 3 caracteres"}),
    age: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const num = Number(val);
      return isNaN(num) ? null : num; }) // Retorna `null` se a conversão falhar
    .refine((val) => val !== null, {message: "Idade inválida"})
    .refine((val) => Number.isInteger(val), {message: "A idade deve ser um número inteiro"})
    .refine((val) => val >= 1, {message: "A idade deve ser maior que 0"})
    .refine((val) => val <= 120, {message: "A idade deve ser menor que 120"}),
});