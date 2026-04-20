import { z } from "zod";

export const createPaymentSchema = z.object({
  class: z.enum(["CLASS_A", "CLASS_B", "CLASS_C", "CLASS_D"]),
  crossings: z.coerce.number().int().positive(),
  country: z.string().min(2).max(80),
  registrationNumber: z.string().min(2).max(16),
  confirmRegistration: z.string().min(2).max(16),
  email: z.string().email(),
  make: z.string().min(1).max(50),
  colour: z.string().min(1).max(50),
  vehicleType: z.enum(["CAR", "VAN", "MOTORHOME", "BUS", "HGV"]),
  termsAccepted: z.literal(true),
}).superRefine((input, ctx) => {
  if (
    input.registrationNumber.trim().toUpperCase() !==
    input.confirmRegistration.trim().toUpperCase()
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Registration numbers must match.",
      path: ["confirmRegistration"],
    });
  }
});

export type CreatePaymentSchema = z.infer<typeof createPaymentSchema>;
