import { defaultPricingSettings } from "@/config/default-settings";
import { getPricingItemByCode, getPricingSettings } from "@/server/repositories/settings.repository";
import type { PricingItem, VehicleClass } from "@/types";

export async function getActivePricing() {
  const items = await getPricingSettings();
  return items.filter((item) => item.isActive);
}

export async function getPricingForVehicleClass(vehicleClass: VehicleClass) {
  const pricingCode = vehicleClass.toLowerCase();
  const item = await getPricingItemByCode(pricingCode);

  if (item?.isActive) {
    return item.amountPence;
  }

  const fallbackItem = defaultPricingSettings.find((entry) => entry.code === pricingCode);
  return fallbackItem?.amountPence ?? 0;
}

export async function getPricingMap() {
  const items = await getPricingSettings();

  return items.reduce<Record<VehicleClass, number>>(
    (acc, item) => {
      const key = item.code.toUpperCase() as VehicleClass;
      acc[key] = item.amountPence;
      return acc;
    },
    {
      CLASS_A: defaultPricingSettings[0].amountPence,
      CLASS_B: defaultPricingSettings[1].amountPence,
      CLASS_C: defaultPricingSettings[2].amountPence,
      CLASS_D: defaultPricingSettings[3].amountPence,
    },
  );
}
