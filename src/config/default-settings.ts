import type { HomepageContent, PricingItem, ThemeConfig } from "@/types";

export const defaultPricingSettings: Array<
  Omit<PricingItem, "id">
> = [
  { code: "car", label: "Car", amountPence: 250, isActive: true },
  { code: "lorry", label: "Lorry", amountPence: 600, isActive: true },
  { code: "bus", label: "Bus", amountPence: 450, isActive: true },
];

export const defaultThemeSettings: ThemeConfig = {
  primaryColor: "#0f172a",
  buttonColor: "#facc15",
  backgroundColor: "#ffffff",
};

export const defaultHomepageContent: HomepageContent = {
  homepageTitle: "Dartford crossing charge online",
  homepageDescription: "Make payment before midnight the day after use.",
  whoNeedsToPayVisible: true,
  whoNeedsToPayTitle: "Who needs to pay",
  whoNeedsToPayBody:
    "Most vehicles using the Dartford Crossing need a charge paid for each crossing.\n\nPayment is usually required for cars, vans, motorhomes, and larger commercial vehicles.\n\nExemptions and discounts can apply in some cases, depending on the vehicle or account status.",
  whenToPayVisible: true,
  whenToPayTitle: "When to pay",
  whenToPayBody:
    "You must pay by midnight on the day after you use the crossing.\n\nPaying on time helps avoid penalty charges and keeps the process straightforward.\n\nIf you are unsure, complete payment as soon as possible after your journey.",
};

export const homepageContentLabels: Record<keyof HomepageContent, string> = {
  homepageTitle: "Homepage title",
  homepageDescription: "Homepage description",
  whoNeedsToPayVisible: "Show who needs to pay section",
  whoNeedsToPayTitle: "Who needs to pay title",
  whoNeedsToPayBody: "Who needs to pay body",
  whenToPayVisible: "Show when to pay section",
  whenToPayTitle: "When to pay title",
  whenToPayBody: "When to pay body",
};

export const themeSettingLabels: Record<keyof ThemeConfig, string> = {
  primaryColor: "Primary color",
  buttonColor: "Button color",
  backgroundColor: "Background color",
};
