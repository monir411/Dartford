import { defaultHomepageContent } from "@/config/default-settings";
import { getHomepageSettings } from "@/server/repositories/settings.repository";

export async function getHomepageContent() {
  const settings = await getHomepageSettings();
  const map = new Map(settings.map((item) => [item.key, item.value]));

  return {
    homepageTitle:
      map.get("homepageTitle") ?? defaultHomepageContent.homepageTitle,
    homepageDescription:
      map.get("homepageDescription") ?? defaultHomepageContent.homepageDescription,
    whoNeedsToPayVisible:
      (map.get("whoNeedsToPayVisible") ?? String(defaultHomepageContent.whoNeedsToPayVisible)) ===
      "true",
    whoNeedsToPayTitle:
      map.get("whoNeedsToPayTitle") ?? defaultHomepageContent.whoNeedsToPayTitle,
    whoNeedsToPayBody:
      map.get("whoNeedsToPayBody") ?? defaultHomepageContent.whoNeedsToPayBody,
    whenToPayVisible:
      (map.get("whenToPayVisible") ?? String(defaultHomepageContent.whenToPayVisible)) ===
      "true",
    whenToPayTitle:
      map.get("whenToPayTitle") ?? defaultHomepageContent.whenToPayTitle,
    whenToPayBody:
      map.get("whenToPayBody") ?? defaultHomepageContent.whenToPayBody,
  };
}
