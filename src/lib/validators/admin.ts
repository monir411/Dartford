import { z } from "zod";

const priceInputSchema = z.preprocess((value) => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" ? Number.NaN : Number(trimmed);
  }

  return value;
}, z.number().finite().min(0).max(999999));

export const vehiclePricingFormSchema = z.object({
  car: priceInputSchema,
  lorry: priceInputSchema,
  bus: priceInputSchema,
});

export const pricingItemSchema = z.object({
  code: z.string().min(1),
  label: z.string().min(1),
  amountPence: z.number().int().nonnegative(),
  isActive: z.boolean(),
});

export const siteContentSchema = z.object({
  homepageTitle: z.string().min(1),
  homepageDescription: z.string().min(1),
  whoNeedsToPayVisible: z.boolean(),
  whoNeedsToPayTitle: z.string().min(1),
  whoNeedsToPayBody: z.string().min(1),
  whenToPayVisible: z.boolean(),
  whenToPayTitle: z.string().min(1),
  whenToPayBody: z.string().min(1),
});

export const themeSettingsSchema = z.object({
  primaryColor: z.string().min(4),
  buttonColor: z.string().min(4),
  backgroundColor: z.string().min(4),
});
