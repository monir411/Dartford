import {
  defaultHomepageContent,
  defaultPricingSettings,
  defaultThemeSettings,
} from "@/config/default-settings";
import { isMissingTableError } from "@/lib/db/safe-query";
import { prisma } from "@/lib/prisma";
import type {
  PricingItem,
  SiteSettingItem,
  ThemeConfig,
  ThemeSettingItem,
} from "@/types";

export async function listPricingItems(): Promise<PricingItem[]> {
  try {
    return await prisma.pricingSetting.findMany({
      orderBy: { code: "asc" },
    });
  } catch (error) {
    if (isMissingTableError(error)) {
      return [];
    }

    throw error;
  }
}

export async function getPricingItemByCode(
  code: string,
): Promise<PricingItem | null> {
  try {
    return await prisma.pricingSetting.findUnique({
      where: { code },
    });
  } catch (error) {
    if (isMissingTableError(error)) {
      return null;
    }

    throw error;
  }
}

export async function getPricingSettings(): Promise<PricingItem[]> {
  const items = await listPricingItems();
  const defaults = defaultPricingSettings.map((item, index) => ({
    id: `default-pricing-${index}`,
    ...item,
  }));

  const itemMap = new Map(items.map((item) => [item.code, item]));

  return defaults.map((item) => itemMap.get(item.code) ?? item);
}

export async function upsertPricingItems(
  items: Array<Pick<PricingItem, "code" | "label" | "amountPence" | "isActive">>,
) {
  try {
    await Promise.all(
      items.map((item) =>
        prisma.pricingSetting.upsert({
          where: { code: item.code },
          update: {
            label: item.label,
            amountPence: item.amountPence,
            isActive: item.isActive,
          },
          create: item,
        }),
      ),
    );
  } catch (error) {
    if (!isMissingTableError(error)) {
      throw error;
    }
  }
}

export async function listSiteSettings(): Promise<SiteSettingItem[]> {
  try {
    return await prisma.siteSetting.findMany({
      orderBy: { key: "asc" },
    });
  } catch (error) {
    if (isMissingTableError(error)) {
      return [];
    }

    throw error;
  }
}

export async function upsertSiteSettings(
  items: Array<Pick<SiteSettingItem, "key" | "label" | "value">>,
) {
  try {
    await Promise.all(
      items.map((item) =>
        prisma.siteSetting.upsert({
          where: { key: item.key },
          update: {
            label: item.label,
            value: item.value,
          },
          create: item,
        }),
      ),
    );
  } catch (error) {
    if (!isMissingTableError(error)) {
      throw error;
    }
  }
}

export async function listThemeSettings(): Promise<ThemeSettingItem[]> {
  try {
    return await prisma.themeSetting.findMany({
      orderBy: { key: "asc" },
    });
  } catch (error) {
    if (isMissingTableError(error)) {
      return [];
    }

    throw error;
  }
}

export async function upsertThemeSettings(
  items: Array<Pick<ThemeSettingItem, "key" | "label" | "value">>,
) {
  try {
    await Promise.all(
      items.map((item) =>
        prisma.themeSetting.upsert({
          where: { key: item.key },
          update: {
            label: item.label,
            value: item.value,
          },
          create: item,
        }),
      ),
    );
  } catch (error) {
    if (!isMissingTableError(error)) {
      throw error;
    }
  }
}

export async function getThemeSettings(): Promise<ThemeConfig> {
  const settings = await listThemeSettings();
  const map = new Map(settings.map((item) => [item.key, item.value]));

  return {
    primaryColor: map.get("primaryColor") ?? defaultThemeSettings.primaryColor,
    buttonColor: map.get("buttonColor") ?? defaultThemeSettings.buttonColor,
    backgroundColor:
      map.get("backgroundColor") ?? defaultThemeSettings.backgroundColor,
  };
}

export async function getHomepageSettings(): Promise<SiteSettingItem[]> {
  const settings = await listSiteSettings();

  if (settings.length > 0) {
    return settings;
  }

  return Object.entries(defaultHomepageContent).map(([key, value]) => ({
    id: key,
    key,
    label: key,
    value: String(value),
  }));
}
