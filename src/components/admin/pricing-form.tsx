import { updatePricingAction } from "@/app/admin/actions";
import type { PricingItem } from "@/types";

type PricingFormProps = {
  items: PricingItem[];
  saved?: boolean;
  error?: string;
};

function formatPounds(amountPence: number) {
  return (amountPence / 100).toFixed(2);
}

const vehiclePricingFields = [
  { code: "car", label: "Car price", helper: "Used when the selected vehicle type is car." },
  { code: "lorry", label: "Lorry price", helper: "Used when the selected vehicle type is lorry." },
  { code: "bus", label: "Bus price", helper: "Used when the selected vehicle type is bus." },
] as const;

export function PricingForm({
  items,
  saved = false,
  error,
}: PricingFormProps) {
  const itemMap = new Map(items.map((item) => [item.code, item]));

  return (
    <form action={updatePricingAction} className="space-y-6">
      {saved ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Pricing updated.
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-slate-950">
            Vehicle-type pricing
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Prices are stored in Neon through Prisma and used by checkout on the
            server.
          </p>
        </div>

        <div className="grid gap-4">
          {vehiclePricingFields.map((field) => {
            const item = itemMap.get(field.code);

            return (
              <label
                key={field.code}
                className="block rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">
                      {field.label}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">{field.helper}</p>
                    <p className="mt-2 text-sm text-slate-500">
                      Current:{" "}
                      {new Intl.NumberFormat("en-GB", {
                        style: "currency",
                        currency: "GBP",
                      }).format((item?.amountPence ?? 0) / 100)}
                    </p>
                  </div>

                  <div className="w-full sm:max-w-[220px]">
                    <span className="text-sm font-medium text-slate-800">
                      GBP amount
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      inputMode="decimal"
                      name={field.code}
                      defaultValue={formatPounds(item?.amountPence ?? 0)}
                      className="mt-2 h-11 w-full rounded-xl border border-slate-300 bg-white px-4"
                    />
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary rounded-xl px-5 py-3 text-sm font-semibold"
      >
        Update pricing
      </button>
    </form>
  );
}
