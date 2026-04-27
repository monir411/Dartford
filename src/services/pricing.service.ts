import { defaultPricingSettings } from "@/config/default-settings";
import {
  getPricingItemByCode,
  getPricingSettings,
} from "@/server/repositories/settings.repository";
import type { PricingItem, VehiclePricingCode, VehiclePricingValues, VehicleType } from "@/types";

export async function getActivePricing() {
  const items = await getPricingSettings();
  return items.filter((item) => item.isActive);
}

function getDefaultPricingAmount(code: VehiclePricingCode) {
  return (
    defaultPricingSettings.find((entry) => entry.code === code)?.amountPence ?? 0
  );
}

export function getPricingCodeForVehicleType(
  vehicleType: VehicleType,
): VehiclePricingCode {
  switch (vehicleType) {
    case "BUS":
      return "bus";
    case "HGV":
      return "lorry";
    case "CAR":
    case "VAN":
    case "MOTORHOME":
    default:
      return "car";
  }
}

export async function getPricingForVehicleType(vehicleType: VehicleType) {
  const pricingCode = getPricingCodeForVehicleType(vehicleType);
  const item = await getPricingItemByCode(pricingCode);

  if (item?.isActive) {
    return item.amountPence;
  }

  return getDefaultPricingAmount(pricingCode);
}

export async function getVehiclePricingMap(): Promise<VehiclePricingValues> {
  const items = await getPricingSettings();
  const defaults: VehiclePricingValues = {
    car: getDefaultPricingAmount("car"),
    lorry: getDefaultPricingAmount("lorry"),
    bus: getDefaultPricingAmount("bus"),
  };

  return items.reduce<VehiclePricingValues>(
    (acc, item) => {
      if (item.isActive && (item.code === "car" || item.code === "lorry" || item.code === "bus")) {
        acc[item.code] = item.amountPence;
      }
      return acc;
    },
    defaults,
  );
}
