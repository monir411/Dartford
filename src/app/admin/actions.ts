"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  defaultHomepageContent,
  defaultPricingSettings,
  homepageContentLabels,
  themeSettingLabels,
} from "@/config/default-settings";
import {
  clearAdminSession,
  createAdminSession,
  requireAdmin,
  syncAdminUser,
  verifyAdminCredentials,
} from "@/lib/auth/admin-session";
import { vehiclePricingFormSchema } from "@/lib/validators/admin";
import {
  upsertPricingItems,
  upsertSiteSettings,
  upsertThemeSettings,
} from "@/server/repositories/settings.repository";

export async function loginAdminAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const isValid = await verifyAdminCredentials(email, password);

  if (!isValid) {
    redirect("/admin/login?error=invalid");
  }

  const admin = await syncAdminUser(email);
  await createAdminSession(admin);
  redirect("/admin");
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function updatePricingAction(formData: FormData) {
  await requireAdmin();

  const parsed = vehiclePricingFormSchema.safeParse({
    car: formData.get("car"),
    lorry: formData.get("lorry"),
    bus: formData.get("bus"),
  });

  if (!parsed.success) {
    redirect("/admin/pricing?error=Enter valid non-negative prices.");
  }

  await upsertPricingItems(
    defaultPricingSettings.map((item) => ({
      code: item.code,
      label: item.label,
      amountPence: Math.round(
        parsed.data[item.code as keyof typeof parsed.data] * 100,
      ),
      isActive: true,
    })),
  );

  revalidatePath("/");
  revalidatePath("/payment");
  revalidatePath("/admin");
  revalidatePath("/admin/pricing");
  redirect("/admin/pricing?saved=1");
}

export async function updateThemeAction(formData: FormData) {
  await requireAdmin();

  await upsertThemeSettings(
    Object.entries(themeSettingLabels).map(([key, label]) => ({
      key,
      label,
      value: String(formData.get(key) ?? ""),
    })),
  );

  revalidatePath("/", "layout");
  revalidatePath("/admin");
  revalidatePath("/admin/theme");
  redirect("/admin/theme?saved=1");
}

export async function updateContentAction(formData: FormData) {
  await requireAdmin();

  await upsertSiteSettings(
    Object.entries(homepageContentLabels).map(([key, label]) => ({
      key,
      label,
      value:
        key === "whoNeedsToPayVisible" || key === "whenToPayVisible"
          ? String(formData.get(key) === "on")
          : String(formData.get(key) ?? "") ||
            String(defaultHomepageContent[key as keyof typeof defaultHomepageContent]),
    })),
  );

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/content");
  redirect("/admin/content?saved=1");
}
