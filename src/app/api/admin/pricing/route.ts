import { NextResponse } from "next/server";
import { defaultPricingSettings } from "@/config/default-settings";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/admin-session";
import { vehiclePricingFormSchema } from "@/lib/validators/admin";
import { getPricingSettings, upsertPricingItems } from "@/server/repositories/settings.repository";

export async function GET() {
  await requireAdmin();

  const items = await getPricingSettings();

  return NextResponse.json({
    ok: true,
    items,
  });
}

export async function PATCH(request: Request) {
  await requireAdmin();

  const json = await request.json().catch(() => null);
  const parsed = vehiclePricingFormSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid pricing payload.",
      },
      { status: 400 },
    );
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

  return NextResponse.json(
    {
      ok: true,
    },
  );
}
