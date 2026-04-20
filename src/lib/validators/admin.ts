import { z } from "zod";

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
