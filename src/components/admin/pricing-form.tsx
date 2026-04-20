import { updatePricingAction } from "@/app/admin/actions";
import type { PricingItem } from "@/types";

type PricingFormProps = {
  items: PricingItem[];
  saved?: boolean;
};

function formatPounds(amountPence: number) {
  return (amountPence / 100).toFixed(2);
}

export function PricingForm({ items, saved = false }: PricingFormProps) {
  return (
    <form action={updatePricingAction} className="space-y-6">
      {saved ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Pricing updated.
        </div>
      ) : null}

      <div className="grid gap-4">
        {items.map((item) => (
          <div
            key={item.code}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">Current price</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-950">
                  {item.label}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  }).format(item.amountPence / 100)}
                </p>
              </div>
              <label className="block text-sm font-medium text-slate-800 sm:w-52">
                Update price (GBP)
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name={`${item.code}_amountPence`}
                  defaultValue={formatPounds(item.amountPence)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-300 px-4"
                />
              </label>
              <input type="hidden" name={`${item.code}_label`} value={item.label} />
            </div>
          </div>
        ))}
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
