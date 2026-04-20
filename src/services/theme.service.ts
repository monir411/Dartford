import { getThemeSettings } from "@/server";

export async function getCurrentTheme() {
  return getThemeSettings();
}
