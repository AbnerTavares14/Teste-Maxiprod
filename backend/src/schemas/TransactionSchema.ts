import {z} from "zod";

export const transactionSchema = z.object({
    person_id: z.union([z.string(), z.number()])
    .transform((val) => {
      const num = Number(val);
      return isNaN(num) ? null : num; }) // Retorna `null` se a conversão falhar
    .refine((val) => val !== null, {message: "ID inválido"})
    .refine((val) => Number.isInteger(val), {message: "O person_id deve ser um número inteiro"})
    .refine((val) => val >= 1, {message: "O person_id deve ser maior que 0"}),
    description: z.string().max(255, {message: "A descrição deve ter no máximo 255 caracteres"}).min(3, {message: "A descrição deve ter no mínimo 3 caracteres"}),
    amount: z.union([z.string(), z.number()])
    .transform((val) => {
      const num = Number(val);
      return isNaN(num) ? null : num; }) // Retorna `null` se a conversão falhar
    .refine((val) => val !== null, {message: "Valor inválido"})
    .refine((val) => val >= 1, {message: "O valor deve ser maior que 0"}),
    type: z.string().refine(value => value === "receita" || value === "despesa", {message: "O tipo deve ser 'receita' ou 'despesa"})
});