export type PricingItem = {
  id: string;
  code: string;
  label: string;
  amountPence: number;
  isActive: boolean;
};

export type VehiclePricingCode = "car" | "lorry" | "bus";

export type VehiclePricingValues = Record<VehiclePricingCode, number>;

export type SiteSettingItem = {
  id: string;
  key: string;
  label: string;
  value: string;
};

export type ThemeSettingItem = {
  id: string;
  key: string;
  label: string;
  value: string;
};

export type ThemeConfig = {
  primaryColor: string;
  buttonColor: string;
  backgroundColor: string;
};

export type HomepageContent = {
  homepageTitle: string;
  homepageDescription: string;
  whoNeedsToPayVisible: boolean;
  whoNeedsToPayTitle: string;
  whoNeedsToPayBody: string;
  whenToPayVisible: boolean;
  whenToPayTitle: string;
  whenToPayBody: string;
};

export type ThemeSettings = {
  primaryColor: string;
  buttonColor: string;
  backgroundColor: string;
};
